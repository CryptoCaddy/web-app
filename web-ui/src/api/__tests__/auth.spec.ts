import { AuthApi } from '@/api/auth';
import { ApiError } from '@/models/ApiError';
import { EmailAndPassword } from '@/store/modules/auth.state';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import deepFreeze from 'deep-freeze';
import firebase from 'firebase/app';

const firebaseFallbackErrorMessage =
  'Firebase: An unknown error occured.';
const mockHttp = new MockAdapter(axios);

afterEach(() => {
  mockHttp.reset();
});

describe('AuthApi', () => {
  const authMock = firebase.auth!();
  const errorFn = jest.fn();
  const credentials: EmailAndPassword = deepFreeze({
    email: 'user@example.com',
    password: 'Passw0rd!',
  });
  const emailCredential = firebase.auth!.EmailAuthProvider.credential(
    credentials.email,
    credentials.password,
  );
  const token = 'demo-token';
  const firebaseUser = deepFreeze({
    uid: 'some-uid',
    email: credentials.email,
    token,
  });

  afterEach(() => {
    errorFn.mockReset();

    if (authMock.currentUser) {
      authMock.signOut();
      (authMock as any).flush();
    }
  });

  /**
   * linkWithCredential
   */
  describe('linkWithCredential()', () => {
    beforeEach(() => {
      authMock.currentUser = { isAnonymous: true, linkWithCredential: jest.fn() } as any;

      jest
        .spyOn(authMock.currentUser!, 'linkWithCredential')
        .mockImplementation(() => Promise.resolve({ ...firebaseUser }));
    });

    it('should call the corresponding firebase method', async () => {
      await AuthApi.linkWithCredential(emailCredential);

      expect(authMock.currentUser!.linkWithCredential)
        .toHaveBeenCalledWith(emailCredential);
    });

    describe('if firebase request succeeded', () => {
      it('should succeed', async () => {
        await AuthApi.linkWithCredential(emailCredential).catch(errorFn);

        expect(errorFn).not.toHaveBeenCalled();
      });

      it('should return a promise containing a firebase user', async () => {
        const response = AuthApi.linkWithCredential(emailCredential);

        expect(response).resolves.toMatchObject(firebaseUser);
        expect(response).resolves.not.toBe(firebaseUser);
      });
    });

    describe('if firebase request failed', () => {
      beforeEach(() => {
        jest
          .spyOn(authMock.currentUser!, 'linkWithCredential')
          .mockImplementation(() => Promise.reject(new Error('Email already in use.')));
      });

      it('should reject with an error', async () => {
        await AuthApi.linkWithCredential(emailCredential).catch(errorFn);

        expect(errorFn).toHaveBeenCalledWith(new Error('Email already in use.'));
      });

      it('user should still be anonymous', async () => {
        await AuthApi.linkWithCredential(emailCredential).catch(errorFn);

        expect(authMock.currentUser).toMatchObject({ isAnonymous: true });
      });

      it('should reject with a default error if none provided', async () => {
        jest
          .spyOn(authMock.currentUser!, 'linkWithCredential')
          .mockImplementation(() => Promise.reject(new Error()));

        await AuthApi.linkWithCredential(emailCredential).catch(errorFn);

        expect(errorFn).toHaveBeenCalledWith(new Error(firebaseFallbackErrorMessage));
      });
    });

    describe('if no user is currently logged in', () => {
      beforeEach(() => {
        authMock.signOut();
        (authMock as any).flush();
      });

      it('should reject with an error', async () => {
        const response = await AuthApi.linkWithCredential(emailCredential).catch(errorFn);

        expect(response).toBeUndefined();
        expect(errorFn).toHaveBeenCalledWith(new Error('No user context found.'));
      });
    });
  });

  /**
   * signInAnonymously
   */
  describe('signInAnonymously()', () => {
    it('should call the corresponding firebase method', async () => {
      jest.spyOn(authMock, 'signInAnonymously').mockImplementation(() => {
        authMock.currentUser = { isAnonymous: true } as any;
        return Promise.resolve(authMock.currentUser);
      });
      await AuthApi.signInAnonymously();

      expect(authMock.signInAnonymously).toHaveBeenCalled();
    });

    describe('if firebase request succeeded', () => {
      beforeEach(() => {
        jest.spyOn(authMock, 'signInAnonymously').mockImplementation(() => {
          authMock.currentUser = { isAnonymous: true } as any;
          return Promise.resolve(authMock.currentUser);
        });
      });

      it('should log in the user with an anonymous account', async () => {
        await AuthApi.signInAnonymously();

        expect(authMock.currentUser).toMatchObject({ isAnonymous: true });
      });

      it('should return a promise containing a firebase user', () => {
        const result = AuthApi.signInAnonymously();

        expect(result).resolves.toMatchObject({ isAnonymous: true });
      });
    });

    describe('if firebase request failed', () => {
      beforeEach(() => {
        jest.spyOn(authMock, 'signInAnonymously').mockImplementation(() => {
          authMock.currentUser = null;
          return Promise.reject(new Error('Not allowed.'));
        });
      });

      it('should not log in the user', async () => {
        await AuthApi.signInAnonymously().catch(errorFn);

        expect(authMock.currentUser).toBeNull();
      });

      it('should reject with an error message ', async () => {
        await AuthApi.signInAnonymously().catch(errorFn);

        expect(errorFn).toHaveBeenCalledWith(new Error('Not allowed.'));
      });

      it('should reject with a default error if none provided', async () => {
        jest.spyOn(authMock, 'signInAnonymously').mockImplementation(() => {
          authMock.currentUser = null;
          return Promise.reject(new Error());
        });
        await AuthApi.signInAnonymously().catch(errorFn);

        expect(errorFn).toHaveBeenCalledWith(new Error(firebaseFallbackErrorMessage));
      });
    });
  });

  /**
   * signInWithEmailAndPassword
   */
  describe('signInWithEmailAndPassword()', () => {
    const signUpEndpoint = '/api/createAccount';

    beforeEach(() => {
      jest.spyOn(axios, 'post');
    });

    afterEach(() => {
      jest.spyOn(axios, 'post').mockRestore();
    });

    describe('if request succeeded', () => {
      beforeEach(() => {
        jest
          .spyOn(authMock, 'signInWithEmailAndPassword')
          .mockImplementation((email) =>
            Promise.resolve({ email, getIdToken: () => Promise.resolve(token) }));

        mockHttp
          .onPost(signUpEndpoint, { email: credentials.email, token })
          .replyOnce(201);
      });

      it('should sign in on firebase', async () => {
        await AuthApi.signInWithEmailAndPassword(credentials);

        expect(authMock.signInWithEmailAndPassword)
          .toHaveBeenCalledWith('user@example.com', 'Passw0rd!');
      });

      describe('signing in on crypto caddy', () => {
        it('should send the email and token', async () => {
          await AuthApi.signInWithEmailAndPassword(credentials);

          expect(axios.post)
            .toHaveBeenCalledWith(
              signUpEndpoint,
              { email: 'user@example.com', token },
              expect.any(Object),
            );
        });

        it('should add an authorization header to the request', async () => {
          await AuthApi.signInWithEmailAndPassword(credentials);

          expect(axios.post)
            .toHaveBeenCalledWith(
              signUpEndpoint,
              expect.any(Object),
              { headers: { Authorization: 'Bearer demo-token' } },
            );
        });
      });

      it('should resolve a promise containing a firebase user', async () => {
        const result = await AuthApi
          .signInWithEmailAndPassword(credentials)
          .catch(errorFn);

        expect(errorFn).not.toHaveBeenCalled();
        expect(result).toMatchObject({
          email: 'user@example.com',
        });
      });
    });

    describe('if firebase request failed', () => {
      beforeEach(() => {
        jest
          .spyOn(authMock, 'signInWithEmailAndPassword')
          .mockImplementation(() => Promise.reject(new Error('Error: Wrong credentials.')));
      });

      it('should not return an user object', async () => {
        const result = await AuthApi.signInWithEmailAndPassword(credentials).catch(errorFn);

        expect(result).toBeUndefined();
      });

      it('should reject with an error', async () => {
        await AuthApi.signInWithEmailAndPassword(credentials).catch(errorFn);

        expect(errorFn).toHaveBeenCalledWith(new Error('Error: Wrong credentials.'));
      });

      it('should reject with a default error if none provided', async () => {
        jest
          .spyOn(authMock, 'signInWithEmailAndPassword')
          .mockImplementation(() => Promise.reject(new Error()));

        await AuthApi.signInWithEmailAndPassword(credentials).catch(errorFn);
        expect(errorFn).toHaveBeenCalledWith(new Error(firebaseFallbackErrorMessage));
      });
    });

    describe('if backend request failed', () => {
      beforeEach(() => {
        jest
          .spyOn(authMock, 'signInWithEmailAndPassword')
          .mockImplementation((email) =>
            Promise.resolve({ email, getIdToken: () => Promise.resolve(token) }));

        mockHttp
          .onPost(signUpEndpoint, { email: credentials.email, token })
          .replyOnce(500, { message: 'Server not available.' });
      });

      it('should not return an user object', async () => {
        const result = await AuthApi.signInWithEmailAndPassword(credentials).catch(errorFn);

        expect(result).toBeUndefined();
      });

      it('should reject with the given error', async () => {
        await AuthApi.signInWithEmailAndPassword(credentials).catch(errorFn);

        expect(errorFn).toHaveBeenCalledWith(new Error('Server not available.'));
      });
    });
  });

  /**
   * signOut
   */
  describe('signOut()', () => {
    it('should log out the user on firebase', () => {
      authMock.signOut = jest.fn(() => Promise.resolve());
      AuthApi.signOut();

      expect(authMock.signOut).toHaveBeenCalled();
    });
  });

  /**
   * signUpWithEmailAndPassword
   */
  describe('signUpWithEmailAndPassword()', () => {
    const signUpEndpoint = '/api/createAccount';

    beforeEach(() => {
      jest.spyOn(axios, 'post');
    });

    afterEach(() => {
      jest.spyOn(axios, 'post').mockRestore();
    });

    describe('if successful', () => {
      beforeEach(() => {
        jest
          .spyOn(authMock, 'createUserWithEmailAndPassword')
          .mockImplementation((email) =>
            Promise.resolve({ email, getIdToken: () => Promise.resolve(token) }));

        mockHttp
          .onPost(signUpEndpoint, { email: credentials.email, token })
          .replyOnce(201);
      });

      it('should call the corresponding firebase method', async () => {
        AuthApi.signUpWithEmailAndPassword(credentials).catch(errorFn);

        expect(authMock.createUserWithEmailAndPassword)
          .toHaveBeenCalledWith('user@example.com', 'Passw0rd!');
      });

      describe('signing in on crypto caddy', () => {
        it('should send the email and token', async () => {
          await AuthApi.signInWithEmailAndPassword(credentials);

          expect(axios.post)
            .toHaveBeenCalledWith(
              signUpEndpoint,
              { email: credentials.email, token },
              expect.any(Object),
            );
        });

        it('should add an authorization header to the request', async () => {
          await AuthApi.signInWithEmailAndPassword(credentials);

          expect(axios.post)
            .toHaveBeenCalledWith(
              signUpEndpoint,
              expect.any(Object),
              { headers: { Authorization: 'Bearer demo-token' } },
            );
        });
      });

      it('should succeed', async () => {
        AuthApi.signUpWithEmailAndPassword(credentials).catch(errorFn);
        expect(errorFn).not.toHaveBeenCalled();
      });

      it('should return a promise containing a firebase user', async () => {
        const result = await AuthApi.signUpWithEmailAndPassword(credentials);
        expect(result).toMatchObject({ email: 'user@example.com' });
      });
    });

    describe('if firebase registration failed', () => {
      beforeEach(() => {
        jest
          .spyOn(authMock, 'createUserWithEmailAndPassword')
          .mockImplementation(() =>
            Promise.reject(new Error('Email address already in use.')));
      });

      it('should not return an user object', async () => {
        const result = await AuthApi.signUpWithEmailAndPassword(credentials).catch(errorFn);
        expect(result).toBeUndefined();
      });

      it('should reject with an error', async () => {
        await AuthApi.signUpWithEmailAndPassword(credentials).catch(errorFn);

        expect(errorFn).toHaveBeenCalledWith(new Error('Email address already in use.'));
      });

      it('should reject with a default error if no firebase error was provided', async () => {
        jest
          .spyOn(authMock, 'createUserWithEmailAndPassword')
          .mockImplementation(() => Promise.reject(new Error()));
        await AuthApi.signUpWithEmailAndPassword(credentials).catch(errorFn);

        expect(errorFn).toHaveBeenCalledWith(new Error(firebaseFallbackErrorMessage));
      });
    });

    describe('if crypto caddy registration failed', () => {
      beforeEach(() => {
        jest
          .spyOn(authMock, 'createUserWithEmailAndPassword')
          .mockImplementation((email) =>
            Promise.resolve({ email, getIdToken: () => Promise.resolve(token) }));

        mockHttp
          .onPost(signUpEndpoint, { email: credentials.email, token })
          .replyOnce(418, { message: 'Just throwing some stuff.' } as ApiError);
      });

      it('should not return an user object', async () => {
        const result = await AuthApi.signUpWithEmailAndPassword(credentials).catch(errorFn);

        expect(result).toBeUndefined();
      });

      it('should reject with an error', async () => {
        await AuthApi.signUpWithEmailAndPassword(credentials).catch(errorFn);

        expect(errorFn).toHaveBeenCalledWith(new Error('Just throwing some stuff.'));
      });
    });
  });
});

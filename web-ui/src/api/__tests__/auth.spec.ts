import { AuthApi, firebaseFallbackErrorMessage } from '@/api/auth';
import { ApiError } from '@/models/ApiError';
import { EmailAndPassword } from '@/store/modules/auth.state';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import deepFreeze from 'deep-freeze';
import firebase, { FirebaseError } from 'firebase/app';

const mockHttp = new MockAdapter(axios);

afterEach(() => {
  mockHttp.reset();
});

describe('AuthApi', () => {
  const authMock = firebase.auth()!;
  const errorFn = jest.fn();
  const credentials: EmailAndPassword = deepFreeze({
    email: 'user@example.com',
    password: 'Passw0rd!',
  });
  const emailCredential = firebase.auth.EmailAuthProvider.credential(
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

  describe('linkWithCredential()', () => {
    describe('if firebase request succeeded', () => {
      it('should return a promise containing a firebase user', async () => {
        authMock.signInAnonymously();
        (authMock as any).flush();

        authMock.currentUser!.linkWithCredential = jest.fn(() =>
          Promise.resolve({ ...firebaseUser }),
        );

        const response = await AuthApi.linkWithCredential(emailCredential);

        expect(authMock.currentUser!.linkWithCredential).toHaveBeenCalledWith(
          emailCredential,
        );
        expect(response).toMatchObject(firebaseUser);
        expect(response).not.toBe(firebaseUser);
      });
    });

    describe('if firebase request failed', () => {
      it('should reject with an error', async () => {
        authMock.signInAnonymously();
        (authMock as any).flush();

        const error: Partial<FirebaseError> = {
          message: 'Email already in use.',
        };
        authMock.currentUser!.linkWithCredential = jest.fn(() =>
          Promise.reject(error),
        );

        const response = await AuthApi.linkWithCredential(
          emailCredential,
        ).catch(errorFn);

        expect(authMock.currentUser).toMatchObject({ isAnonymous: true });
        expect(response).toBeUndefined();
        expect(errorFn).toHaveBeenCalledWith('Email already in use.');
      });

      it('should reject with a default error if none provided', async () => {
        authMock.signInAnonymously();
        (authMock as any).flush();

        authMock.currentUser!.linkWithCredential = jest.fn(() =>
          Promise.reject({}),
        );

        const response = await AuthApi.linkWithCredential(
          emailCredential,
        ).catch(errorFn);

        expect(authMock.currentUser).toMatchObject({
          isAnonymous: true,
        });
        expect(response).toBeUndefined();
        expect(errorFn).toHaveBeenCalledWith(firebaseFallbackErrorMessage);
      });
    });

    describe('if no user is currently logged in', () => {
      it('should reject with an error', async () => {
        const response = await AuthApi.linkWithCredential(
          emailCredential,
        ).catch(errorFn);

        expect(response).toBeUndefined();
        expect(errorFn).toHaveBeenCalledWith('No user context found.');
      });
    });
  });

  describe('signInAnonymously()', () => {
    describe('if firebase request succeeded', () => {
      it('should log in the user with an anonymous account', () => {
        AuthApi.signInAnonymously();
        (authMock as any).flush();

        expect(authMock.currentUser).toMatchObject({ isAnonymous: true });
      });

      it('should return a promise containing a firebase user', () => {
        const result = AuthApi.signInAnonymously();
        (authMock as any).flush();

        expect(result).resolves.toMatchObject({ isAnonymous: true });
      });
    });

    describe('if firebase request failed', () => {
      it('should not log in the user', async () => {
        authMock.signInAnonymously = jest.fn(() =>
          Promise.reject({ message: 'Not allowed.' }),
        );
        const result = await AuthApi.signInAnonymously().catch(errorFn);

        expect(authMock.currentUser).toBeNull();
        expect(result).toBeUndefined();
        expect(errorFn).toHaveBeenCalledWith('Not allowed.');
      });

      it('should reject with a default error if none provided', async () => {
        authMock.signInAnonymously = jest.fn(() => Promise.reject({}));
        const result = await AuthApi.signInAnonymously().catch(errorFn);

        expect(authMock.currentUser).toBeNull();
        expect(result).toBeUndefined();
        expect(errorFn).toHaveBeenCalledWith(firebaseFallbackErrorMessage);
      });
    });
  });

  describe('signInWithEmailAndPassword()', () => {
    describe('if firebase request succeeded', () => {
      it('should return a promise containing the firebase user', () => {
        const result = AuthApi.signInWithEmailAndPassword(credentials);
        (authMock as any).flush();

        expect(result).resolves.toMatchObject(authMock!.currentUser!);
      });
    });

    describe('if firebase request failed', () => {
      it('should reject with an error', async () => {
        authMock.signInWithEmailAndPassword = jest.fn(() =>
          Promise.reject({ message: 'Error: Wrong credentials.' }),
        );
        const result = await AuthApi.signInWithEmailAndPassword(
          credentials,
        ).catch(errorFn);

        expect(result).toBeUndefined();
        expect(errorFn).toHaveBeenCalledWith('Error: Wrong credentials.');
      });

      it('should reject with a default error if none provided', async () => {
        authMock.signInWithEmailAndPassword = jest.fn(() => Promise.reject({}));
        const result = await AuthApi.signInWithEmailAndPassword(
          credentials,
        ).catch(errorFn);

        expect(result).toBeUndefined();
        expect(errorFn).toHaveBeenCalledWith(firebaseFallbackErrorMessage);
      });
    });
  });

  describe('signOut()', () => {
    it('should log out the user on firebase', () => {
      authMock.signOut = jest.fn(() => Promise.resolve());
      AuthApi.signOut();

      expect(authMock.signOut).toHaveBeenCalled();
    });
  });

  describe('signUpWithEmailAndPassword()', () => {
    const endpoint = '/api/createAccount';

    beforeEach(() => {
      jest.spyOn(axios, 'post');
    });

    afterEach(() => {
      jest.spyOn(axios, 'post').mockRestore();
    });

    describe('if successful', () => {
      it('should return a promise containing a firebase user', async () => {
        firebase.auth().createUserWithEmailAndPassword = jest.fn((email) =>
          Promise.resolve({
            email,
            getToken: () => Promise.resolve(token),
          }),
        );

        mockHttp
          .onPost(endpoint, {
            email: credentials.email,
            token,
          })
          .replyOnce(201);

        const result = await AuthApi.signUpWithEmailAndPassword(
          credentials,
        ).catch(errorFn);

        expect(
          firebase.auth().createUserWithEmailAndPassword,
        ).toHaveBeenCalledWith('user@example.com', 'Passw0rd!');

        expect(errorFn).not.toHaveBeenCalled();
        expect(
          firebase.auth().createUserWithEmailAndPassword,
        ).toHaveBeenCalledWith(credentials.email, credentials.password);
        expect(result).toMatchObject({ email: 'user@example.com' });
      });
    });

    describe('if firebase registration failed', () => {
      it('should reject with an error based on the firebase error message', async () => {
        firebase.auth().createUserWithEmailAndPassword = jest.fn(() =>
          Promise.reject({
            message: 'Email address already in use.',
          } as FirebaseError),
        );

        await AuthApi.signUpWithEmailAndPassword(credentials).catch(errorFn);

        expect(
          firebase.auth().createUserWithEmailAndPassword,
        ).toHaveBeenCalledWith('user@example.com', 'Passw0rd!');

        expect(errorFn).toHaveBeenCalledWith('Email address already in use.');
      });

      it('should reject with a default error if no firebase error was provided', async () => {
        firebase.auth().createUserWithEmailAndPassword = jest.fn(() =>
          Promise.reject({} as FirebaseError),
        );

        await AuthApi.signUpWithEmailAndPassword(credentials).catch(errorFn);

        expect(
          firebase.auth().createUserWithEmailAndPassword,
        ).toHaveBeenCalledWith('user@example.com', 'Passw0rd!');

        expect(errorFn).toHaveBeenCalledWith(firebaseFallbackErrorMessage);
      });
    });

    describe('if crypto caddy registration failed', () => {
      it('should reject with an error based on the crypto caddy error message', async () => {
        firebase.auth().createUserWithEmailAndPassword = jest.fn((email) =>
          Promise.resolve({
            email,
            getToken: () => Promise.resolve(token),
          }),
        );

        mockHttp
          .onPost(endpoint, { email: credentials.email, token })
          .replyOnce(418, {
            detail: `418 - I'm a teapot`,
            message: 'Just throwing some stuff.',
          } as ApiError);

        await AuthApi.signUpWithEmailAndPassword(credentials).catch(errorFn);

        expect(
          firebase.auth().createUserWithEmailAndPassword,
        ).toHaveBeenCalledWith('user@example.com', 'Passw0rd!');
        expect(axios.post).toHaveBeenCalledWith(endpoint, {
          email: credentials.email,
          token,
        });
        expect(errorFn).toHaveBeenCalledWith('Just throwing some stuff.');
      });
    });
  });
});

import { EmailAndPassword } from '@/store/modules/auth.state';
import axios, { AxiosError } from 'axios';
import firebase, { FirebaseError } from 'firebase/app';

const firebaseFallbackErrorMessage =
  'Firebase: An unknown error occured.';

function signInWithEmailAndPasswordOnFirebase(
  credentials: EmailAndPassword,
): Promise<firebase.User> {
  return new Promise<firebase.User>((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(resolve)
      .catch((err: FirebaseError) => {
        reject(new Error(err.message || firebaseFallbackErrorMessage));
      });
  });
}

function signUpOnCryptoCaddy(user: firebase.User): Promise<firebase.User> {
  return new Promise<firebase.User>(async (resolve, reject) => {
    const token = await user.getIdToken();
    axios
      .post('/api/createAccount', { email: user.email, token })
      .then(() => resolve(user))
      .catch((err: AxiosError) => {
        reject(new Error(err.message));
      });
  });
}

function signUpWithEmailAndPasswordOnFirebase(
  credentials: EmailAndPassword,
): Promise<firebase.User> {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(resolve)
      .catch((err: FirebaseError) => {
        reject(new Error(err.message || firebaseFallbackErrorMessage));
      });
  });
}

export const AuthApi = {
  linkWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      const { currentUser } = firebase.auth();

      if (currentUser == null) {
        reject(new Error('No user context found.'));
        return;
      }

      currentUser
        .linkWithCredential(credential)
        .then(resolve)
        .catch((err: FirebaseError) => {
          reject(new Error(err.message || firebaseFallbackErrorMessage));
        });
    });
  },

  /** Sign in without credentials creating a temporary user. */
  signInAnonymously(): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInAnonymously()
        .then(resolve)
        .catch((err: FirebaseError) => {
          reject(new Error(err.message || firebaseFallbackErrorMessage));
        });
    });
  },

  /**
   * Sign in with email and password.
   *
   * Also sign up on crypto caddy. This makes sure that users are able to log
   * into different environments using the same firebase account.
   */
  signInWithEmailAndPassword(credentials: EmailAndPassword): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPasswordOnFirebase(credentials)
        .then((user: firebase.User) => {
          signUpOnCryptoCaddy(user)
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  },

  /** Sign out of firebase. */
  signOut(): Promise<void> {
    return firebase.auth().signOut();
  },

  signUpWithEmailAndPassword(
    credentials: EmailAndPassword,
  ): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      signUpWithEmailAndPasswordOnFirebase(credentials)
        .then((user: firebase.User) => {
          signUpOnCryptoCaddy(user)
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  },
};

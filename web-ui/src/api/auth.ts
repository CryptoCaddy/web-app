import { EmailAndPassword } from '@/store/modules/auth.state';
import axios, { AxiosError } from 'axios';
import firebase, { FirebaseError } from 'firebase/app';

export const firebaseFallbackErrorMessage =
  'Firebase: An unknown error occured.';

export const AuthApi = {
  linkWithCredential(
    credential: firebase.auth.AuthCredential,
  ): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;

      if (currentUser == null) {
        reject('No user context found.');
        return;
      }

      currentUser
        .linkWithCredential(credential)
        .then(resolve)
        .catch((err: FirebaseError) => {
          reject(err.message || firebaseFallbackErrorMessage);
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
          reject(err.message || firebaseFallbackErrorMessage);
        });
    });
  },

  /** Sign in to firebase with email and password. */
  signInWithEmailAndPassword(
    credentials: EmailAndPassword,
  ): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(resolve)
        .catch((err: FirebaseError) => {
          reject(err.message || firebaseFallbackErrorMessage);
        });
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
      this._signUpWithEmailAndPasswordOnFirebase(credentials)
        .then((user: firebase.User) => {
          this._signUpOnCryptoCaddy(user)
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  },

  _signUpWithEmailAndPasswordOnFirebase(
    credentials: EmailAndPassword,
  ): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(resolve)
        .catch((err: FirebaseError) => {
          reject(err.message || firebaseFallbackErrorMessage);
        });
    });
  },

  _signUpOnCryptoCaddy(user: firebase.User): Promise<firebase.User> {
    return new Promise<firebase.User>(async (resolve, reject) => {
      const token = await user.getToken();
      axios
        .post('/api/createAccount', { email: user.email, token })
        .then(() => resolve(user))
        .catch((err: AxiosError) => {
          reject(err.message);
        });
    });
  },
};

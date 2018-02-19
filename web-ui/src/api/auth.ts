import { EmailAndPassword } from '@/store/modules/auth.state';
import firebase from 'firebase/app';

export default {
  linkWithCredential(
    credential: firebase.auth.AuthCredential,
  ): Promise<firebase.User> {
    return firebase.auth().currentUser!.linkWithCredential(credential);
  },

  /** Sign in without credentials creating a temporary user. */
  signInAnonymously(): Promise<firebase.User> {
    return firebase.auth().signInAnonymously();
  },

  /** Sign in to firebase with email and password. */
  signInWithEmailAndPassword(
    credentials: EmailAndPassword,
  ): Promise<firebase.User> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password);
  },

  /** Sign out of firebase. */
  signOut(): Promise<void> {
    return firebase.auth().signOut();
  },

  signUpWithEmailAndPassword(
    credentials: EmailAndPassword,
  ): Promise<firebase.User> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password);
  },
};

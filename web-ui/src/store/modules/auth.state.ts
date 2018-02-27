import firebase from 'firebase/app';

export interface AuthState {
  error: string | null;
  pending: boolean;
  user: AuthUser | null;
}

export interface AuthUser {
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
}

export interface EmailAndPassword {
  email: string;
  password: string;
}

export function firebaseUserToAuthUser(user: firebase.User): AuthUser {
  return {
    email: user.email,
    emailVerified: user.emailVerified,
    isAnonymous: user.isAnonymous,
  };
}

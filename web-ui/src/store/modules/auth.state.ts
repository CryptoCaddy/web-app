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
  token: string | null;
}

export interface EmailAndPassword {
  email: string;
  password: string;
}

export async function firebaseUserToAuthUser(user: firebase.User): Promise<AuthUser> {
  return user.getIdToken()
    .then((token) => ({
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      token,
    }));
}

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

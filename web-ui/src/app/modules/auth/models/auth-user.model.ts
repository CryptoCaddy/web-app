export interface AuthUser {
  email: string;
}

export function isAuthUser(o: AuthUser): o is AuthUser {
  return o != null &&

    // required
    typeof o.email === 'string';

}

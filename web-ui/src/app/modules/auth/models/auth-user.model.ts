export interface AuthUser {
  email: string;
  timezone?: string;
  fiat?: string;
}

export function isAuthUser(o: AuthUser): o is AuthUser {
  return o != null &&

    // required
    typeof o.email === 'string' &&

    // optional
    (o.timezone == null || typeof o.timezone === 'string') &&
    (o.fiat == null || typeof o.fiat === 'string');

}

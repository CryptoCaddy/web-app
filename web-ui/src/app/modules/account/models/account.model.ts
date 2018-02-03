export interface Account {
  email: string;
  fiat?: string;
  timezone?: string;
}

export function isAccount(o): o is Account {
  return o != null

  // required
  && typeof o.email === 'string'

  // optional
  && o.fiat == null || typeof o.fiat === 'string'
  && o.timezone == null || typeof o.timezone === 'string'

  ;
}

export function required(v: any) {
  return !!v;
}

export function email(v: string) {
  if (!v) {
    return true;
  }

  if (/^\S+@\S+$/.test(v)) {
    return true;
  }

  return false;
}

export function equals(v: any, s: any) {
  if (!v || !s) {
    return true;
  }

  if (v === s) {
    return true;
  }

  return false;
}

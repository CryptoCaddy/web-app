import { AuthUser } from '../models/auth-user.model';
import * as firebase from 'firebase';

export function extractUserData(userState: firebase.User|null): AuthUser|null {
  if (!userState || typeof userState !== 'object') { return null; }

  return {
    isAnonymous: !Boolean(userState.email),
    uid: userState.uid,
    email: userState.email,
  };
}

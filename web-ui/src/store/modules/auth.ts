import { AuthApi } from '@/api/auth';
import {
  AuthState,
  AuthUser,
  EmailAndPassword,
  firebaseUserToAuthUser,
} from '@/store/modules/auth.state';
import firebase from 'firebase/app';
import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';

import { State as RootState } from '../';

type AuthContext = ActionContext<AuthState, RootState>;

export const moduleName = 'auth';

export const module = {
  namespaced: true,

  state: {
    error: null,
    pending: false,
    user: null,
  } as AuthState,

  getters: {
    error: (state: AuthState) => state.error,
    pending: (state: AuthState) => state.pending,
    user: (state: AuthState) => state.user,
  },

  mutations: {
    clear(state: AuthState) {
      state.error = null;
      state.pending = false;
    },

    authAttempt(state: AuthState) {
      state.error = null;
      state.pending = true;
    },

    authSuccess(state: AuthState, user: AuthUser) {
      state.error = null;
      state.pending = false;
      state.user = user;
    },

    authError(state: AuthState, err: string) {
      state.error = err;
      state.pending = false;
    },

    signOut(state: AuthState) {
      state.error = null;
      state.pending = false;
      state.user = null;
    },
  },

  actions: {
    async autoSignIn(ctx: AuthContext, user: firebase.User): Promise<AuthUser> {
      return firebaseUserToAuthUser(user)
        .then((authUser) => {
          commiters.authSuccess(ctx, authUser);
          return authUser;
        });
    },

    async clear(ctx: AuthContext): Promise<void> {
      commiters.clear(ctx);
    },

    async linkWithEmailAndPassword(
      ctx: AuthContext,
      credentials: EmailAndPassword,
    ): Promise<AuthUser | null> {
      commiters.authAttempt(ctx);
      const credential = firebase.auth.EmailAuthProvider.credential(
        credentials.email,
        credentials.password,
      );
      return AuthApi.linkWithCredential(credential)
        .then((user: firebase.User) => firebaseUserToAuthUser(user))
        .then((authUser: AuthUser) => {
          commiters.authSuccess(ctx, authUser);
          return authUser;
        })
        .catch((err: Error) => {
          commiters.authError(ctx, err.message);
          return null;
        });
    },

    async signInAnonymously(ctx: AuthContext): Promise<AuthUser | null> {
      commiters.authAttempt(ctx);

      return AuthApi.signInAnonymously()
        .then((user: firebase.User) => firebaseUserToAuthUser(user))
        .then((authUser: AuthUser) => {
          commiters.authSuccess(ctx, authUser);
          return authUser;
        })
        .catch((err: Error) => {
          commiters.authError(ctx, err.message);
          return null;
        });
    },

    async signInWithEmailAndPassword(
      ctx: AuthContext,
      credentials: EmailAndPassword,
    ): Promise<AuthUser | null> {
      commiters.authAttempt(ctx);

      return AuthApi.signInWithEmailAndPassword(credentials)
        .then((user: firebase.User) => firebaseUserToAuthUser(user))
        .then((authUser: AuthUser) => {
          commiters.authSuccess(ctx, authUser);
          return authUser;
        })
        .catch((err: Error) => {
          commiters.authError(ctx, err.message);
          return null;
        });
    },

    async signOut(ctx: AuthContext): Promise<void> {
      return AuthApi.signOut().then(() => {
        commiters.signOut(ctx);
      });
    },

    async signUpWithEmailAndPassword(
      ctx: AuthContext,
      credentials: EmailAndPassword,
    ): Promise<AuthUser | null> {
      commiters.authAttempt(ctx);

      return AuthApi.signUpWithEmailAndPassword(credentials)
        .then((user: firebase.User) => firebaseUserToAuthUser(user))
        .then((authUser: AuthUser) => {
          commiters.authSuccess(ctx, authUser);
          return authUser;
        })
        .catch((err: Error) => {
          commiters.authError(ctx, err.message);
          return null;
        });
    },
  },
};

const { commit, read, dispatch } = getStoreAccessors<AuthState, RootState>(
  moduleName,
);

const commiters = {
  authAttempt: commit(module.mutations.authAttempt),
  authError: commit(module.mutations.authError),
  authSuccess: commit(module.mutations.authSuccess),
  clear: commit(module.mutations.clear),
  signOut: commit(module.mutations.signOut),
};

export const getters = {
  error: read(module.getters.error),
  pending: read(module.getters.pending),
  user: read(module.getters.user),
};

export const dispatchers = {
  autoSignIn: dispatch(module.actions.autoSignIn),
  clear: dispatch(module.actions.clear),
  linkWithEmailAndPassword: dispatch(module.actions.linkWithEmailAndPassword),
  signInAnonymously: dispatch(module.actions.signInAnonymously),
  signInWithEmailAndPassword: dispatch(
    module.actions.signInWithEmailAndPassword,
  ),
  signOut: dispatch(module.actions.signOut),
  signUpWithEmailAndPassword: dispatch(
    module.actions.signUpWithEmailAndPassword,
  ),
};

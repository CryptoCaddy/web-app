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
  },

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
    autoSignIn(ctx: AuthContext, user: firebase.User) {
      const authUser = firebaseUserToAuthUser(user);
      commiters.authSuccess(ctx, authUser);
    },

    clear(ctx: AuthContext) {
      commiters.clear(ctx);
    },

    linkWithEmailAndPassword(ctx: AuthContext, credentials: EmailAndPassword) {
      commiters.authAttempt(ctx);
      const credential = firebase.auth.EmailAuthProvider.credential(
        credentials.email,
        credentials.password,
      );
      AuthApi.linkWithCredential(credential)
        .then((user: firebase.User) => {
          commiters.authSuccess(ctx, firebaseUserToAuthUser(user));
        })
        .catch((err: Error) => {
          commiters.authError(ctx, err.message);
        });
    },

    signInAnonymously(ctx: AuthContext) {
      commiters.authAttempt(ctx);

      AuthApi.signInAnonymously()
        .then((user: firebase.User) => {
          commiters.authSuccess(ctx, firebaseUserToAuthUser(user));
        })
        .catch((err: Error) => {
          commiters.authError(ctx, err.message);
        });
    },

    signInWithEmailAndPassword(
      ctx: AuthContext,
      credentials: EmailAndPassword,
    ) {
      commiters.authAttempt(ctx);

      AuthApi.signInWithEmailAndPassword(credentials)
        .then((user: firebase.User) => {
          commiters.authSuccess(ctx, firebaseUserToAuthUser(user));
        })
        .catch((err: Error) => {
          commiters.authError(ctx, err.message);
        });
    },

    signOut(ctx: AuthContext) {
      AuthApi.signOut().then(() => {
        commiters.signOut(ctx);
      });
    },

    signUpWithEmailAndPassword(
      ctx: AuthContext,
      credentials: EmailAndPassword,
    ) {
      commiters.authAttempt(ctx);

      AuthApi.signUpWithEmailAndPassword(credentials)
        .then((user: firebase.User) => {
          commiters.authSuccess(ctx, firebaseUserToAuthUser(user));
        })
        .catch((err: Error) => {
          commiters.authError(ctx, err.message);
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

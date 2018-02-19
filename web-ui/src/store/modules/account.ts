import AccountApi from '@/api/account';
import {
  AccountPreferences,
  AccountState,
} from '@/store/modules/account.state';
import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';

import { State as RootState } from '../';

export const moduleName = 'account';

type AccountContext = ActionContext<AccountState, RootState>;

export const module = {
  namespaced: true,

  state: {
    error: null,
    loading: false,
    preferences: {},
    saving: false,
  },

  getters: {
    loading: (state: AccountState) => state.loading,
    preferences: (state: AccountState) => state.preferences,
    saving: (state: AccountState) => state.saving,
  },

  mutations: {
    loadPreferencesError(state: AccountState, error: Error | null) {
      state.loading = false;
      state.error = error;
    },

    loadPreferences(state: AccountState) {
      state.error = null;
      state.loading = true;
    },

    loadPreferencesSuccess(
      state: AccountState,
      preferences: AccountPreferences,
    ) {
      state.loading = false;
      state.preferences = preferences;
    },

    savePreferencesError(state: AccountState, error: Error | null) {
      state.saving = false;
      state.error = error;
    },

    savePreferences(state: AccountState) {
      state.error = null;
      state.saving = true;
    },

    savePreferencesSuccess(
      state: AccountState,
      preferences: AccountPreferences,
    ) {
      state.saving = false;
      state.preferences = preferences;
    },
  },

  actions: {
    loadPreferences(ctx: AccountContext) {
      commiters.loadPreferences(ctx);

      AccountApi.getPreferences()
        .then((preferences) => {
          commiters.loadPreferencesSuccess(ctx, preferences);
        })
        .catch((err) => {
          commiters.loadPreferencesError(ctx, err);
        });
    },

    updatePreferences(
      ctx: AccountContext,
      preferences: Partial<AccountPreferences>,
    ) {
      commiters.savePreferences(ctx);
      AccountApi.updatePreferences({ ...ctx.state.preferences, ...preferences })
        .then((updatedPreferences) => {
          commiters.savePreferencesSuccess(ctx, updatedPreferences);
        })
        .catch((err: Error) => {
          commiters.savePreferencesError(ctx, err);
        });
    },
  },
};

const { commit, read, dispatch } = getStoreAccessors<AccountState, RootState>(
  moduleName,
);

const commiters = {
  loadPreferencesError: commit(module.mutations.loadPreferencesError),
  loadPreferences: commit(module.mutations.loadPreferences),
  loadPreferencesSuccess: commit(module.mutations.loadPreferencesSuccess),
  savePreferencesError: commit(module.mutations.savePreferencesError),
  savePreferences: commit(module.mutations.savePreferences),
  savePreferencesSuccess: commit(module.mutations.savePreferencesSuccess),
};

export const getters = {
  loading: read(module.getters.loading),
  preferences: read(module.getters.preferences),
  saving: read(module.getters.saving),
};

export const dispatchers = {
  loadPreferences: dispatch(module.actions.loadPreferences),
  updatePreferences: dispatch(module.actions.updatePreferences),
};

import ChoicesApi from '@/api/choices';
import { SelectOption } from '@/models/SelectOption';
import { Choice, ChoiceState } from '@/store/modules/choice.state';
import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';

import { State as RootState } from '../';
import { Logger } from '../../util/logger';

export const moduleName = 'choice';

type ChoiceContext = ActionContext<ChoiceState, RootState>;

export const module = {
  namespaced: true,

  state: {
    currency: { options: [], pending: false },
    timezone: { options: [], pending: false },
  },

  getters: {
    currency: (state: ChoiceState): Choice => state.currency,
    timezone: (state: ChoiceState): Choice => state.timezone,
  },

  mutations: {
    currencyLoaded(state: ChoiceState, options: SelectOption[]) {
      state.currency.options = options;
      state.currency.pending = false;
    },

    currencyLoading(state: ChoiceState) {
      state.currency.options = [];
      state.currency.pending = true;
    },

    timezoneLoaded(state: ChoiceState, options: SelectOption[]) {
      state.timezone.options = options;
      state.timezone.pending = false;
    },

    timezoneLoading(state: ChoiceState) {
      state.timezone.options = [];
      state.timezone.pending = true;
    },
  },

  actions: {
    loadCurrencyOptions(ctx: ChoiceContext) {
      commiters.currencyLoading(ctx);

      ChoicesApi.getCurrencies()
        .then((options) => {
          commiters.currencyLoaded(ctx, options);
        })
        .catch((err) => {
          // @TODO error handling
          Logger.warn('ChoiceStore#loadCurrencyOptions', err);
        });
    },

    loadTimezoneOptions(ctx: ChoiceContext) {
      commiters.timezoneLoading(ctx);

      ChoicesApi.getTimezones()
        .then((options) => {
          commiters.timezoneLoaded(ctx, options);
        })
        .catch((err) => {
          // @TODO error handling
          Logger.warn('ChoiceStore#loadTimezoneOptions', err);
        });
    },
  },
};

const { commit, read, dispatch } = getStoreAccessors<ChoiceState, RootState>(
  moduleName,
);

const commiters = {
  currencyLoaded: commit(module.mutations.currencyLoaded),
  currencyLoading: commit(module.mutations.currencyLoading),
  timezoneLoaded: commit(module.mutations.timezoneLoaded),
  timezoneLoading: commit(module.mutations.timezoneLoading),
};

export const getters = {
  currency: read(module.getters.currency),
  timezone: read(module.getters.timezone),
};

export const dispatchers = {
  loadCurrencyOptions: dispatch(module.actions.loadCurrencyOptions),
  loadTimezoneOptions: dispatch(module.actions.loadTimezoneOptions),
};

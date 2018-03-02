import { ExchangesApi } from '@/api/exchanges';
import { ExchangeAddRequest, ExchangeWallet, SupportedExchange } from '@/api/exchanges.models';
import {
  ExchangesState,
  ExchangeTradesState,
  ExchangeWalletsState,
  SupportedExchangeState,
} from '@/store/modules/exchanges.state';
import { RequestState } from 'cryptocaddy/util';
import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';

import { State as RootState } from '../';

export const moduleName = 'exchanges';

type ExchangesContext = ActionContext<ExchangesState, RootState>;

export const module = {
  namespaced: true,

  state: {
    addExchange: {
      pending: false,
      error: null,
    },
    trades: {
      data: [],
      pending: false,
      error: null,
    },
    wallets: {
      data: [],
      pending: false,
      error: null,
    },
    supported: {
      data: [],
      pending: false,
      error: null,
    },
  },

  getters: {
    addExchange: (state: ExchangesState): RequestState => state.addExchange,
    supported: (state: ExchangesState): SupportedExchangeState => state.supported,
    trades: (state: ExchangesState): ExchangeTradesState => state.trades,
    wallets: (state: ExchangesState): ExchangeWalletsState => state.wallets,
  },

  mutations: {
    addExchangeInitiated(state: ExchangesState) {
      state.addExchange.pending = true;
      state.addExchange.error = null;
    },

    addExchangeError(state: ExchangesState, err: string) {
      state.addExchange.pending = false;
      state.addExchange.error = err;
    },

    addExchangeSuccess(state: ExchangesState, wallet: ExchangeWallet) {
      state.wallets.data.push(wallet);
      state.addExchange.pending = false;
    },

    supportedLoading(state: ExchangesState) {
      state.supported.pending = true;
      state.supported.error = null;
      state.supported.data = [];
    },

    supportedLoadSuccess(state: ExchangesState, data: SupportedExchange[]) {
      state.supported.pending = false;
      state.supported.data = data;
    },

    supportedLoadError(state: ExchangesState, err: string) {
      state.supported.pending = false;
      state.supported.error = err;
    },

    walletsLoading(state: ExchangesState) {
      state.wallets.pending = true;
      state.wallets.error = null;
      state.wallets.data = [];
    },

    walletsLoadSuccess(state: ExchangesState, data: ExchangeWallet[]) {
      state.wallets.pending = false;
      state.wallets.data = data;
    },

    walletsLoadError(state: ExchangesState, err: string) {
      state.wallets.pending = false;
      state.wallets.error = err;
    },
  },

  actions: {

    async addExchange(
      ctx: ExchangesContext,
      exchangeToAdd: ExchangeAddRequest,
    ): Promise<any | null> {
      commiters.addExchangeInitiated(ctx);

      return ExchangesApi.addExchange(exchangeToAdd)
        .then((data) => {
          commiters.addExchangeSuccess(ctx, data);
          return data;
        })
        .catch((err: Error) => {
          commiters.addExchangeError(ctx, err.message);
          return null;
        });
    },

    async loadSupported(ctx: ExchangesContext): Promise<SupportedExchange[]> {
      commiters.supportedLoading(ctx);

      return ExchangesApi.getSupportedExchanges()
        .then((data) => {
          commiters.supportedLoadSuccess(ctx, data);
          return data;
        })
        .catch((err: string) => {
          commiters.supportedLoadError(ctx, err);
          return [];
        });
    },

    // async loadTrades(ctx: ExchangesContext): Promise<void> {
    //   return
    // },

    async loadWallets(ctx: ExchangesContext): Promise<ExchangeWallet[]> {
      commiters.walletsLoading(ctx);

      return ExchangesApi.getWallets()
        .then((data: ExchangeWallet[]) => {
          commiters.walletsLoadSuccess(ctx, data);
          return data;
        })
        .catch((err: Error) => {
          commiters.walletsLoadError(ctx, err.message);
          return [];
        });
    },

  },

};

const { commit, read, dispatch } = getStoreAccessors<ExchangesState, RootState>(
  moduleName,
);

const commiters = {
  addExchangeInitiated: commit(module.mutations.addExchangeInitiated),
  addExchangeError: commit(module.mutations.addExchangeError),
  addExchangeSuccess: commit(module.mutations.addExchangeSuccess),

  supportedLoading: commit(module.mutations.supportedLoading),
  supportedLoadSuccess: commit(module.mutations.supportedLoadSuccess),
  supportedLoadError: commit(module.mutations.supportedLoadError),

  walletsLoading: commit(module.mutations.walletsLoading),
  walletsLoadSuccess: commit(module.mutations.walletsLoadSuccess),
  walletsLoadError: commit(module.mutations.walletsLoadError),
};

export const getters = {
  addExchange: read(module.getters.addExchange),
  supported: read(module.getters.supported),
  trades: read(module.getters.trades),
  wallets: read(module.getters.wallets),
};

export const dispatchers = {
  addExchange: dispatch(module.actions.addExchange),
  loadWallets: dispatch(module.actions.loadWallets),
  loadSupported: dispatch(module.actions.loadSupported),
};

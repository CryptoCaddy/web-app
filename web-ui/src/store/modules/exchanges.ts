import { ExchangesApi } from '@/api/exchanges';
import {
  ExchangeAddRequest,
  ExchangeIdType,
  ExchangeWallet,
  SupportedExchange,
} from '@/api/exchanges.models';
import {
  ExchangesState,
  ExchangeTradesState,
  ExchangeWalletsState,
  SupportedExchangeState,
} from '@/store/modules/exchanges.state';
import { StoreUtils } from '@/store/util';
import { AxiosError } from 'axios';
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
    removeExchange: {
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
    removeExchange: (state: ExchangesState): RequestState => state.removeExchange,
    supported: (state: ExchangesState): SupportedExchangeState => state.supported,
    trades: (state: ExchangesState): ExchangeTradesState => state.trades,
    wallets: (state: ExchangesState): ExchangeWalletsState => state.wallets,
  },

  mutations: {
    addExchangeInitiated(state: ExchangesState) {
      state.addExchange.pending = true;
      state.addExchange.error = null;
    },

    addExchangeError(state: ExchangesState, err: Error) {
      state.addExchange.pending = false;
      state.addExchange.error = err.message;
    },

    addExchangeSuccess(state: ExchangesState, wallet: ExchangeWallet) {
      state.wallets.data.push(wallet);
      state.addExchange.pending = false;
    },

    removeExchangeInitiated(state: ExchangesState) {
      state.removeExchange.pending = true;
      state.removeExchange.error = null;
    },

    removeExchangeError(state: ExchangesState, err: AxiosError) {
      state.removeExchange.pending = false;
      state.removeExchange.error = err.message;
    },

    removeExchangeSuccess(state: ExchangesState, exchangeId: ExchangeIdType) {
      state.removeExchange.pending = false;
      state.wallets.data = state.wallets.data.filter(
        (ex) => ex.exchangeEntryId !== exchangeId,
      );
    },

    supportedLoading(state: ExchangesState) {
      state.supported.pending = true;
      state.supported.error = null;
      state.supported.data = [];
    },

    supportedLoadSuccess(state: ExchangesState, data: SupportedExchange[]) {
      state.supported.pending = false;
      state.supported.data = data;
      state.supported.timestamp = Date.now();
    },

    supportedLoadError(state: ExchangesState, err: Error) {
      state.supported.pending = false;
      state.supported.error = err.message;
    },

    walletsLoading(state: ExchangesState) {
      state.wallets.pending = true;
      state.wallets.error = null;
      state.wallets.data = [];
    },

    walletsLoadSuccess(state: ExchangesState, data: ExchangeWallet[]) {
      state.wallets.pending = false;
      state.wallets.data = data;
      state.wallets.timestamp = Date.now();
    },

    walletsLoadError(state: ExchangesState, err: Error) {
      state.wallets.pending = false;
      state.wallets.error = err.message;
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
        .catch((err: AxiosError) => {
          commiters.addExchangeError(ctx, err);
          return null;
        });
    },

    async loadSupported(
      ctx: ExchangesContext,
      { forceLoad = false } = { },
    ): Promise<SupportedExchange[]> {
      if (!forceLoad) {
        const stored = StoreUtils.getStoredData(ctx.state.supported);
        if (stored) { return stored; }
      }

      commiters.supportedLoading(ctx);

      return ExchangesApi.getSupportedExchanges()
        .then((data) => {
          commiters.supportedLoadSuccess(ctx, data);
          return data;
        })
        .catch((err: AxiosError) => {
          commiters.supportedLoadError(ctx, err);
          return [];
        });
    },

    async loadWallets(
      ctx: ExchangesContext,
      { forceLoad = false } = { },
    ): Promise<ExchangeWallet[]> {
      if (!forceLoad) {
        const stored = StoreUtils.getStoredData(ctx.state.wallets);
        console.log('loadWallets', stored);
        if (stored) { return stored; }
      }

      commiters.walletsLoading(ctx);

      return ExchangesApi.getWallets()
        .then((data: ExchangeWallet[]) => {
          commiters.walletsLoadSuccess(ctx, data);
          return data;
        })
        .catch((err: AxiosError) => {
          commiters.walletsLoadError(ctx, err);
          return [];
        });
    },

    async removeExchange(ctx: ExchangesContext, exchangeId: ExchangeIdType): Promise<any> {
      commiters.removeExchangeInitiated(ctx);

      return ExchangesApi.removeExchange(exchangeId)
        .then((data: any) => {
          commiters.removeExchangeSuccess(ctx, exchangeId);
          return data;
        })
        .catch((err: AxiosError) => {
          commiters.removeExchangeError(ctx, err);
          return undefined;
        });
    },

  },

};

const { commit, read, dispatch } =
  getStoreAccessors<ExchangesState, RootState>(moduleName);

const commiters = {
  addExchangeInitiated: commit(module.mutations.addExchangeInitiated),
  addExchangeError: commit(module.mutations.addExchangeError),
  addExchangeSuccess: commit(module.mutations.addExchangeSuccess),

  removeExchangeInitiated: commit(module.mutations.removeExchangeInitiated),
  removeExchangeError: commit(module.mutations.removeExchangeError),
  removeExchangeSuccess: commit(module.mutations.removeExchangeSuccess),

  supportedLoading: commit(module.mutations.supportedLoading),
  supportedLoadSuccess: commit(module.mutations.supportedLoadSuccess),
  supportedLoadError: commit(module.mutations.supportedLoadError),

  walletsLoading: commit(module.mutations.walletsLoading),
  walletsLoadSuccess: commit(module.mutations.walletsLoadSuccess),
  walletsLoadError: commit(module.mutations.walletsLoadError),
};

export const getters = {
  addExchange: read(module.getters.addExchange),
  removeExchange: read(module.getters.removeExchange),
  supported: read(module.getters.supported),
  trades: read(module.getters.trades),
  wallets: read(module.getters.wallets),
};

export const dispatchers = {
  addExchange: dispatch(module.actions.addExchange),
  removeExchange: dispatch(module.actions.removeExchange),
  loadWallets: dispatch(module.actions.loadWallets),
  loadSupported: dispatch(module.actions.loadSupported),
};

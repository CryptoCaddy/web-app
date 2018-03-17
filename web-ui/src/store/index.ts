import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import * as AccountStore from './modules/account';
import { AccountState } from './modules/account.state';
import * as AuthStore from './modules/auth';
import { AuthState } from './modules/auth.state';
import * as ChoiceStore from './modules/choice';
import { ChoiceState } from './modules/choice.state';
import * as ExchangesStore from './modules/exchanges';
import { ExchangesState } from './modules/exchanges.state';

Vue.use(Vuex);

const vuexPersistance = createPersistedState({
  storage: window.sessionStorage,
});

const debug = process.env.NODE_ENV !== 'production';

export interface State {
  [AccountStore.moduleName]: AccountState;
  [AuthStore.moduleName]: AuthState;
  [ChoiceStore.moduleName]: ChoiceState;
  [ExchangesStore.moduleName]: ExchangesState;
}

export default new Vuex.Store({
  plugins: [vuexPersistance],
  modules: {
    [AccountStore.moduleName]: AccountStore.module,
    [AuthStore.moduleName]: AuthStore.module,
    [ChoiceStore.moduleName]: ChoiceStore.module,
    [ExchangesStore.moduleName]: ExchangesStore.module,
  },
  strict: debug,
});

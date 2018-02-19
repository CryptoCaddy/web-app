import Vue from 'vue';
import Vuex from 'vuex';

import * as AccountStore from './modules/account';
import { AccountState } from './modules/account.state';
import * as AuthStore from './modules/auth';
import { AuthState } from './modules/auth.state';
import * as ChoiceStore from './modules/choice';
import { ChoiceState } from './modules/choice.state';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export interface State {
  [AccountStore.moduleName]: AccountState;
  [AuthStore.moduleName]: AuthState;
  [ChoiceStore.moduleName]: ChoiceState;
}

export default new Vuex.Store({
  modules: {
    [AccountStore.moduleName]: AccountStore.module,
    [AuthStore.moduleName]: AuthStore.module,
    [ChoiceStore.moduleName]: ChoiceStore.module,
  },
  strict: debug,
});

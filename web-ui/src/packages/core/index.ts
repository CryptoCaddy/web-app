import { VueConstructor } from 'vue';

import CCPageError from './components/CCPageError.vue';
import CCPageProgress from './components/CCPageProgress.vue';

export const CryptCaddyCore = {

  install(Vue: VueConstructor) {
    Vue.component('cc-page-error', CCPageError);
    Vue.component('cc-page-progress', CCPageProgress);
  },

};

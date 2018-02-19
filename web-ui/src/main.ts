import './registerServiceWorker';
import './theme';
import 'firebase/auth';

import * as AuthStore from '@/store/modules/auth';
import firebase from 'firebase/app';
import Vue from 'vue';
import VueScrollReveal from 'vue-scroll-reveal';

import { config as firebaseConfig } from '../config/firebase';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueScrollReveal);

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    firebase.initializeApp(firebaseConfig);

    // Listen to auth state change once on load and unsubscribe after.
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      if (!user) {
        return;
      }
      AuthStore.dispatchers.autoSignIn(this.$store, user);
    });
  },
}).$mount('#app');

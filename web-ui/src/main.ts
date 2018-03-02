import './helpers/axios.interceptors';
import './registerServiceWorker';
import './theme';
import 'firebase/auth';

import firebase from 'firebase/app';
import Vue from 'vue';
import VueScrollReveal from 'vue-scroll-reveal';

import firebaseConfig from '../config/firebase';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueScrollReveal);

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

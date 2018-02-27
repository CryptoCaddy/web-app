import './main.scss';
import 'vuetify/src/stylus/main.styl';

import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.base,
    secondary: colors.teal.darken2,
    accent: colors.orange.darken3,
  },
});

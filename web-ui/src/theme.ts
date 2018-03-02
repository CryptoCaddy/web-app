import './main.scss';
import 'vuetify/src/stylus/main.styl';

import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';

/**
 * Theme: @see http://materialmixer.co/#00897B/FFC400
 * Color definitions: @see https://github.com/vuetifyjs/vuetify/blob/master/src/stylus/settings/_colors.styl
 */
Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.darken1,
    'primary-light': colors.teal.lighten3,
    'primary-dark': colors.teal.darken3,
    secondary: colors.teal.darken3,
    accent: colors.amber.accent3,
    'accent-light': colors.amber.accent2,
    'accent-dark': colors.amber.darken1,
  },
});

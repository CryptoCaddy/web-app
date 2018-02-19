/**
 * Allow importing Single File Components
 */
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

/**
 * Modules without type defintiions
 */
declare module 'vue-scroll-reveal';
declare module 'vuetify/es5/util/colors';

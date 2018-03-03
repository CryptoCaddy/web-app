<template>
  <transition name="app">
    <v-app
      class="app-root"
      v-if="initialized"
    >

      <AppDrawer v-model="drawer" />

      <v-toolbar
        color="primary"
        dark
        fixed
        clipped-right
        app>
        <v-toolbar-title>
          <router-link to="/">Crypto Caddy</router-link>
        </v-toolbar-title>
        <v-spacer/>
        <v-toolbar-side-icon
          v-if="!largeScreen"
          @click.stop="drawer = !drawer"
        />
      </v-toolbar>

      <v-content>
        <transition
          name="router"
          mode="out-in">
          <router-view />
        </transition>

        <v-spacer/>
        <v-footer
          class="pa-2"
          color="primary"
          dark>
          <v-spacer/>
          - work in progress -
          <v-spacer/>
        </v-footer>
      </v-content>

    </v-app>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import AppDrawer from '@/components/AppDrawer.vue';
import * as AuthStore from '@/store/modules/auth';
import firebase from 'firebase/app';

export default Vue.extend({
  name: 'App',

  components: { AppDrawer },

  computed: {
    largeScreen(): boolean {
      return this.$vuetify.breakpoint.lgAndUp;
    },
  },

  data() {
    return {
      drawer: false,
      initialized: false,
    };
  },

  created() {
    /**
     * Wait for the initial auth state of firebase. If the user is logged in,
     * wait for the data to be updated in the store, especially the JWT token,
     * since it's used for further requests in components.
     */
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();

      if (user) {
        AuthStore.dispatchers.autoSignIn(this.$store, user)
          .then(() => { this.initialized = true; });
        return;
      }

      this.initialized = true;
    });
  },
});
</script>

<style lang="scss" scoped>
.app-root {
  overflow: hidden;
}

/deep/ .content--wrap {
  display: flex;
  flex-direction: column;
}

.toolbar__title a {
  color: white;
  text-decoration: none;
}

.app-enter {
  opacity: 0;
}

.app-enter-active {
  transition: all 600ms cubic-bezier(0.165, 0.84, 0.44, 1);
}

.router-enter {
  opacity: 0;
  transform: translateX(10%);
}

.router-leave-to {
  opacity: 0;
  transform: translateX(-10%);
}

.router-enter-active,
.router-leave-active {
  transition: all 0.15s;
}

.router-leave-active {
  position: absolute;
}
</style>

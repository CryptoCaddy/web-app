<template>
  <v-app class="app-root">
    <v-navigation-drawer ref="drawerEl" v-model="drawer" right app
      :clipped="largeScreen"
      :fixed="largeScreen"
      :permanent="largeScreen"
      :mini-variant="useMiniDrawer"
    >
      <transition
        name="avatar"
      >
        <v-toolbar flat color="transparent" v-if="user">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="gravatarUrl">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ displayName }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
      </transition>

      <v-divider></v-divider>

      <v-list>
      <v-tooltip left lazy
        open-delay="200"
        close-delay="100"
        tag="div"
        v-for="entry of menuEntries"
        v-if="entry.condition()"
        :key="entry.id"
        :disabled="!useMiniDrawer"
      >
        <v-list-tile
          slot="activator"
          :to="entry.to ? entry.to : null"
          @click="entry.action ? entry.action() : null"
        >
          <v-list-tile-action>
              <!-- <v-btn dark color="primary" slot="activator">Left</v-btn> -->
              <v-icon >{{ entry.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ entry.label }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      <span>{{ entry.label }}</span>
      </v-tooltip>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="primary" height="56dp" dark fixed clipped-right app>
      <v-toolbar-title>
        <router-link to="/">Crypto Caddy</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>

    <v-content>
      <transition name="router" mode="out-in">
        <router-view />
      </transition>

      <v-spacer></v-spacer>
      <v-footer class="pa-2" color="primary" dark>
        <v-spacer></v-spacer>
        - work in progress -
        <v-spacer></v-spacer>
      </v-footer>
    </v-content>

  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import * as md5 from 'md5';
import * as AuthStore from '@/store/modules/auth';
import { AuthUser } from '@/store/modules/auth.state';

interface MenuEntry {
  id: string;
  icon: string;
  label: string;
  to?: string;
  action?: () => void;
  condition: () => boolean;
}

export default Vue.extend({
  name: 'App',

  computed: {
    largeScreen(): boolean {
      return this.$vuetify.breakpoint.lgAndUp;
    },

    useMiniDrawer(): boolean {
      // Mini drawer will be shown instead of hiding the drawer on large screens
      return this.largeScreen && !this.drawer;
    },

    user(): AuthUser | null {
      return AuthStore.getters.user(this.$store);
    },

    email(): string {
      return (this.user && this.user.email) || '';
    },

    displayName(): string {
      if (!this.user) {
        return '';
      }

      if (this.user.isAnonymous) {
        return 'Temporary Account';
      }

      return this.user.email || '';
    },

    gravatarUrl() {
      const email: string = this.email;
      return `https://www.gravatar.com/avatar/${md5(email)}?s=80`;
    },

    menuEntries(): MenuEntry[] {
      return [
        {
          id: 'home',
          icon: 'home',
          label: 'Home',
          to: '/',
          condition: () => true,
        },
        {
          id: 'account',
          icon: 'account_box',
          label: 'Account',
          to: '/account',
          condition: () => !!this.user,
        },
        {
          id: 'sign-in',
          icon: 'vpn_key',
          label: 'Sign In',
          to: '/sign-in',
          condition: () => !this.user,
        },
        {
          id: 'sign-out',
          icon: 'exit_to_app',
          label: 'Sign Out',
          action: () => this.signOut(),
          condition: () => !!this.user,
        },
      ];
    },
  },

  data() {
    return {
      drawer: false,
    };
  },

  methods: {
    signOut() {
      AuthStore.dispatchers.signOut(this.$store);

      // Make sure to hide drawer in mobile mode, since it may not be hidden
      // if current route and target route afer sign out are the same
      if ((this.$refs.drawerEl as any).isMobile) {
        this.drawer = false;
      }
      this.$router.push('/sign-out');
    },
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

.avatar-enter,
.avatar-leave-to {
  margin-top: -64px !important;
  opacity: 0;
}

.avatar-enter-to,
.avatar-leave {
  margin-top: 0 !important;
  opacity: 1;
}

.avatar-enter-active,
.avatar-leave-active {
  transition: all 0.15s;
}
</style>

<template>
  <v-navigation-drawer
    ref="drawerEl"
    :value="value"
    @input="$emit('input', $event)"
    right
    app
    :clipped="largeScreen"
    :fixed="largeScreen"
    :permanent="largeScreen"
    :mini-variant.sync="useMiniDrawer"
  >
    <transition
      name="avatar"
    >
      <v-toolbar
        flat
        color="transparent"
        height="56dp"
        v-if="user"
      >
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

    <v-divider/>

    <v-list>
      <template
        v-for="item of drawerItems"
        v-if="item.condition()"
      >
        <AppDrawerItemEntry
          v-if="item.type === AppDrawerItemType.Entry"
          :key="item.id"
          :entry="item"
        />
        <AppDrawerItemGroup
          v-else-if="item.type === AppDrawerItemType.Group"
          :key="item.id"
          :group="item"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import * as md5 from 'md5';

import AppDrawerItemEntry, { IAppDrawerItemEntry } from '@/components/AppDrawerItemEntry.vue';
import AppDrawerItemGroup, { IAppDrawerItemGroup } from '@/components/AppDrawerItemGroup.vue';
import { AppDrawerItemType } from '@/models/AppDrawerBaseItem';
import * as AuthStore from '@/store/modules/auth';
import { AuthUser } from '@/store/modules/auth.state';


type AppDrawerItem = IAppDrawerItemEntry | IAppDrawerItemGroup;

export default Vue.extend({
  components: { AppDrawerItemEntry, AppDrawerItemGroup },

  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    /** Enum exposed for usage in template. */
    AppDrawerItemType() {
      return AppDrawerItemType;
    },

    largeScreen(): boolean {
      return this.$vuetify.breakpoint.lgAndUp;
    },

    useMiniDrawer(): boolean {
      // Mini drawer will be shown instead of hiding the drawer on large screens
      return this.largeScreen && !this.value;
    },

    user(): AuthUser | null {
      return AuthStore.getters.user(this.$store);
    },

    email(): string {
      return (this.user && this.user.email) || '';
    },

    displayName(): string {
      if (this.user == null) {
        return '';
      }

      if (this.user.isAnonymous) {
        return 'Temporary Account';
      }

      return this.user.email || '';
    },

    gravatarUrl() {
      /* eslint-disable-next-line prefer-destructuring */
      const email: string = this.email;
      return `https://www.gravatar.com/avatar/${md5(email)}?s=80`;
    },

    drawerItems(): AppDrawerItem[] {
      return [
        {
          type: AppDrawerItemType.Entry,
          id: 'home',
          icon: 'dashboard',
          label: 'Home',
          to: { name: 'Home' },
          exact: true,
          condition: () => true,
        },
        {
          type: AppDrawerItemType.Group,
          id: 'settings',
          label: 'Settings',
          condition: () => !!this.user,
          items: [
            {
              type: AppDrawerItemType.Entry,
              id: 'account',
              icon: 'account_box',
              label: 'Account',
              to: { name: 'Account' },
              condition: () => !!this.user,
            },
            {
              type: AppDrawerItemType.Entry,
              id: 'exchanges',
              icon: 'swap_vert',
              label: 'Exchanges',
              to: { name: 'ExchangesOverview' },
              condition: () => !!this.user,
            },
          ],
        },
        {
          type: AppDrawerItemType.Entry,
          id: 'sign-in',
          icon: 'vpn_key',
          label: 'Sign In',
          to: '/sign-in',
          condition: () => !this.user,
        },
        {
          type: AppDrawerItemType.Entry,
          id: 'sign-out',
          icon: 'exit_to_app',
          label: 'Sign Out',
          action: () => this.signOut(),
          condition: () => !!this.user,
        },
      ];
    },

  },

  methods: {
    signOut() {
      AuthStore.dispatchers.signOut(this.$store);

      // Make sure to hide drawer in mobile mode, since it may not be hidden
      // if current route and target route afer sign out are the same
      if ((this.$refs.drawerEl as any).isMobile) {
        this.$emit('input', false);
      }
      this.$router.push('/sign-out');
    },
  },


});
</script>


<style lang="scss">
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

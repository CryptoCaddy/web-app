<template>
  <v-card flat dark color="primary" >

    <v-card-text class="pb-0">
      <v-avatar
        size="64"
        class="grey lighten-4"
      >
        <img :src="gravatarUrl" alt="avatar">
      </v-avatar>
    </v-card-text>

    <v-card-text class="pa-0">
      <v-list class="pb-0">
        <v-list-group
          append-icon="arrow_drop_down"
          no-action
        >

          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ displayName }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <div class="white black--text">
            <AppDrawerItemEntry
              v-for="item of drawerItems"
              v-if="item.condition()"
              :key="item.id"
              :entry="item"
            />
          </div>
        </v-list-group>
      </v-list>
    </v-card-text>

  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import * as md5 from 'md5';

import * as AuthStore from '@/store/modules/auth';
import { AuthUser } from '@/store/modules/auth.state';
import AppDrawerItemEntry, { IAppDrawerItemEntry } from '@/components/AppDrawerItemEntry.vue';
import { AppDrawerItemType } from '@/models/AppDrawerBaseItem';

export default Vue.extend({
  components: { AppDrawerItemEntry },

  computed: {
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

    drawerItems(): IAppDrawerItemEntry[] {
      return [
        {
          type: AppDrawerItemType.Entry,
          id: 'account',
          label: 'Account Settings',
          to: { name: 'Account' },
          condition: () => !!this.user,
        },
        {
          type: AppDrawerItemType.Entry,
          id: 'sign-out',
          label: 'Sign Out',
          action: () => this.signOut(),
          condition: () => !!this.user,
        },
      ];
    },

    gravatarUrl() {
      /* eslint-disable-next-line prefer-destructuring */
      const email: string = this.email;
      return `https://www.gravatar.com/avatar/${md5(email)}?s=80`;
    },
  },

  methods: {
    signOut() {
      AuthStore.dispatchers.signOut(this.$store);

      // Make sure to hide drawer in mobile mode, since it may not be hidden
      // if current route and target route afer sign out are the same
      // if ((this.$refs.drawerEl as any).isMobile) {
      //   this.$emit('input', false);
      // }
      this.$router.push('/sign-out');
    },
  },

});
</script>

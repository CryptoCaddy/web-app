<template>
  <v-navigation-drawer
    ref="drawerEl"
    :value="value"
    @input="$emit('input', $event)"
    :right="!largeScreen"
    app
    :fixed="largeScreen"
    :permanent="largeScreen"
  >

    <v-list :class="{ 'pt-0': !!user }">
      <transition name="account">
        <AppDrawerAccount v-if="user" />
      </transition>

      <v-divider v-if="user" />

      <template
        v-for="item of drawerItems"
        v-if="item.condition()"
      >
        <AppDrawerItemEntry
          v-if="item.type === AppDrawerItemType.Entry"
          :key="item.id"
          :entry="item"
        />
        <AppDrawerItemSection
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

import AppDrawerItemEntry, { IAppDrawerItemEntry } from '@/components/AppDrawerItemEntry.vue';
import AppDrawerItemSection, { IAppDrawerItemSection } from '@/components/AppDrawerItemSection.vue';
import AppDrawerAccount from '@/components/AppDrawerAccount.vue';
import { AppDrawerItemType } from '@/models/AppDrawerBaseItem';
import * as AuthStore from '@/store/modules/auth';
import { AuthUser } from '@/store/modules/auth.state';

type AppDrawerItem = IAppDrawerItemEntry | IAppDrawerItemSection;

export default Vue.extend({
  components: { AppDrawerAccount, AppDrawerItemEntry, AppDrawerItemSection },

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

    user(): AuthUser | null {
      return AuthStore.getters.user(this.$store);
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
          id: 'exchanges',
          label: 'Exchanges',
          condition: () => !!this.user,
          items: [
            {
              type: AppDrawerItemType.Entry,
              id: 'exchanges--overview',
              icon: 'view_compact',
              label: 'Overview',
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
      ];
    },

  },

});
</script>


<style lang="scss" scoped>
.account-enter,
.account-leave-to {
  margin-top: -64px !important;
  opacity: 0;
}

.account-enter-to,
.account-leave {
  margin-top: 0 !important;
  opacity: 1;
}

.account-enter-active,
.account-leave-active {
  transition: all 0.15s;
}
</style>

<template functional>
  <v-list-tile
    :to="props.entry.to ? props.entry.to : null"
    :exact="props.entry.exact"
    @click="props.entry.action ? props.entry.action() : null"
  >
    <v-list-tile-action>
      <v-icon>{{ props.entry.icon }}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>{{ props.entry.label }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script lang="ts">
import Vue from 'vue';
import { AppDrawerItemType, AppDrawerBaseItem } from '@/models/AppDrawerBaseItem';
import { RawLocation } from 'vue-router';

export interface IAppDrawerItemEntry extends AppDrawerBaseItem {
  type: AppDrawerItemType.Entry,
  id: string;
  label: string;
  icon?: string;
  to?: RawLocation;
  action?: () => void;
  exact?: boolean;
}

export default Vue.extend({

  props: {
    entry: { type: Object, required: true },
  },

});
</script>

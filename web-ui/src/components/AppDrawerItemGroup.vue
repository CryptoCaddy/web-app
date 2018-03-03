<template functional>
  <div>
    <v-subheader>{{ props.group.label }}</v-subheader>
    <AppDrawerItemEntry
      v-for="item of props.group.items"
      :key="item.id"
      :entry="item"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppDrawerItemEntry, { IAppDrawerItemEntry } from './AppDrawerItemEntry.vue';
import { AppDrawerBaseItem, AppDrawerItemType } from '@/models/AppDrawerBaseItem';

export interface IAppDrawerItemGroup extends AppDrawerBaseItem {
  type: AppDrawerItemType.Group;
  items: IAppDrawerItemEntry[];
}

export default Vue.extend({
  components: { AppDrawerItemEntry },

});
</script>

<template>
  <v-select
    autocomplete
    :label="label"
    :name="name"
    :id="name"
    :value="value"
    @input="updateValue($event)"
    :items="sortedItems"
    item-value="value"
    item-text="label"
    :rules="rules"
    :loading="loading"
    :required="required"
    :disabled="disabled || loading"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import * as R from 'ramda';
import { SelectOption } from '@/models/SelectOption';

import * as Validators from '../util/validators';

export default Vue.extend({
  props: {
    disabled: { type: Boolean, default: false },
    label: { type: String, required: true },
    loading: { type: Boolean, default: false },
    name: { type: String, required: true },
    items: { type: Array, default: () => [] },
    required: { type: Boolean, default: false },
    value: { type: String, default: null },
  },

  computed: {
    sortedItems(): SelectOption[] {
      const sortByLabel = R.sortBy(R.compose(R.toLower, R.prop('label')));
      return sortByLabel(this.items as SelectOption[]);
    },
    rules(): ((v: string) => boolean | string)[] {
      return [
        (v: string) =>
          !this.required ||
        Validators.required(v) ||
        `${this.label} is required.`,
      ];
    },
  },

  methods: {
    updateValue(value: string) {
      this.$emit('input', value);
    },
  },

});
</script>

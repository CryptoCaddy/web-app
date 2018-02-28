<template>
  <v-select
    autocomplete
    :label="label"
    :name="name"
    :id="name"
    :value="value"
    @input="updateValue($event)"
    :items="sortedOptions"
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
import { Logger } from '@/packages/util/logger';
import * as ChoiceStore from '@/store/modules/choice';

import * as Validators from '../util/validators';

export default Vue.extend({
  props: {
    value: { type: String, default: null },
    label: { type: String, required: true },
    name: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },

  computed: {
    options(): SelectOption[] {
      Logger.error('CaddySelect', 'Missing computed `options`.');
      return [];
    },

    loading() {
      Logger.error('[CaddySelect]', 'Missing computed `loading`.');
      return false;
    },

    sortedOptions(): SelectOption[] {
      const sortByLabel = R.sortBy(R.compose(R.toLower, R.prop('label')));
      return sortByLabel(this.options);
    },
  },

  data() {
    return {
      rules: [
        (v: string) =>
          !this.required ||
          Validators.required(v) ||
          `${this.label} is required.`,
      ],
    };
  },

  watch: {
    pending(value) {
      this.$emit('pending', value);
    },
  },

  methods: {
    updateValue(value: string) {
      this.$emit('input', value);
    },
  },

  mounted() {
    ChoiceStore.dispatchers.loadCurrencyOptions(this.$store);
  },
});
</script>

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
    :loading="currencies.pending"
    :required="required"
    :disabled="disabled || currencies.pending"
  ></v-select>
</template>

<script lang="ts">
import Vue from 'vue';
import * as R from 'ramda';
import * as ChoiceStore from '@/store/modules/choice';
import * as Validators from '@/util/validators';
import { SelectOption } from '@/models/SelectOption';
import { Choice } from '@/store/modules/choice.state';

export default Vue.extend({
  props: {
    value: String,
    label: {
      type: String,
      default: 'Currency',
    },
    name: {
      type: String,
      default: 'currency',
    },
    disabled: Boolean,
    required: Boolean,
  },

  computed: {
    currencies(): Choice {
      return ChoiceStore.getters.currency(this.$store);
    },

    sortedOptions(): SelectOption[] {
      if (!this.currencies.options) {
        return [];
      }

      const sortByLabel = R.sortBy(R.compose(R.toLower, R.prop('label')));
      return sortByLabel(this.currencies.options);
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
    'currencies.pending'(value) {
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

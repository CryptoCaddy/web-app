<template>
  <v-text-field
    :autocomplete="autocomplete"
    :disabled="disabled"
    :id="name"
    :label="label"
    :name="name "
    :required="required"
    :rules="allRules"
    :type="type"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import * as Validators from '../util/validators';
import { FormFieldRule } from '../models/form-field-rule';

export default Vue.extend({

  props: {
    autocomplete: { type: String, default: 'off' },
    disabled: { type: Boolean, default: false },
    label: { type: String, required: true },
    name: { type: String, required: true },
    required: { type: Boolean, default: false },
    rules: { type: Array, default: () => [] },
    type: { type: String, default: 'text' },
    value: { type: String, default: null },
  },

  computed: {
    internalRules(): FormFieldRule[] {
      return [
        (v: string) => Validators.required(v) || `${this.label} is required.`,
      ];
    },
    allRules(): FormFieldRule[] {
      return [
        ...this.internalRules as FormFieldRule[],
        ...this.rules as FormFieldRule[],
      ];
    },
  },

  data() {
    return {
    };
  },

});
</script>

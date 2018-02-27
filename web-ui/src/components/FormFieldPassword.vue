<template>
  <v-text-field
    :label="label"
    :name="name"
    :id="name"
    type="password"
    autocomplete="current-password"
    :value="value"
    @input="updateValue($event)"
    :rules="validators"
    :required="required"
    :disabled="disabled"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import * as Validators from '@/util/validators';

export default Vue.extend({
  props: {
    value: { type: String, default: null },
    label: { type: String, default: 'Password' },
    name: { type: String, default: 'password' },
    equals: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },

  data() {
    return {
      validators: [
        (v: string) => Validators.required(v) || `${this.label} is required.`,
        (v: string) =>
          !this.equals ||
          Validators.equals(v, this.equals) ||
          `${this.label} does not match.`,
      ],
    };
  },

  methods: {
    updateValue(value: string) {
      this.$emit('input', value);
    },
  },
});
</script>

<template>
  <v-text-field
    :label="label"
    :name="name || 'email'"
    :id="name || 'email'"
    type="email"
    autocomplete="email"
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
    label: { type: String, default: 'Email' },
    name: { type: String, default: 'email' },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },

  data() {
    return {
      validators: [
        (v: string) => Validators.required(v) || `${this.label} is required.`,
        (v: string) =>
          Validators.email(v) || `${this.label} must be a valid email address.`,
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

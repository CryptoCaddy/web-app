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
  ></v-text-field>
</template>

<script lang="ts">
import Vue from 'vue';
import * as Validators from '@/util/validators';

export default Vue.extend({
  props: {
    value: String,
    label: {
      type: String,
      default: 'Password',
    },
    name: {
      type: String,
      default: 'password',
    },
    equals: String,
    disabled: Boolean,
    required: Boolean,
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

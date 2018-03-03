<template>
  <CaddyInput
    :autocomplete="autocomplete"
    :label="label"
    :name="name"
    :rules="rules"
    type="email"
    :value="value"
    :disabled="disabled"
    @input="$emit('input', $event)"
  />
</template>


<script lang="ts">
import { CaddyInput, Validators } from 'cryptocaddy/forms';
import Vue from 'vue';

export default Vue.extend({
  components: { CaddyInput },

  props: {
    autocomplete: { type: String, default: 'email' },
    disabled: { type: Boolean, default: false },
    label: { type: String, default: 'Email' },
    name: { type: String, default: 'email' },
    value: { type: String, default: '' },
  },

  data() {
    return {
      rules: [
        (v: string) =>
          Validators.email(v) || `${this.label} must be a valid email address.`,
      ],
    };
  },
});
</script>

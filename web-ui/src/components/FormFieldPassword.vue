<template>
  <CaddyInput
    :autocomplete="autocomplete"
    :label="label"
    :name="name"
    :rules="rules"
    type="password"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>


<script lang="ts">
import Vue from 'vue';
import { CaddyInput, Validators } from '@/packages/forms';

export default Vue.extend({
  components: { CaddyInput },

  props: {
    autocomplete: { type: String, default: 'current-password' },
    equals: { type: String, default: null },
    label: { type: String, default: 'Password' },
    name: { type: String, default: 'password' },
    value: { type: String, default: '' },
  },

  data() {
    return {
      type: 'password',
      rules: [
        (v: string) => Validators.equals(v, this.equals) || `${this.label} does not match.`,
      ],
    };
  },
});
</script>

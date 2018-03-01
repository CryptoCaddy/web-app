<template>
  <CaddyInput
    :autocomplete="autocomplete"
    :label="label"
    :name="name"
    :rules="rules"
    type="email"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>


<script lang="ts">
import { CaddyInput } from '@/packages/forms';
import * as Validators from '@/packages/forms/util/validators';
import Vue from 'vue';

export default Vue.extend({
  components: { CaddyInput },

  props: {
    autocomplete: { type: String, default: 'email' },
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

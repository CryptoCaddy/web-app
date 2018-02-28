<template>
  <v-text-field
    :autocomplete="autocomplete"
    :disabled="disabled"
    :id="name"
    :label="label"
    :name="name "
    :required="required"
    :rules="_rules"
    :type="type"
    :value="value"
    @input="updateValue($event)"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import * as Validators from '../util/validators';

export default Vue.extend({

  props: {
    disabled: { type: Boolean, default: false },
    label: { type: String, required: true },
    name: { type: String, required: true },
    required: { type: Boolean, default: false },
    value: { type: String, default: null },
  },

  computed: {
    _rules(): ((v: string) => true | string)[] {
      return [
        ...this.globalRules,
        ...this.rules,
      ];
    },
  },

  data() {
    return {
      autocomplete: null,
      type: 'text',
      globalRules: [
        (v: string) => Validators.required(v) || `${this.label} is required.`,
      ] as ((v: string) => true|string)[],
      rules: [],
    };
  },

  methods: {
    updateValue(value: string) {
      this.$emit('input', value);
    },
  },

});
</script>

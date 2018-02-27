<template>
  <v-select
    autocomplete
    :label="label"
    :name="name"
    :id="name"
    :value="value"
    @input="updateModel($event)"
    :items="sortedOptions"
    item-value="value"
    item-text="label"
    :rules="rules"
    :loading="timezones.pending"
    :required="required"
    :disabled="disabled || timezones.pending"
  />
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
    value: { type: String, default: null },
    label: { type: String, default: 'Timezone' },
    name: { type: String, default: 'timezone' },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },

  computed: {
    timezones(): Choice {
      return ChoiceStore.getters.timezone(this.$store);
    },
    sortedOptions(): SelectOption[] {
      if (!this.timezones.options) {
        return [];
      }

      const sortByLabel = R.sortBy(R.compose(R.toLower, R.prop('label')));
      return sortByLabel(this.timezones.options);
    },
  },

  watch: {
    'timezones.pending': function (value) {
      this.$emit('pending', value);
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

  methods: {
    updateModel(value: string) {
      this.$emit('input', value);
    },
  },

  mounted() {
    ChoiceStore.dispatchers.loadTimezoneOptions(this.$store);
  },
});
</script>

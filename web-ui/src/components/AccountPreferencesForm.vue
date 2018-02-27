<template>
  <v-form
    v-model="form.valid"
    ref="form"
    lazy-validation
    @submit.prevent="submit()">
    <v-layout row>

      <v-flex xs12>
        <FormFieldCurrency
          v-model="form.value.currency"
          required />
        <FormFieldTimezone
          v-model="form.value.timezone"
          required />
      </v-flex>

    </v-layout>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import FormFieldCurrency from '@/components/FormFieldCurrency.vue';
import FormFieldTimezone from '@/components/FormFieldTimezone.vue';
import * as AccountStore from '@/store/modules/account';
import { AccountPreferences } from '@/store/modules/account.state';

export default Vue.extend({
  components: { FormFieldCurrency, FormFieldTimezone },

  props: {
    prepopulate: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    preferences(): AccountPreferences {
      return AccountStore.getters.preferences(this.$store);
    },
    saving(): boolean {
      return AccountStore.getters.saving(this.$store);
    },
  },

  data() {
    return {
      form: {
        valid: false,
        value: {
          currency: '',
          timezone: '',
        },
      },
    };
  },

  watch: {
    preferences(preferences: AccountPreferences) {
      this.setForValue(preferences);
    },
  },

  methods: {
    setForValue(preferences: AccountPreferences) {
      this.form.value = {
        ...this.form.value,
        ...preferences,
      };
    },

    submit() {
      // @TODO typing not yet supported
      if (!(this.$refs.form as any).validate() || this.saving) {
        return;
      }

      AccountStore.dispatchers.updatePreferences(this.$store, this.form.value);
    },
  },

  mounted() {
    if (this.prepopulate) {
      AccountStore.dispatchers.loadPreferences(this.$store);
    }
  },
});
</script>

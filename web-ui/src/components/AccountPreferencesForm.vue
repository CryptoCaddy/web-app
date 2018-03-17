<template>
  <v-form
    v-model="form.valid"
    ref="form"
    lazy-validation
    @submit.prevent="submit()">
    <v-layout row>

      <v-flex xs12>
        <CaddySelect
          v-model="form.value.currency"
          name="currency"
          label="Currency"
          :items="currencyOptions"
          :loading="currencyLoading"
          required
        />
        <CaddySelect
          v-model="form.value.timezone"
          name="timezone"
          label="Timezone"
          :items="timezoneOptions"
          :loading="timezoneLoading"
          required
        />
      </v-flex>

    </v-layout>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { CaddySelect } from 'cryptocaddy/forms';
import { SelectOption } from '@/models/SelectOption';
import * as AccountStore from '@/store/modules/account';
import * as ChoiceStore from '@/store/modules/choice';
import { AccountPreferences } from '@/store/modules/account.state';

export default Vue.extend({
  components: { CaddySelect },

  props: {
    prepopulate: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    currencyOptions(): SelectOption[] {
      return ChoiceStore.getters.currency(this.$store).options;
    },

    currencyLoading(): boolean {
      return ChoiceStore.getters.currency(this.$store).pending;
    },

    timezoneOptions(): SelectOption[] {
      return ChoiceStore.getters.timezone(this.$store).options;
    },

    timezoneLoading(): boolean {
      return ChoiceStore.getters.timezone(this.$store).pending;
    },

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
    ChoiceStore.dispatchers.loadCurrencyOptions(this.$store);
    ChoiceStore.dispatchers.loadTimezoneOptions(this.$store);

    if (this.prepopulate) {
      AccountStore.dispatchers.loadPreferences(this.$store);
    }
  },
});
</script>

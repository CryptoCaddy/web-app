<template>
  <v-container fill-height :class="containerClasses">
    <v-layout row justify-center align-center>
      <v-flex xs12 sm8 md6>

        <v-stepper vertical
          v-model="currentStep"
          :class="stepperClasses"
        >

          <v-stepper-step step="1" :complete="currentStep > 1">
            Credentials
            <small>Set email and password</small>
          </v-stepper-step>
          <v-stepper-content step="1">
            <SignUpForm ref="signUpForm" />
            <v-layout row justify-end pt-2>
              <v-btn
                color="primary"
                :loading="authPending"
                @click.native="$refs.signUpForm.submit"
              >Proceed</v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-step step="2" :complete="currentStep > 2">
            Preferences
            <small>Configure essential preferences</small>
          </v-stepper-step>
          <v-stepper-content step="2">
            <AccountPreferencesForm ref="preferencesForm" :prepopulate="false" />
            <v-layout row justify-end pt-2>
              <v-btn color="primary"
                :loading="preferencesSaving"
                @click.native="$refs.preferencesForm.submit"
              >Proceed</v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-step step="3" :complete="currentStep > 3">
            Done
            <small>You're ready to go!</small>
          </v-stepper-step>
          <v-stepper-content step="3">
            <div>Thank you for choosing Crypto Caddy!</div>
            <v-layout row justify-end pt-4>
              <v-btn color="primary" to="/">Proceed</v-btn>
            </v-layout>
          </v-stepper-content>

        </v-stepper>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import SignUpForm from '@/components/SignUpForm.vue';
import AccountPreferencesForm from '@/components/AccountPreferencesForm.vue';
import * as AuthStore from '@/store/modules/auth';
import { AuthUser } from '@/store/modules/auth.state';
import * as AccountStore from '@/store/modules/account';
import { AccountPreferences } from '@/store/modules/account.state';

export default Vue.extend({
  components: { AccountPreferencesForm, SignUpForm },

  computed: {
    isPhone(): boolean {
      return this.$vuetify.breakpoint.xsOnly;
    },

    containerClasses(): { [key: string]: boolean } {
      return { white: this.isPhone };
    },

    stepperClasses(): { [key: string]: boolean } {
      return {
        'pa-4': !this.isPhone,
        flat: this.isPhone,
      };
    },

    authPending(): boolean {
      return AuthStore.getters.pending(this.$store);
    },

    user(): AuthUser | null {
      return AuthStore.getters.user(this.$store);
    },

    preferencesSaving(): boolean {
      return AccountStore.getters.saving(this.$store);
    },

    preferences(): AccountPreferences {
      return AccountStore.getters.preferences(this.$store);
    },
  },

  data() {
    return {
      currentStep: 1,
    };
  },

  watch: {
    user(user: AuthUser) {
      if (!user) {
        return;
      }

      this.currentStep = 2;
    },

    preferences(preferences: AccountPreferences) {
      if (!preferences || !preferences.currency || !preferences.timezone) {
        return;
      }

      this.currentStep = 3;
    },
  },

  destroyed() {
    AuthStore.dispatchers.clear(this.$store);
  },
});
</script>

<style lang="scss" scoped>
.stepper.flat {
  box-shadow: none !important;
}
</style>

<template>
  <v-container :class="containerClasses" grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2 md6 offset-md3>

        <v-card
          v-if="!isAnonymous"
          :class="cardClasses"
          :flat="isPhone"
        >
          <v-card-title>
            <h2 class="caption mb-0">Account Data</h2>
          </v-card-title>
          <v-card-text>
            <AccountDataForm ref="accountDataForm" />
          </v-card-text>

          <v-card-actions>
            <v-spacer/>
            <v-btn
              flat
              disabled
              color="primary"
              class="ma-0">TBI</v-btn>
          </v-card-actions>
        </v-card>

        <v-card
          v-else
          :class="cardClasses"
          :flat="isPhone"
        >
          <v-card-title primary-title>
            <h2 class="title mb-0">Link Account</h2>
          </v-card-title>
          <v-card-text class="grey--text text--darken-2">
            <span>You've not signed up yet for a Crypto Caddy account yet.</span>
            <span>All your changes will be lost once you log out.</span>
            <br>
            <span>Create your Crypto Caddy account now!</span>

            <SingUpForm
              ref="signUpForm"
              link-account
              class="mt-4" />
          </v-card-text>

          <v-card-actions>
            <v-spacer/>
            <v-btn
              flat
              color="primary"
              @click.native="$refs.signUpForm.submit()"
              :loading="authPending"
            >Sign Up</v-btn>
          </v-card-actions>
        </v-card>

        <v-divider/>
      </v-flex>


      <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
        <v-card
          :class="cardClasses"
          :flat="isPhone"
        >
          <v-card-title primary-title>
            <h2 class="title mb-0">Preferences</h2>
          </v-card-title>
          <v-card-text>
            <AccountPreferencesForm ref="accountPreferencesForm" />
          </v-card-text>

          <v-card-actions>
            <v-spacer/>
            <v-btn
              flat
              disabled
              color="primary"
              class="ma-0">TBI</v-btn>
          </v-card-actions>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import AccountDataForm from '@/components/AccountDataForm.vue';
import AccountPreferencesForm from '@/components/AccountPreferencesForm.vue';
import SingUpForm from '@/components/SignUpForm.vue';
import * as AuthStore from '@/store/modules/auth';
import { AuthUser } from '@/store/modules/auth.state';

export default Vue.extend({
  components: { AccountDataForm, AccountPreferencesForm, SingUpForm },

  computed: {
    isPhone(): boolean {
      return this.$vuetify.breakpoint.xsOnly;
    },

    containerClasses(): { [key: string]: boolean } {
      return { white: this.isPhone, 'pa-0': this.isPhone };
    },

    cardClasses(): { [key: string]: boolean } {
      return {
        white: this.isPhone,
        'pa-3': this.isPhone,
      };
    },

    authPending(): boolean {
      return AuthStore.getters.pending(this.$store);
    },

    user(): AuthUser | null {
      return AuthStore.getters.user(this.$store);
    },

    isAnonymous(): boolean | null {
      return this.user && this.user.isAnonymous;
    },
  },
});
</script>

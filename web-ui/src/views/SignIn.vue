<template>
  <v-container
    fill-height
    :class="containerClasses">
    <v-layout
      row
      justify-center
      align-center>
      <v-flex
        xs12
        sm8
        md6>

        <v-card
          :class="cardClasses"
          :flat="isPhone">
          <v-card-media
            src="/img/crypto-caddy-logo.png"
            height="200px"
            alt="Crypto Caddy Logo"
          />

          <v-card-text>
            <SignInForm ref="form" />
          </v-card-text>

          <v-card-actions>
            <v-layout>
              <v-menu
                open-on-hover
                offset-y
                transition="slide-y-transition">
                <v-btn
                  color="primary"
                  flat
                  slot="activator">More Options</v-btn>
                <v-list>
                  <v-list-tile to="/sign-up">
                    <v-list-tile-title>Sign Up</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="anonymousDialog = true">
                    <v-list-tile-title>Try it out</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>

              <v-spacer/>

              <v-btn
                color="primary"
                :loading="pending"
                @click="submitForm"
              >Sign in</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>

    </v-layout>

    <v-dialog
      v-model="anonymousDialog"
      max-width="290">
      <v-card>

        <v-card-title class="headline">Create temporary account?</v-card-title>

        <v-card-text class="grey--text text--darken-2">
          <p>Using a temporary account, your data will be lost once you log out.</p>
          <p>
            If you want to keep your data, you can still sign up
            for an account in the user preferences.
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn
            flat
            color="primary"
            :disabled="pending"
            @click.native="anonymousDialog = false"
          >Cancel</v-btn>
          <v-btn
            flat
            color="primary"
            :loading="pending"
            @click.native="signInAnonymously"
          >Proceed</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import SignInForm from '@/components/SignInForm.vue';
import * as AuthStore from '@/store/modules/auth';
import { AuthUser } from '@/store/modules/auth.state';

export default Vue.extend({
  components: { SignInForm },

  computed: {
    isPhone(): boolean {
      return this.$vuetify.breakpoint.xsOnly;
    },

    containerClasses(): { [key: string]: boolean } {
      return { white: this.isPhone };
    },

    cardClasses(): { [key: string]: boolean } {
      return { 'pa-4': !this.isPhone };
    },

    pending(): boolean {
      return AuthStore.getters.pending(this.$store);
    },

    user(): AuthUser | null {
      return AuthStore.getters.user(this.$store);
    },
  },

  data() {
    return {
      anonymousDialog: false,
      formLoading: false,
    };
  },

  watch: {
    user(user: AuthUser) {
      if (!user) {
        return;
      }

      this.anonymousDialog = false;
      this.$router.push('/');
    },
  },

  methods: {
    submitForm() {
      // @TODO typing currently not supported
      (this.$refs.form as any).submit();
    },

    signInAnonymously() {
      AuthStore.dispatchers.signInAnonymously(this.$store);
    },
  },

  destroyed() {
    AuthStore.dispatchers.clear(this.$store);
  },
});
</script>

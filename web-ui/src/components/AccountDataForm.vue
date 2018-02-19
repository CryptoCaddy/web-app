<template>
  <v-form v-model="form.valid">
    <v-layout row>
      <v-flex xs12>
        <FormFieldEmail v-model="form.value.email" disabled />
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import FormFieldEmail from '@/components/FormFieldEmail.vue';
import * as AuthStore from '@/store/modules/auth';
import { AuthUser } from '@/store/modules/auth.state';

export default Vue.extend({
  components: { FormFieldEmail },

  computed: {
    user(): AuthUser | null {
      return AuthStore.getters.user(this.$store);
    },
  },

  data() {
    return {
      form: {
        valid: false,
        value: {
          email: '',
        },
      },
      emailRules: [
        (v: string) => !!v || 'Email is required',
        (v: string) =>
          /^\w+([.-\\+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'Email must be valid',
      ],
    };
  },

  methods: {
    setUserData(user: AuthUser) {
      this.form.value.email = (user && user.email) || '';
    },
  },

  watch: {
    user(user: AuthUser) {
      this.setUserData(user);
    },
  },

  mounted() {
    if (this.user) {
      this.setUserData(this.user);
    }
  },
});
</script>

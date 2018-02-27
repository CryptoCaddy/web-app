<template>
  <v-form
    v-model="form.valid"
    ref="form"
    lazy-validation
    @submit.prevent="submit()">
    <v-layout row>
      <v-flex xs12>
        <FormFieldEmail
          v-model="form.value.email"
          required
        />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <FormFieldPassword
          v-model="form.value.password"
          required
        />
      </v-flex>
    </v-layout>

    <!-- Hidden button allows submitting by pressing enter -->
    <button
      type="submit"
      hidden/>

    <div
      class="py-2 error--text"
      v-if="authError">{{ authError }}</div>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import FormFieldEmail from '@/components/FormFieldEmail.vue';
import FormFieldPassword from '@/components/FormFieldPassword.vue';
import * as AuthStore from '@/store/modules/auth';

export default Vue.extend({
  components: { FormFieldEmail, FormFieldPassword },

  computed: {
    authPending(): boolean {
      return AuthStore.getters.pending(this.$store);
    },

    authError(): string | null {
      return AuthStore.getters.error(this.$store);
    },
  },

  data() {
    return {
      form: {
        valid: false,
        value: {
          email: '',
          password: '',
        },
      },
      passwordRules: [(v: string) => !!v || 'Password is required'],
    };
  },

  methods: {
    submit() {
      // @TODO typing not yet supported
      if (!(this.$refs.form as any).validate() || this.authPending) {
        return;
      }

      AuthStore.dispatchers.signInWithEmailAndPassword(
        this.$store,
        this.form.value,
      );
    },
  },
});
</script>

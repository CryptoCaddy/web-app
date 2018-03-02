<template>
  <v-form
    ref="form"
    @submit.prevent="submit"
  >
    <v-layout>
      <v-flex xs12>
        <CaddySelect
          v-model="form.value.exchangeName"
          name="exchange"
          label="Exchange"
          :items="exchangeOptions"
        />
        <CaddyInput
          v-for="parameter of parameterFields"
          v-model="form.value.parameters[parameter.key]"
          :key="parameter.key"
          :name="parameter.key"
          :label="parameter.key"
        />
      </v-flex>
    </v-layout>

    <!-- Hidden button allows submitting by pressing enter -->
    <button
      type="submit"
      hidden
    />

    <div
      class="py-2 error--text"
      v-if="requestState.error"
    >{{ requestState.error }}</div>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import * as ExchangesStore from '@/store/modules/exchanges';
import { CaddyInput, CaddySelect } from 'cryptocaddy/forms';
import { RequestState } from 'cryptocaddy/util';
import { SelectOption } from '@/models/SelectOption';
import { clone } from '@/util/object';
import { SupportedExchange, ExchangeAddRequest } from '@/api/exchanges.models';

interface ParamterFormField {
  key: string;
  type: string;
}

export default Vue.extend({
  components: { CaddyInput, CaddySelect },

  computed: {

    /** Array of supported exchanges from the store. */
    supportedExchanges(): SupportedExchange[] {
      return ExchangesStore.getters.supported(this.$store).data || [];
    },

    /** Supported exchanges as SelectOptions. */
    exchangeOptions(): SelectOption[] {
      return this.supportedExchanges
        .map((exchange) => ({ label: exchange.key, value: exchange.key }));
    },

    /** The selected exchange. */
    selectedExchange(): SupportedExchange | undefined {
      return (this.supportedExchanges || [])
        .find((e) => e.key === this.form.value.exchangeName);
    },

    /** Parameter fields for the selected exchange. */
    parameterFields(): ParamterFormField[] {
      if (!this.selectedExchange) {
        return [];
      }
      return this.selectedExchange.parameterList
        .map((p) => ({ key: p.parameter, type: p.type }));
    },

    requestState(): RequestState {
      return ExchangesStore.getters.addExchange(this.$store);
    },
  },

  data() {
    return {
      form: {
        valid: false,
        value: {
          exchangeName: '',
          parameters: { },
        },
      },
    };
  },

  methods: {
    submit() {
      // @TODO typing not yet supported
      // @TODO PENDING STATE
      if (!(this.$refs.form as any).validate()) {
        return;
      }

      /**
        * Drop parameters that do not exist on the current exchange.
        * For convenience, all input values are preserved.
        */
      const formValue = clone(this.form.value);
      const currentParameterNames = this.parameterFields.map((p) => p.key);
      Object.keys(formValue.parameters).forEach((key: string) => {
        if (!currentParameterNames.includes(key)) {
          this.$delete(formValue.parameters, key);
        }
      });

      ExchangesStore.dispatchers.addExchange(this.$store, formValue as ExchangeAddRequest)
        .then((res: any | null) => {
          if (res) {
            this.$emit('success');
          }
        });
    },
  },

  mounted() {
    ExchangesStore.dispatchers.loadSupported(this.$store);
  },

});
</script>

<template>
  <v-dialog
    :value="value" @input="$emit('input', $event)"
    max-width="375"
  >
    <v-card>
      <v-card-title class="title">Remove Exchange?</v-card-title>

      <v-card-text class="grey--text text--darken-2">
        <p>
          Removing the exchange will also remove its balances and transactions
          from reports and statistics.
        </p>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn
          flat color="primary"
          @click.native="$emit('input', false)"
        >Keep</v-btn>
        <v-btn
          flat color="primary"
          @click.native="removeExchange"
        >Remove</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import * as ExchangesStore from '@/store/modules/exchanges';

export default Vue.extend({

  props: {
    value: { type: Boolean, required: true },
    // @TODO improve typing
    id: { type: Number, required: true },
  },

  methods: {
    removeExchange() {
      ExchangesStore.dispatchers.removeExchange(this.$store, this.id);
      this.$emit('input', false);
      // .then(() => );
    },
  },

});
</script>

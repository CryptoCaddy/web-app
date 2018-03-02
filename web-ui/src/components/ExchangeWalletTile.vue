<template>
  <v-card>
    <v-card-media
      :src="wallet.meta.bannerSm"
      class="white--text"
      height="150px"
    >
      <v-container
        fill-height fluid
        class="card-media-content"
      >
        <v-layout col fill-height>
          <v-flex>
            <div class="headline">{{ wallet.exchangeName }}</div>
            <div>{{ wallet.exchangeCoins.length }} Coins</div>
            <div>{{ wallet.txHistory.length }} Transactions</div>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card-media>
    <v-card-actions>
      <v-btn flat @click="removalDialogVisible = true">Remove</v-btn>
    </v-card-actions>
    <ExchangeWalletRemoveDialog
      v-model="removalDialogVisible"
      :id="wallet.exchangeEntryId"
    />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import ExchangeWalletRemoveDialog from './ExchangeWalletRemoveDialog.vue';

export default Vue.extend({
  components: { ExchangeWalletRemoveDialog },

  props: {
    wallet: { type: Object, required: true },
  },

  data() {
    return {
      removalDialogVisible: false,
    };
  },

});
</script>

<style>
.card-media-content {
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.5), transparent);
}
</style>

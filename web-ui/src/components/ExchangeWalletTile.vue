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
      <v-btn flat>Delete</v-btn>
    </v-card-actions>
  </v-card>
<!-- <v-card>
    <v-card-media
      :src="wallet.meta.bannerSm"
      class="white--text"
      height="150px"
    >
      <v-container
        fill-height fluid
        class="card-media-content"
      >
        <v-layout fill-height>
          <v-flex/>
        </v-layout>
      </v-container>
    </v-card-media>
    <v-card-title>
      <div>
        <span class="grey--text">{{ wallet.exchangeName }}</span><br>
        <v-spacer/>
        <span>{{ wallet.exchangeCoins.length }} Coins</span><br>
        <span>{{ wallet.txHistory.length }} Transactions</span>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="accent">Edit</v-btn>
      <v-btn flat color="accent">Delte</v-btn>
    </v-card-actions>
  </v-card> -->
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

  props: {
    wallet: { type: Object, required: true },
  },

});
</script>

<style>
.card-media-content {
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.5), transparent);
}
</style>

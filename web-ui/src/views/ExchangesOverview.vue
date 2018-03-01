<template>
  <v-container fluid grid-list-md>
    <transition name="fade" mode="out-in">
      <v-container v-if="walletsLoading" key="loading" fill-height fluid>
        <v-layout fill-height align-center justify-center>
          <v-flex class="loading-wrapper">
            <span>Loading Exchanges</span>
            <v-progress-linear
              indeterminate
              height="2"
              color="accent"
            />
          </v-flex>
        </v-layout>
      </v-container>

      <transition-group
        v-else
        key="content"
        name="fade-slide"
        tag="v-layout"
        class="row wrap"
      >
        <v-flex
          v-for="wallet in wallets"
          :key="wallet.exchangeName"
          xs12 sm6 md4 lg3
        >
          <ExchangeWalletTile
            :key="wallet.exchangeName"
            :wallet="wallet"
          />
        </v-flex>
      </transition-group>
    </transition>

    <v-fab-transition>
      <v-btn
        fab
        fixed bottom right
        color="accent"
        @click.native.stop="showAddExchangeDialog"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-dialog
      v-model="addExchangeDialogVisible"
      lazy
      persistent
      :fullscreen="isPhone"
      :transition="dialogTransition"
      max-width="600px"
    >
      <v-card>
        <v-card-text>
          <v-card-title>
            <h2 class="title mb-0">Add Exchange</h2>
          </v-card-title>
          <v-card-text>
            <ExchangeConfigForm
              ref="exchangeConfig"
              @success="exchangeAdded"
            />
          </v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            flat
            color="primary"
            :disabled="addState.pending"
            @click.native="addExchangeDialogVisible = false"
          >Cancel</v-btn>
          <v-btn
            flat
            color="primary"
            :loading="addState.pending"
            @click.native="addExchange"
          >Proceed</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import * as ExchangesStore from '@/store/modules/exchanges';
import ExchangeConfigForm from '@/components/ExchangeConfigForm.vue';
import ExchangeWalletTile from '@/components/ExchangeWalletTile.vue';
import { RequestState } from '@/packages/util/models/request-state';
import { ExchangeWallet } from '@/api/exchanges.models';

export default Vue.extend({
  components: { ExchangeConfigForm, ExchangeWalletTile },

  computed: {
    isPhone(): boolean {
      return this.$vuetify.breakpoint.xsOnly;
    },

    addState(): RequestState {
      return ExchangesStore.getters.addExchange(this.$store);
    },

    wallets(): ExchangeWallet[] {
      return ExchangesStore.getters.wallets(this.$store).data;
    },

    walletsLoading(): boolean {
      return !this.initialized || ExchangesStore.getters.wallets(this.$store).pending;
    },

    dialogTransition(): string {
      return this.isPhone ? 'dialog-bottom-transition' : 'dialog-transition';
    },
  },

  data() {
    return {
      initialized: false,
      addExchangeDialogVisible: false,
    };
  },

  methods: {
    showAddExchangeDialog() {
      this.addExchangeDialogVisible = true;
    },

    addExchange() {
      // typing for $refs not supported
      (this.$refs.exchangeConfig as any).submit();
    },

    exchangeAdded() {
      this.addExchangeDialogVisible = false;
    },
  },

  mounted() {
    ExchangesStore.dispatchers.loadWallets(this.$store)
      .then(() => {
        this.initialized = true;
      });
  },

});
</script>

<style lang="scss" scoped>
.loading-wrapper {
  flex: 0 0 auto;
}

.list {
  overflow: auto;
  background: transparent;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
}

.fade-slide-enter {
  transform: translateY(50px)
}

.fade-slide-leave {
  transform: translateY(-50px)
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s;
}
</style>

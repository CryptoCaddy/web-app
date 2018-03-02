<template>
  <v-container fluid grid-list-md>

    <transition name="fade" mode="out-in">
      <cc-page-progress
        v-if="walletStore.pending"
        key="loading"
        message="Loading Exchanges"
      />

      <cc-page-error
        v-else-if="walletStore.error"
        key="loading"
        message="Exchanges could not be loaded."
        :details="walletStore.error"
        @retry="loadWallets"
      />

      <transition-group
        v-else
        key="content"
        :name="tileFadeTransition"
        tag="v-layout"
        class="row wrap"
      >
        <v-flex
          v-for="wallet in walletStore.data"
          :key="wallet.exchangeEntryId"
          xs12 sm6 md4 lg3
        >
          <ExchangeWalletTile :wallet="wallet" />
        </v-flex>
      </transition-group>
    </transition>

    <v-fab-transition>
      <v-btn
        fab fixed bottom right
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
      max-width="375px"
    >
      <v-card>
        <v-card-title class="title">
          Add Exchange
        </v-card-title>
        <v-card-text>
          <ExchangeConfigForm
            ref="exchangeConfig"
            @success="exchangeAdded"
          />
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

    <v-snackbar
      bottom right
      :timeout="5000"
      color="error"
      :multi-line="isPhone"
      v-model="errorSnackbarVisible"
    >
      <span>Exchange could not be removed.</span>
      <v-btn flat @click.native="errorSnackbarVisible = false">Dismiss</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import * as ExchangesStore from '@/store/modules/exchanges';
import ExchangeConfigForm from '@/components/ExchangeConfigForm.vue';
import ExchangeWalletTile from '@/components/ExchangeWalletTile.vue';
import { RequestState } from 'cryptocaddy/util';
import { ExchangeWalletsState } from '@/store/modules/exchanges.state';

export default Vue.extend({
  components: { ExchangeConfigForm, ExchangeWalletTile },

  computed: {
    isPhone(): boolean {
      return this.$vuetify.breakpoint.xsOnly;
    },

    tileFadeTransition(): string {
      return this.isPhone ? 'fade-slide-x' : 'fade-slide-y';
    },

    addState(): RequestState {
      return ExchangesStore.getters.addExchange(this.$store);
    },

    walletStore(): ExchangeWalletsState {
      return ExchangesStore.getters.wallets(this.$store);
    },

    dialogTransition(): string {
      return this.isPhone ? 'dialog-bottom-transition' : 'dialog-transition';
    },

    removeState(): RequestState {
      return ExchangesStore.getters.removeExchange(this.$store);
    },
  },

  data() {
    return {
      addExchangeDialogVisible: false,
      errorSnackbarVisible: false,
    };
  },

  watch: {
    'removeState.error': function (err: Error) {
      if (err) {
        this.errorSnackbarVisible = true;
      }
    },
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

    loadWallets() {
      ExchangesStore.dispatchers.loadWallets(this.$store);
    },
  },

  created() {
    this.loadWallets();
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
  transition: all 0.6s;
}

.fade-slide-x-enter,
.fade-slide-x-leave-to,
.fade-slide-y-enter,
.fade-slide-y-leave-to {
  opacity: 0;
}

.fade-slide-y-enter {
  transform: translateY(20px)
}

.fade-slide-y-leave-to {
  transform: translateY(-20px)
}

.fade-slide-x-enter {
  transform: translateX(20px)
}

.fade-slide-x-leave-to {
  transform: translateX(-20px)
}

.fade-slide-x-enter-active,
.fade-slide-x-leave-active,
.fade-slide-y-enter-active,
.fade-slide-y-leave-active {
  transition: all 0.3s;
}
</style>

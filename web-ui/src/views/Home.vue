<template>
  <v-container pt-0>

    <HomeHero />

    <v-layout column>
      <v-layout justify-center>
        <section class="flex">
          <div class="use-case-wrapper">
            <div
              v-for="(useCase, index) of useCases"
              :key="useCase.id"
              v-scroll-reveal="scrollRevealOptions"
            >
              <v-divider v-if="index !== 0"/>
              <HomeUseCase
                :use-case="useCase"
                :icon-first="index % 2 === 1" />
            </div>
          </div>
        </section>
      </v-layout>

    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import HomeHero from '@/components/HomeHero.vue';
import HomeUseCase from '@/components/HomeUseCase.vue';

export default Vue.extend({
  components: { HomeHero, HomeUseCase },

  data() {
    return {
      scrollRevealOptions: {
        delay: 0,
        duration: 500,
        reset: false,
        mobile: false,
      },
      useCases: [
        {
          id: 0,
          header: 'Portfolio Tracking',
          items: ['Profit Calculation', 'Interactive Charts'],
          icon: 'show_chart',
        },
        {
          id: 1,
          header: 'Tax Calculation',
          items: ['FIFO, LIFO, ...', 'Customizable parameters'],
          icon: 'attach_money',
        },
        {
          id: 2,
          header: 'Imports',
          items: [
            'Automatic and Manual Imports for Exchanges',
            'Synchronization with supported Wallets',
          ],
          icon: 'import_export',
        },
        {
          id: 3,
          header: 'Secure',
          items: ['Encrypted Communication', 'Open Source Codebase'],
          icon: 'lock',
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
$skew: 8deg;

.container {
  position: relative;
}

.use-case-wrapper {
  background: transparend;
  transform: skewY($skew);
  transform-origin: 100%;
}

.use-case {
  min-height: 15rem;
  padding: 2rem 0;
  margin: 0 auto;
}
</style>

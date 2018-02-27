<template>
  <v-layout
    class="hero-wrapper"
    align-center
    justify-center>
    <div class="background"/>

    <v-container
      align-center
      class="content">
      <v-layout
        align-center
        justify-center
        hidden-xs-only
        class="logo">
        <img
          src="/img/crypto-caddy.png"
          alt="Crypto Caddy Logo">
      </v-layout>
      <v-layout
        column
        align-start
        justify-center
        class="header">
        <h1 class="display-3">Crypto Caddy</h1>
        <h2 class="display-1">Monitor your coins. Anywhere. Anytime.</h2>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>


<style lang="scss" scoped>
$height: 60vh;
$skew: 8deg;

.hero-wrapper {
  height: $height;
  // @TODO: Substract header height
  margin-top: calc(-56dp);
}

.background {
  position: absolute;
  width: 100vw;
  height: $height;
  top: 0;
  left: 50%;
  transform: skewY($skew) translateX(-50%);
  // transform-origin: 100%
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  &::before {
    background-image: url('https://images.unsplash.com/photo-1453230806017-56d81464b6c5?ixlib=rb-0.3.5&s=2b549d39595ee4f6a69b81edd8bb738b&auto=format&fit=crop&w=2550&q=80');
    background-size: cover;
    background-repeat: no-repeat;
    transform: skewY(-$skew);
    transform-origin: 100%;
    // height: 120%
  }

  &::after {
    background: rgba(#009688, 0.66);
  }
}

.content {
  position: absolute;
  // subtract header toolbar height
  top: -56px;
  margin: 0 auto;
  height: $height;

  .logo {
    flex: 1;
    width: auto;

    img {
      height: 20vh;
      align-self: center;
    }
  }

  .header {
    flex: 2;
    color: white;
  }
}
</style>

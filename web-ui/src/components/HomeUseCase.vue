<template>
  <v-layout
    class="use-case"
    row>
    <v-layout
      flex
      xs9
      sm6
      column
      justify-center
      align-start
      order-xs2>
      <div class="text-wrapper">
        <h3>{{ useCase.header }}</h3>
        <ul>
          <li
            v-for="item of useCase.items"
            :key="item">{{ item }}</li>
        </ul>
      </div>
    </v-layout>

    <v-layout
      flex
      xs3
      sm6
      column
      justify-center
      align-center
      order-xs1
      :order-sm3="!iconFirst">
      <div
        class="icon-wrapper"
        :class="iconClasses">
        <div class="background primary elevation-2"/>
        <v-icon class="white--text">{{ useCase.icon }}</v-icon>
      </div>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    iconFirst: { type: Boolean, default: false },
    useCase: {
      type: Object,
      required: true,
      props: {
        icon: String,
        items: Array,
        header: String,
      },
    },
  },

  computed: {
    iconClasses(): { [key: string]: boolean } {
      return { small: this.$vuetify.breakpoint.xsOnly };
    },
  },
});
</script>

<style lang="scss" scoped>
$skew: 8deg;

.use-case {
  max-width: 90%;

  ul {
    padding: 1rem 0 1rem 2rem;
  }
}

.text,
.icon {
  transform: skewY($skew * -1);
}

.text-wrapper,
.icon-wrapper {
  transform: skewY($skew * -1);
}

.text-wrapper {
  padding-left: 10vw;
}

.icon-wrapper {
  position: relative;
  width: 4rem;
  height: 4rem;

  .icon {
    font-size: 4rem;
    line-height: 4rem;
  }

  &.small {
    width: 2rem;
    height: 2rem;

    .icon {
      font-size: 2rem;
      line-height: 2rem;
    }
  }

  .background {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    transform: skewY($skew);
    z-index: -1;
  }
}
</style>

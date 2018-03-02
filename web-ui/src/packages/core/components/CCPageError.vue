<template functional>
  <v-container fill-height fluid>
    <v-layout fill-height align-center justify-center>
      <v-flex class="error-wrapper text-xs-center grey--text">
        <div>
          <v-icon
            x-large
            color="grey"
            class="my-2"
          >cloud_off</v-icon>
        </div>

        <div>{{ props.message }}</div>
        <div v-if="props.details">Reason: {{ props.details }}</div>

        <div v-if="listeners['retry']" class="my-2">
          <v-btn
            flat color="accent"
            @click="listeners['retry']"
          >Retry</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    message: { type: String, required: true },
    details: { type: String, default: '' },
  },
});
</script>


<style lang="scss" scoped>
.error-wrapper {
  flex: 0 0 auto;
}
</style>

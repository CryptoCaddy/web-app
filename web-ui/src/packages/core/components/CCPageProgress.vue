<template functional>
  <v-container fill-height fluid>
    <v-layout fill-height align-center justify-center>
      <v-flex class="loading-wrapper">
        <span>{{ props.message }}</span>
        <v-progress-linear
          indeterminate
          height="2"
          color="accent"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="scss" scoped>
.loading-wrapper {
  flex: 0 0 auto;
}
</style>

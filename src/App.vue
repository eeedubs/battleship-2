<template>
  <v-app>
    <!-- Top banner -->
    <v-app-bar app clipped-left>
      <TopBanner />
    </v-app-bar>

    <!-- Main content -->
    <v-main 
      app
      class="pt-auto ps-auto"
    >
      <v-container class="fill-height pa-0" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TopBanner from './components/navigation/top_banner';

export default {
  name: 'App',
  components: {
    TopBanner,
  },
}
</script>

<style lang="scss">
</style>

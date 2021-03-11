<template>
  <v-app>
    <!-- Top banner -->
    <v-app-bar app>
      <Banner />
    </v-app-bar>

    <!-- Sidebar -->
    <!-- <v-navigation-drawer app>
    </v-navigation-drawer> -->

    <!-- Main content -->
    <v-main app>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Banner from './components/navigation/top_banner';

export default {
  name: 'App',
  components: {
    Banner,
  }
}
</script>

<style lang="scss">
</style>

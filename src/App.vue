<template>
  <v-app>
    <!-- Top banner -->
    <v-app-bar app clipped-left>
      <TopBanner />
    </v-app-bar>

    <!-- Sidebar -->
    <div v-if="isSignedIn">
      <v-navigation-drawer
        width="10rem"
        class="pl-2 align-start"
        dark
        app
        clipped
      >
        <SideBar />
      </v-navigation-drawer>
    </div>

    <!-- Main content -->
    <v-main 
      app
      class="pt-auto ps-auto"
    >
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TopBanner from './components/navigation/top_banner';
import SideBar from './components/navigation/side_bar';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    TopBanner,
    SideBar,
  },
  computed: {
    ...mapGetters({
      isSignedIn: 'isSignedIn',
    }),
  }
}
</script>

<style lang="scss">
</style>

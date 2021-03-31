<template>
  <div class="page">
    <!-- Sidebar -->
    <v-navigation-drawer
      width="auto"
      class="pl-2 align-start"
      dark
      app
      clipped
    >
      <SideBar
        @changeView="updateCurrentView($event)"
      />
    </v-navigation-drawer>

    <div v-show="currentView == 'currentGames'">
      <CurrentGames
        :gamesInProgress="gamesInProgress"
        :gameInvitations="gameInvitations"
        :userFriends="userFriends"
      />
    </div>
    <div v-show="currentView == 'gameHistory'">
      <GameHistory 
        :gamesCompleted="gamesCompleted"
        :gameInvitations="gameInvitations"
      />
    </div>
  </div>
</template>

<script>
import { http } from '@/http';
import { mapGetters } from 'vuex';
import _ from 'lodash';
import SideBar from './navigation/side_bar';
import { CurrentGames, GameHistory } from './dashboard/index';

export default {
  name: 'Dashboard',
  props: {},
  components: {
    SideBar,
    CurrentGames,
    GameHistory,
  },
  data() {
    return {
      currentView: 'currentGames',
      gameInvitations: [],
      gamesInProgress: [],
      gamesCompleted: [],
      userFriends: [],
    }
  },
  created() {
    this.getDashboardData();
  },
  methods: {
    async getDashboardData() {
      try {
        const response = await http.get("/dashboard", {
          headers: {
            'Access-Control-Allow-Headers': 'x-access-token',
            'x-access-token': this.token
          }
        });
        this.gameInvitations = response.data.gameInvitations;
        this.gamesInProgress = response.data.games.inProgress;
        this.gamesCompleted = response.data.games.completed;
        this.userFriends = response.data.userFriends;
      } catch (error) {
        console.log('Error: ', error);
      }
    },

    updateCurrentView(view) {
      this.currentView = view;
    },
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      token: 'getToken',
    }),
  }
}
</script>

<style lang="scss" scoped>
</style>

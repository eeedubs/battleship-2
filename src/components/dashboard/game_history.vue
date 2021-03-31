<template>
  <v-container>
    <h2 class="mt-6">Completed Games</h2>
    <v-data-table
      :headers="completedGameHeaders"
      fill-height
    >
      <template v-slot:body class="d-flex">
        <tr 
          v-for="game in gamesCompleted" 
          :key="game.id"
          @click="viewGame(game)"
        >
          <td class="text-left pl-4">{{ game.opponentUserUsername }}</td>
          <td class="text-left pl-4">{{ calendarString(game.gameCreatedAt) }}</td>
          <td class="text-left pl-4">{{ calendarString(game.gameCompletedAt) }}</td>
          <td class="text-left pl-4">{{ getWinnerText(game) }}</td>
          <td class="text-left pl-4">{{ recordString(game) }}</td>
          <td 
            v-if="!invitationWithOpponentAlreadyExists(game.opponentUserUsername)"
            class="d-flex justify-end py-1"
          >
            <v-btn
              color="positive"
              right
              x-small
              class="mr-1"
              @click="createInvitation(game.opponentUserUsername)"
            >Rematch</v-btn>
          </td>
          <td v-else></td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { http } from '@/http';
import { mapGetters } from 'vuex';
import moment from 'moment';
import _ from 'lodash';

export default {
  name: 'Games',
  props: {
    gamesCompleted: { type: Array },
    gameInvitations: { type: Array },
  },
  components: {
  },
  data() {
    return {
      error: null,
    }
  },
  methods: {
    async createInvitation(inviteeUsername) {
      if (!inviteeUsername){
        this.error = "No username was provided."
        return;
      }
      
      await http.post('game_invitations', {
        inviterUserId: this.currentUser.id,
        inviteeUsername: inviteeUsername,
      });
      this.getDashboardData();
    },

    calendarString(date) {
      return !!date
        ? moment(date).calendar()
        : null;
    },

    getWinnerText(game) {
      return game.winnerUserId === this.currentUser.id
        ? "You"
        : game.winnerUsername
    },

    invitationWithOpponentAlreadyExists(inviteeUsername) {
      for (let invitation of this.gameInvitations) {
        if (invitation.opponentUserUsername === inviteeUsername){
          return true;
        }
      }
      return false;
    },

    viewGame(game) {
      this.$router.push({ path: `/games/${game.id}` });
    },

    recordString(game) {
      let winCount = game.winsAgainstOpponent;
      let lossCount = game.lossesAgainstOpponent;
      return `${winCount} ${winCount === 1 ? 'win' : 'wins'} - ${lossCount} ${lossCount === 1 ? 'loss' : 'losses'}`
    },
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      token: 'getToken',
    }),
    completedGameHeaders() {
      return [
        {
          text: 'Opponent',
          align: 'left',
          width: '8rem',
          value: 'completedOpponent',
        },
        {
          text: 'Starting Time',
          align: 'left',
          width: '12rem',
          value: 'completedStartingTime',
        },
        {
          text: 'Completion Time',
          align: 'left',
          width: '12rem',
          value: 'completedCompletionTime',
        },
        {
          text: 'Winner',
          align: 'left',
          width: '8rem',
          value: 'completedWinner',
        },
        {
          text: 'Record Against User',
          align: 'left',
          width: '8rem',
          value: 'recordAgainstUser',
        },
        {
          text: '',
          width: '8rem',
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

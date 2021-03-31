<template>
  <v-container>
    <NewInvitationModal
      :userFriends="userFriends"
      :gameInvitations="gameInvitations"
      :gamesInProgress="gamesInProgress"
    />

    <!-- In Progress Games -->
    <div>
      <h2 class="mt-6">In-progress Games</h2>
      <v-data-table
        :headers="inProgressHeaders"
        fill-height
      >
        <template v-slot:body class="d-flex">
          <tr
            v-for="game in gamesInProgress"
            :key="game.id"
            @click="viewGame(game)"
          >
            <td class="text-left pl-4">{{ game.opponentUserUsername }}</td>
            <td class="text-left pl-4">{{ calendarString(game.gameCreatedAt) }}</td>
            <td class="text-left pl-4">{{ fromNowString(game.lastGuessCreatedAt) }}</td>
            <td class="text-left pl-4">{{ recordString(game) }}</td>
            <td class="text-left pl-4">{{ currentTurnString(game) }}</td>
          </tr>
        </template>
      </v-data-table>
    </div>

    <!-- Game Invitations -->
    <div>
      <h2 class="pb-2 pt-8">Game Invitations</h2>
      <v-data-table 
        :headers="invitationHeaders"
        fill-height
      >
        <template v-slot:body class="d-flex">
          <tr 
            v-for="invitation in gameInvitations"
            :key="invitation.id"
          >
            <td class="text-left pl-4">{{ invitation.opponentUserUsername }}</td>
            <td class="text-left pl-4">{{ calendarString(invitation.createdAt) }}</td>
            <td class="text-left pl-4">{{ recordString(invitation) }}</td>
            <td v-if="invitation.createdBy === currentUser.id" class="d-flex justify-center py-1">
              <v-btn 
                color="positive"
                right
                x-small
                class="mr-1"
                @click="acceptInvitation(invitation)"
              >Accept</v-btn>
              <v-btn 
                color="negative"
                right
                x-small
                class="ml-1"
                @click="declineInvitation(invitation)"
              >Decline</v-btn>
            </td>
            <td v-else class="text-center font-italic">Pending</td>
          </tr>
        </template>
      </v-data-table>
    </div>

    <div>

    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import _ from 'lodash';
import { http } from '@/http';
import NewInvitationModal from './current_games/new_invitation_modal';

export default {
  name: 'CurrentGames',
  props: {
    gamesInProgress: { type: Array },
    gameInvitations: { type: Array },
    userFriends: { type: Array },
  },
  components: {
    NewInvitationModal,
  },
  created() {
    console.log(this.gamesInProgress);
  },
  methods: {
    async acceptInvitation(invitation) {
      const usersPool = [invitation.opponentUserId, this.currentUser.id]
      const startingUserId = _.sample(usersPool);
      try {
        let response = await http.put(`game_invitations/${invitation.id}/accept`, {
          startingUserId: startingUserId,
        })

        this.$router.push({ path: `/games/${response.data.id}` });
      } catch(error) {
        console.log('Error: ', error);
      }
    },

    async declineInvitation(invitation) {
      try {
        await http.put(`game_invitations/${invitation.id}/decline`)
        this.getDashboardData();
      } catch(error) {
        console.log('Error: ', error);
      }
    },

    currentTurnString(game) {
      return game.currentTurnUserId === this.currentUser.id
        ? 'Your turn'
        : `${game.currentTurnUserUsername}'s turn`
    },

    fromNowString(date) {
      return !!date 
        ? moment(date).fromNow() 
        : null;
    },

    invitationWithOpponentAlreadyExists(inviteeUsername) {
      for (let invitation of this.gameInvitations) {
        if (invitation.opponentUserUsername === inviteeUsername){
          return true;
        }
      }
      return false;
    },

    calendarString(date) {
      return !!date
        ? moment(date).format('LLLL')
        : null;
    },

    recordString(invitation) {
      let winCount = invitation.winsAgainstOpponent;
      let lossCount = invitation.lossesAgainstOpponent;
      return `${winCount} ${winCount === 1 ? 'win' : 'wins'} - ${lossCount} ${lossCount === 1 ? 'loss' : 'losses'}`
    },
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      token: 'getToken',
    }),
    inProgressHeaders() {
      return [
        {
          text: 'Opponent',
          align: 'left',
          width: "12rem",
          value: 'inProgressOpponent',
        },
        {
          text: 'Starting Time',
          align: 'left',
          width: "18rem",
          value: 'inProgressStartingTime',
        },
        {
          text: 'Last Move',
          align: 'left',
          width: "10rem",
          value: 'inProgressLastMove',
        },
        {
          text: 'Record',
          align: 'left',
          width: "10rem",
          value: 'inProgressRecord',
        },
        {
          text: 'Turn',
          align: 'left',
          width: "10rem",
          value: 'inProgressTurn',
        },
      ]
    },
    invitationHeaders() {
      return [
        { 
          text: 'Opponent',
          align: 'left',
          width: "12rem",
          value: 'invitationOpponent',
        },
        {
          text: 'Created At',
          align: 'left',
          width: '20rem',
          value: 'invitationCreatedAt',
        },
        {
          text: 'Record',
          align: 'left',
          width: '12rem',
          value: 'invitationRecord',
        },
        {
          text: '',
          align: 'right',
          value: 'invitationButtonCol',
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  main {
    display: flex;
    flex-direction: column;

    table {
      tr {
        height: 2rem;
      }
      tr:hover {
        background-color: lightyellow;
      }
    }
  }
</style>

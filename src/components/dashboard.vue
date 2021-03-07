<template>
  <main>
    <div class="invites-container">
      <div class="invites">
        <h2>Game Invitations</h2>
        <table>
          <thead>
            <tr>
              <th>Inviter</th>
              <th>Invitee</th>
              <th>Created At</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="invitation in gameInvitations" :key="invitation.id">
              <td>{{ invitation.inviter_user_username }}</td>
              <td>{{ invitation.invitee_user_username }}</td>
              <td>{{ dateString(invitation.created_at) }}</td>
              <td>
                <button type="submit" @click="acceptInvitation(invitation)">Accept</button>
              </td>
              <td>
                <button type="submit" @click="declineInvitation(invitation)">Decline</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="games-container">
      <div class="games-in-progress">
        <h2>In-Progress Games</h2>
        <table>
          <thead>
            <tr>
              <th>Opponent</th>
              <th>Start Date</th>
              <th>Turn</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="game in gamesInProgress" :key="game.id" @click="viewGame(game)">
              <td>{{ getOpponent(game) }}</td>
              <td>{{ dateString(game.created_at) }}</td>
              <td>{{ currentTurnString(game) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="games-completed">
        <h2>Completed Games</h2>
        <table>
          <thead>
            <tr>
              <th>Opponent</th>
              <th>Start Date</th>
              <th>Completion Date</th>
              <th>Winner</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="game in gamesCompleted" :key="game.id" @click="viewGame(game)">
              <td>{{ getOpponent(game) }}</td>
              <td>{{ dateString(game.created_at) }}</td>
              <td>{{ dateString(game.completed_at) }}</td>
              <td>{{ game.winner_username }}</td>
              <td>Rematch</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import { http } from '@/http';
import { mapGetters } from 'vuex';
import moment from 'moment';
import _ from 'lodash';

export default {
  name: 'Dashboard',
  props: {},
  components: {
  },
  data() {
    return {
      gameInvitations: null,
      gamesInProgress: null,
      gamesCompleted: null,
      error: null,
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
        this.gameInvitations = response.data.game_invitations;
        this.gamesInProgress = response.data.games.inProgress;
        this.gamesCompleted = response.data.games.completed;
      } catch (error) {
        console.log('Error: ', error);
      }
    },
    currentTurnString(game) {
      return game.current_turn_user_id === this.current_user.id
        ? 'Your turn'
        : `${game.current_turn_user_username}'s turn`
    },
    getOpponent(game) {
      return game.inviter_user_id === this.current_user.id
        ? game.invitee_username
        : game.inviter_username;
    },
    dateString(date) {
      return moment(date).calendar();
    },
    async acceptInvitation(invitation) {
      const users_pool = [invitation.inviter_user_id, invitation.invitee_user_id]
      const starting_user_id = _.sample(users_pool);
      try {
        let response = await http.put(`game_invitations/${invitation.id}/accept`, {
          starting_user_id: starting_user_id,
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
    viewGame(game) {
      this.$router.push({ path: `/games/${game.id}` });
    },
  },
  computed: {
    ...mapGetters({
      current_user: 'current_user',
      token: 'get_token',
    }),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  main {
    display: flex;
    background-color: white;
    min-width: 72rem;
    min-height: 85vh;
    font-size: 0.85rem;

    .invites-container, .games-container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      background-color: white;
      flex: 1;
      padding: 0 1rem;

      .invites, .games-in-progress, .games-completed {
        flex: 1;

        h2 {
          margin: 1rem 0;
        }

        table {
          display: flex;
          flex-direction: column;
          border: 1px solid;
          tr {
            border: 1px solid;
            display: flex;
            flex-direction: row;
            flex: 1;
          }

          th, td {
            display: flex;
            flex-direction: row;
            flex: 1;
            justify-content: space-evenly;
            padding: 0;
          }
        }
      }
    }
  }
</style>

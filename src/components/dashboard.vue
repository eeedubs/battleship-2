<template>
  <div class="page">
    <main>
      <div class="container-left">
        <div class="invites">
          <h2>Game Invitations</h2>
          <table>
            <thead>
              <tr>
                <th>Opponent</th>
                <th>Time of Creation</th>
                <th class="cell-button"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="invitation in gameInvitations" :key="invitation.id">
                <td>{{ invitation.opponent_user_username }}</td>
                <td>{{ calendarString(invitation.created_at) }}</td>
                <td v-if="currentUserIsInviter(invitation.inviter_user_id)" class="cell-button">
                  <button type="submit" @click="acceptInvitation(invitation)" class="positive">Accept</button>
                  <button type="submit" @click="declineInvitation(invitation)" class="negative">Decline</button>
                </td>
                <td v-else class="cell-button">Pending</td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <div class="games-in-progress">
          <h2>In-progress Games</h2>
          <table>
            <thead>
              <tr>
                <th>Opponent</th>
                <th>Starting Time</th>
                <th>Last Move</th>
                <th>Turn</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="game in gamesInProgress" :key="game.id" @click="viewGame(game)">
                <td>{{ game.opponent_user_username }}</td>
                <td>{{ calendarString(game.game_created_at) }}</td>
                <td>{{ fromNowString(game.last_guess_created_at) }}</td>
                <td>{{ currentTurnString(game) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="container-right">
        <div class="games-completed">
          <h2>Completed Games</h2>
          <table>
            <thead>
              <tr>
                <th>Opponent</th>
                <th>Starting Time</th>
                <th>Completion Time</th>
                <th>Winner</th>
                <th class="cell-button"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="game in gamesCompleted" :key="game.id">
                <td @click="viewGame(game)">{{ game.opponent_user_username }}</td>
                <td @click="viewGame(game)">{{ calendarString(game.created_at) }}</td>
                <td @click="viewGame(game)">{{ calendarString(game.game_completed_at) }}</td>
                <td @click="viewGame(game)">{{ getWinnerText(game) }}</td>
                <td v-if="!invitationWithOpponentAlreadyExists(game.opponent_user_username)" class="cell-button">
                  <button type="submit" @click="createInvitation(game.opponent_user_username)" class="positive">Rematch</button>
                </td>
                <td v-else class="cell-button">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
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

    async createInvitation(invitee_username) {
      if (!invitee_username){
        this.error = "No username was provided."
        return;
      }
      
      await http.post('game_invitations', {
        inviter_user_id: this.current_user.id,
        invitee_username: invitee_username,
      });
      this.getDashboardData();
    },

    async acceptInvitation(invitation) {
      const users_pool = [invitation.opponent_user_id, this.current_user.id]
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

    invitationWithOpponentAlreadyExists(invitee_username) {
      for (let invitation of this.gameInvitations) {
        if (invitation.opponent_user_username === invitee_username){
          return true;
        }
      }
      return false;
    },

    currentTurnString(game) {
      return game.current_turn_user_id === this.current_user.id
        ? 'Your turn'
        : `${game.current_turn_user_username}'s turn`
    },

    currentUserIsInviter(inviter_user_id) {
      return inviter_user_id === this.current_user.id;
    },

    calendarString(date) {
      return !!date
        ? moment(date).calendar()
        : null;
    },

    fromNowString(date) {
      return !!date 
        ? moment(date).fromNow() 
        : null;
    },

    getWinnerText(game) {
      return game.winner_user_id === this.current_user.id
        ? "You"
        : game.winner_username
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

<style lang="scss" scoped>
  main {
    display: flex;
    flex-direction: row;

    .container-left, .container-right {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      background-color: white;
      flex: 1;
      padding: 0 1rem;

      .invites, .games-in-progress, .games-completed {
        h2 {
          margin: 1rem 0;
        }

        table {
          display: flex;
          flex-direction: column;
          tr {
            display: flex;
            flex-direction: row;
            border: 1px solid;

            th, td {
              display: flex;
              flex-direction: row;
              justify-content: space-evenly;
              align-items: center;
              padding: 0;
              flex: 1;
              min-height: 2rem;
              white-space: nowrap;

              &.game-link {
                cursor: pointer;
              }

              &.cell-button {
                font-style: italic;
                flex: 0.7;

                &.accept {
                  background-color: red;
                }

                &.decline {
                  background-color: green;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

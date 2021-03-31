<template>
    <v-dialog
      v-model="dialogModal"
      color="primary"
      transition="dialog-top-transition"
      width="50%"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="mt-6 mr-6"
          color="success"
          absolute
          right
          v-on="on"
        >
          New Game
        </v-btn>
      </template>
      <v-toolbar dense>
        <v-spacer></v-spacer>
        <v-toolbar-title class="white ma-0 pt-6 pb-4">Create New Game</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon>
          <v-icon @click="dialogModal = false">mdi-close</v-icon>  
        </v-toolbar-side-icon>
      </v-toolbar>
        <!-- form for invite by email -->
      <v-card elevation="0">
        <v-row class="white align-center pt-4 px-10 my-0">
          <v-autocomplete
            v-model="emailModel"
            :items="emailItems"
            :loading="emailLoading"
            :search-input.sync="emailSearch"
            hide-no-data
            item-value="id"
            item-text="email"
            label="Invite by email"
            placeholder="Start typing to search"
            background-color="white"
            clearable
            class="pr-5"
            return-object
            :error-messages="emailErrors"
          >
            <template v-slot:item="{ item }">
              <span>{{ item.firstName }} {{ item.lastName }} (<strong>{{ item.email }}</strong>)</span>
            </template>
          </v-autocomplete>
          <v-btn
            color="success"
            @click="createInvitationEmailSearch(emailModel)"
          >
            Send Invite
          </v-btn>
        </v-row>
      </v-card>

      <!-- form for invite by username -->
      <v-card elevation="0">
        <v-row class="white align-center pt-4 px-10 my-0">
          <v-autocomplete
            v-model="usernameModel"
            :items="usernameItems"
            :loading="usernameLoading"
            :search-input.sync="usernameSearch"
            error-message="usernameErrors"
            hide-no-data
            item-value="id"
            item-text="username"
            label="Invite by username"
            placeholder="Start typing to search"
            background-color="white"
            clearable
            class="pr-5"
            return-object
            :error-messages="usernameErrors"
          >
            <template v-slot:item="{ item }">
              <span>{{ item.firstName }} {{ item.lastName }} (<strong>{{ item.username }}</strong>)</span>
            </template>
          </v-autocomplete>
          <v-btn
            color="success"
            @click="createInvitationUsernameSearch(usernameModel)"
          >
            Send Invite
          </v-btn>
        </v-row>
      </v-card>

      <!-- form for invite from friends list -->
      <v-card elevation="0">
        <v-row class="white align-center pt-4 pb-6 px-10 my-0">
          <v-select
            v-model="friendModel"
            :items="userFriends"
            item-value="id"
            item-text="username"
            label="Invite one of your friends"
            class="pr-5"
            :error-messages="friendErrors"
          >
            <template v-slot:item="{ item }">
              <span>{{ item.firstName }} {{ item.lastName }} (<strong>{{ item.username }}</strong>)</span>
            </template>
          </v-select>
          <v-btn
            color="success"
            @click="createInvitationFriendSearch(friendModel)"
          >Send Invite</v-btn>
        </v-row>
      </v-card>

      <!-- create shareable URL -->
      <!-- <v-card elevation="0">
        <div v-if="shareableLink">
          {{ shareableLink }}
        </div>
        <v-btn
          color="success"
          @click="createShareableLink()"
        >Create Shareable Link</v-btn>
      </v-card> -->
    </v-dialog>
</template>

<script>
import { http } from '@/http';
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  name: 'NewInvitationModal',
  props: {
    userFriends: { type: Array },
    gameInvitations: { type: Array },
    gamesInProgress: { type: Array },
  },
  data() {
    return {
      dialogModal: false,
      emailModel: null,
      emailSearch: null,
      emailItems: [],
      emailLoading: false,
      emailErrors: null,
      usernameModel: null,
      usernameSearch: null,
      usernameItems: [],
      usernameLoading: false,
      usernameErrors: null,
      friendModel: null,
      friendErrors: null,
      basicRules: {
        required: v => !!v || 'Required.',
      },
    }
  },
  methods: {
    async createInvitationEmailSearch(opponentId) {
      if (!opponentId) return;
      const response = await this.createInvitationByUserId(opponentId);
      if (response.error){
        this.emailErrors = response.error;
        return;
      }
      this.dialogModal = false;
      this.$emit('reloadData');
    },

    async createInvitationUsernameSearch(opponentId) {
      if (!opponentId) return;
      const response = await this.createInvitationByUserId(opponentId);
      if (response.error){
        this.usernameErrors = response.error;
        return;
      }
      this.dialogModal = false;
      this.$emit('reloadData');
    },

    async createInvitationFriendSearch(opponentId) {
      if (!opponentId) return;
      const response = await this.createInvitationByUserId(opponentId);
      console.log(response);
      if (response.error){
        this.friendErrors = response.error;
        return;
      }
      this.dialogModal = false;
      this.$emit('reloadData');
    },

    async createInvitationByUserId(opponentId) {
      if (this.pendingGameInvitationExists(opponentId)) {
        return { error: 'A pending invitation with this opponent already exists.' };
      }

      if (this.gameInProgressExists(opponentId)) {
        return { error: 'An in-progress game with this opponent already exists.' };
      }

      return await http.post('game_invitations', {
        inviterUserId: this.currentUser.id,
        inviteeUserId: opponentId,
      });
    },

    // async createShareableLink() {
    // },

    pendingGameInvitationExists(opponentId) {
      const idMatch = (invitation) => invitation.opponentUserId == opponentId;
      return this.gameInvitations.some(idMatch);
    },

    gameInProgressExists(opponentId) {
      const idMatch = (invitation) => invitation.opponentUserId == opponentId;
      return this.gamesInProgress.some(idMatch);
    },
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      token: 'getToken',
    }),
  },
  watch: {
    async emailSearch (value) {
      if (!value) { 
        this.emailItems = [];
        return;
      }
      if (this.emailLoading) { return }

      this.emailLoading = true;
      try {
        const response = await http.get(`/users/email/${this.emailSearch}`)
        this.emailItems = response.data.users;
      } catch (error) {
        console.log('Error: ', error);
      }

      this.emailLoading = false
    },

    async usernameSearch (value) {
      if (!value) { 
        this.usernameItems = [];
        return;
      }
      if (this.usernameLoading) { return }

      this.usernameLoading = true;
      try {
        const response = await http.get(`/users/username/${this.usernameSearch}`)
        this.usernameItems = response.data.users;
      } catch (error) {
        console.log('Error: ', error);
      }

      this.usernameLoading = false;
    },
  },
}
</script>

<style lang="scss" scoped>
  icon:hover {
    box-shadow: none!important;
  }
</style>

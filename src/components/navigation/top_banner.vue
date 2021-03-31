<template>
  <v-banner height="100%" width="100%" class="grey darken-3">
    <div id="banner-left">
      <h2 class="game-title">BATTLESHIP</h2>
    </div>

    <div id="banner-right">
      <v-container v-if="!isSignedIn" class="signed-out">
        <a href="/sign-in">Sign In</a>
      </v-container>

      <v-container v-else> 
        <v-menu
          sub-group
          offset-y
          nudge-bottom="10"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              height="0"
              v-on="on"
              @click="toggle()"
              color="white"
              text
            >
              {{ currentUser.username }}
              <v-icon v-if="!expanded">mdi-chevron-up</v-icon>
              <v-icon v-else>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list class="px-0 py-0 mx-auto top-list">
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="menuActionClick(item.action)"
              class="grey darken-3 list-item-spec"
              dense
            >
              <v-list-item-title class="top-list-item-title">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </div>
  </v-banner>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TopBanner',
  props: {},
  components: {
  },
  data() {
    return {
      items: [
        {
          title: "Settings",
          href: "/settings",
          action: "navigateToSettings",
        },
        {
          title: "Sign Out",
          href: "/sign-out",
          action: "signOut",
        },
      ],
      expanded: false,
    }
  },
  methods: {
    async menuActionClick(action){
      if (action === "signOut") {
        const token = this.token;
        await this.$store.dispatch('signOut', { token: token });
        this.$router.push({ path: '/sign-in' });
      };
      if (action === "navigateToSettings") {
        this.$router.push({ path: '/settings' });
      };
    },
    toggle() {
      this.expanded = !this.expanded;
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      isSignedIn: 'isSignedIn',
      token: 'getToken',
    }),
    username() {
      return this.currentUser ? this.currentUser.username : null;
    },
  },
}
</script>

<style lang="scss" scoped>

</style>

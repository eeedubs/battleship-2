<template>
  <v-container class="pa-0 ma-0">
    <v-list width="10rem">
      <v-list-item
        v-for="(item, index) in navItems"
        :key="index"
        @click="menuViewClick(item.view)"
        class="side-list pl-0"
        dense
      >
        <v-list-item-title class="side-list-item-title pl-6">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SideBar',
  props: {},
  components: {
  },
  data() {
    return {
      expanded: false,
      navItems: [
        {
          title: "Play",
          view: "currentGames",
        },
        {
          title: "History",
          view: "gameHistory",
        },
        {
          title: "Friends",
          view: "friends",
        },
      ],
    }
  },
  methods: {
    menuViewClick(view) {
      return this.$emit('changeView', view);
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

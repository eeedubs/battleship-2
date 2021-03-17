<template>
  <v-list dark>
    <v-list-item
      v-for="(item, index) in items"
      :key="index"
    >
      <v-list-item-title
        class="list-item-title"
        @click="menuActionClick(item.action)"
      >
        {{ item.title }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
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
      items: [
        {
          title: "Settings",
          href: "/settings",
          action: "navigate_to_settings",
        },
        {
          title: "Sign Out",
          href: "/sign-out",
          action: "sign_out",
        },
      ],
      expanded: false,
    }
  },
  methods: {
    async menuActionClick(action){
      if (action === "sign_out") {
        const token = this.token;
        await this.$store.dispatch('sign_out', { token: token });
        this.$router.push({ path: '/sign-in' });
      };
      if (action === "navigate_to_settings") {
        this.$router.push({ path: '/settings' });
      };
    },
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

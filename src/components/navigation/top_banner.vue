<template>
  <v-banner height="100%" width="100%" dark>
    <div id="banner-left">
      <a v-if="current_user" href="/dashboard">Dashboard</a>
    </div>

    <div id="banner-right">
      <div v-if="!is_signed_in" class="signed-out">
        <a href="/sign-in">Sign In</a>
      </div>

      <div v-else> 
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
              dark
            >
              {{ current_user.username }}
              <v-icon v-if="!expanded">mdi-chevron-up</v-icon>
              <v-icon v-else>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list
            class="pb-0 mx-auto list"
          >
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click="menuActionClick(item.action)"
                class="list-item"
                dense
              >
              <v-list-item-title 
                class="list-item-title"
                dark
              >
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-banner>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Banner',
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
    toggle() {
      this.expanded = !this.expanded;
    }
  },
  computed: {
    ...mapGetters({
      current_user: 'current_user',
      is_signed_in: 'is_signed_in',
      token: 'get_token',
    }),
    username() {
      return this.current_user ? this.current_user.username : null;
    },
  },
}
</script>

<style lang="scss" scoped>

</style>

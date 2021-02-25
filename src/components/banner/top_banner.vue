<template>
  <div class="banner">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav class="bootstrap-banner">
        <div v-if="currentUser" class="banner-left">
          <b-nav-item href="/dashboard">Home</b-nav-item>
        </div>

        <div class="banner-right">
          <div v-if="!isLoggedIn" class="logged-out">
            <b-nav-item href="/sign-in">Log In</b-nav-item>
          </div>

          <div v-if="currentUser" class="logged-in">
            <b-nav-item @click="signOut">Log Out</b-nav-item>
 
            <b-nav-item-dropdown :text="userName" right>
              <b-dropdown-item href="/dashboard">Dashboard</b-dropdown-item>
              <b-dropdown-item href="/settings">Settings</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
        </div>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Banner',
  props: {},
  components: {
  },
  methods: {
    async signOut() {
      const token = this.token;
      await this.$store.dispatch('signOut', { token: token });
      this.$router.push({ path: '/sign-in' });
    },
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      isLoggedIn: 'isLoggedIn',
      token: 'getToken',
    }),
    userName() {
      return this.currentUser ? this.currentUser.userName : null;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .banner {
    width: 100%;
    margin-top: -2px;

    .bootstrap-banner {
      display: flex;
      flex: 1;

      .banner-left {
        display: flex;
        justify-content: flex-start;
        flex: 1;
      }

      .banner-right {
        display: flex;
        justify-content: flex-end;
        flex: 1;
        .logged-in {
          display: flex;
        };
        .logged-out {
          display: flex;
        };
      }
    }
  }
</style>

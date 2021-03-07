<template>
  <div class="banner">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav class="bootstrap-banner">
        <div v-if="current_user" class="banner-left">
          <b-nav-item href="/dashboard">Home</b-nav-item>
        </div>

        <div class="banner-right">
          <div v-if="!is_signed_in" class="signed-out">
            <b-nav-item href="/sign-in">Sign In</b-nav-item>
          </div>

          <div v-if="is_signed_in" class="signed-in"> 
            <b-nav-item-dropdown :text="username" right>
              <b-dropdown-item href="/dashboard">Dashboard</b-dropdown-item>
              <b-dropdown-item href="/settings">Settings</b-dropdown-item>
              <b-dropdown-item @click="sign_out">Sign Out</b-dropdown-item>
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
    async sign_out() {
      const token = this.token;
      await this.$store.dispatch('sign_out', { token: token });
      this.$router.push({ path: '/sign-in' });
    },
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
        .signed-in {
          display: flex;
        };
        .signed-out {
          display: flex;
        };
      }
    }
  }
</style>

<template>
  <main>
    <!-- <Window > -->
  </main>
</template>

<script>
import { http } from '@/http';
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  props: {},
  components: {
  },
  data() {
    return {
      data: {
        games: [],
        gameInvitations: [],
      },
    }
  },
  async created() {
    try {
      const response = await http.get("/dashboard", {
        headers: {
          'Access-Control-Allow-Headers': 'x-access-token',
          'x-access-token': this.token
        }
      });
      if (response.error){
        this.games = [];
        this.gameInvitations = [];
      } else {
        this.games = response.games;
        this.gameInvitations = response.gameInvitations;
      }
    } catch (error) {
      console.log('Error: ', error.response.statusText);
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      token: 'getToken',
    }),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 4rem;
    background-color: white;

    .container {
      display: flex;
      justify-content: center;
      background-color: white;
      font-family: 'Alto';
      padding-bottom: 1rem;
      min-width: 72rem;
      min-height: 36rem;
    }
  }
</style>

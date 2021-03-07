<template>
  <main>
    <h1>Sign In</h1>
    <form @submit.prevent="submit">
      <label for="Email">Email:</label>
      <input type="text" v-model="email" autocomplete required>
      <br>
      <label for="Password">Password:</label>
      <input type="password" v-model="password" autocomplete required>
      <button type="submit">Sign In</button>
      <p v-if="errorState" class="error-message">
        <span>{{ errorState }}</span>
      </p>
    </form>
    <h5>Don't have an account? <a href="/sign-up">Sign up.</a></h5>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SignIn',
  props: {},
  components: {
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  async created() {
    await this.$store.dispatch('clear_error');
  },
  methods: {
    async submit() {
      try {
        const response = await this.$store.dispatch('sign_in', { 
          email: this.email, 
          password: this.password,
        });
        if (response && response.auth){
          this.$router.push({ path: '/dashboard' });
        }
      } catch(error) {
        console.log("Error: ", error.response.statusText);
      };
    },
  },
  computed: {
    ...mapGetters({
      is_signed_in: 'is_signed_in',
      error: "get_error",
    }),
    errorState() {
      return this.error;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 85vh;
    margin: 0 4rem;
    background-color: white;

    h1 { margin: 3rem 0 1rem; }
    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: lightblue;
      min-width: 30rem;
      min-height: 15rem;
      padding: 2rem;
      label {
        text-align: left;
        font-weight: bold;
      }
      input {
        display: flex;
        min-width: 100%;
      }

      button {
        background-color: #44b53e;
        margin-top: 2rem;
      }
    }
    h5 { margin: 1.5rem 0 3rem; }

    .error-message { 
      color: red;
      margin: 0.5rem 0 0;
    }
  }
</style>

<template>
  <div class="page">
    <main>
      <h1>Sign In</h1>
      <v-form 
        @submit.prevent="submit"
        class="auth-form"
      >
        <v-container>
          <v-row class="form-row py-2 px-6">
            <v-text-field
              v-model="email"
              label="Email"
              hide-details="auto"
              background-color="white"
              clearable
              append-icon
              required
            ></v-text-field>
          </v-row>
          <v-row class="form-row py-2 px-6">
            <v-text-field
              v-model="password"
              label="Password"
              hide-details="auto"
              background-color="white"
              clearable
              required
            ></v-text-field>
          </v-row>

          <template v-for="(error, index) of errors">
            <v-alert
              class="mt-6 mb-0 py-0 mx-0"
              :key="index"
              dense
              text
              type="error"
            >{{ error }}</v-alert>
          </template>

          <v-row class="form-row py-1 mt-4 mb-2">
            <v-btn
              class="my-0"
              color="success"
              @click="submit"
            >Sign In</v-btn>
          </v-row>
        </v-container>
      </v-form>
      <h5>Don't have an account? <a href="/sign-up">Sign up.</a></h5>
    </main>
  </div>
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
      isSignedIn: 'isSignedIn',
      errors: "getErrors",
    }),
  }
}
</script>

<style lang="scss" scoped>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    h5 { margin: 1.5rem 0 3rem; }
  }
</style>

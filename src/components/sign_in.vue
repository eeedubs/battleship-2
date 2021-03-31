<template>
  <div class="page">
    <main>
      <h1>Sign In</h1>
      <v-form
        @submit.prevent="submit"
        class="basic-form"
        ref="form"
      >
        <v-row class="form-row pt-4 px-6 my-0">
          <v-text-field
            id="emailInput"
            tabindex="1"
            v-model="email"
            label="Email"
            hide-details="auto"
            background-color="white"
            clearable
            :rules="[basicRules.required]"
            @keyup.enter="tabTo('passwordInput')"
          >
          </v-text-field>
        </v-row>
        <v-row class="form-row pt-4 px-6 my-0">
          <v-text-field
            id="passwordInput"
            tabindex="2"
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :rules="[basicRules.required]"
            label="Password"
            hide-details="auto"
            background-color="white"
            clearable
            @click:append="showPassword = !showPassword"
            @keyup.enter="submit"
          >
          </v-text-field>
        </v-row>

        <v-alert
          v-if="error"
          class="mt-2 mb-0 mx-0"
          :key="index"
          dense
          text
          type="error"
        >{{ error }}</v-alert>

        <v-row class="form-row pt-4 pb-4 my-0">
          <v-btn
            color="success"
            @click="submit"
          >Sign In</v-btn>
        </v-row>
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
      showPassword: false,
      email: '',
      password: '',
      basicRules: {
        required: v => !!v || 'Required.',
      },
    }
  },
  async created() {
    await this.$store.dispatch('clearError');
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          const response = await this.$store.dispatch('signIn', { 
            email: this.email, 
            password: this.password,
          });
          if (response && response.auth){
            this.$router.push({ path: '/dashboard' });
          }
        } catch(error) {
          console.log("Error: ", error.response.statusText);
        };
      }
    },
    tabTo(elementId) {
      document.getElementById(elementId).focus();
    },
  },
  computed: {
    ...mapGetters({
      isSignedIn: 'isSignedIn',
      error: "getError",
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

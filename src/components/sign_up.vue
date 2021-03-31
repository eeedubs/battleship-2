<template>
  <div class="page">
    <main>
      <h1>Sign Up</h1>
      <v-form 
        @submit.prevent="submit" 
        class="basic-form"
        ref="form"
      >
        <v-row class="form-row pt-4 px-6 my-0">
          <v-col class="pl-0 py-0 my-0">
            <v-text-field
              id="firstNameInput"
              tabIndex="1"
              v-model="firstName"
              label="First Name"
              hide-details="auto"
              lazy-validation
              background-color="white"
              :rules="[basicRules.required]"
              validate-on-blur
              clearable
              @keyup.enter="tabTo('lastNameInput')"
            ></v-text-field>
          </v-col>

          <v-col class="pr-0 py-0 my-0">
            <v-text-field
              id="lastNameInput"
              tabIndex="2"
              v-model="lastName"
              label="Last Name"
              hide-details="auto"
              lazy-validation
              background-color="white"
              :rules="[basicRules.required]"
              validate-on-blur
              clearable
              @keyup.enter="tabTo('usernameInput')"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- username -->
        <v-row class="form-row pt-4 px-6 my-0">
          <v-text-field 
            id="usernameInput"
            tabIndex="3"
            v-model="username"
            label="Username"
            hide-details="auto"
            lazy-validation
            background-color="white"
            :rules="[basicRules.required, usernameRules.min, usernameRules.max]"
            validate-on-blur
            clearable
            @keyup.enter="tabTo('emailInput')"
          ></v-text-field>
        </v-row>

        <!-- email -->
        <v-row class="form-row pt-4 px-6 my-0">
          <v-text-field
            id="emailInput"
            tabIndex="4"
            v-model="email"
            label="Email"
            hide-details="auto"
            lazy-validation
            background-color="white"
            :rules="[basicRules.required]"
            validate-on-blur
            clearable
            @keyup.enter="tabTo('passwordInput')"
          ></v-text-field>
        </v-row>

        <!-- password -->
        <v-row class="form-row pt-4 px-6 my-0">
          <v-text-field
            id="passwordInput"
            tabIndex="5"
            v-model="password"
            label="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :rules="[basicRules.required]"
            hide-details="auto"
            lazy-validation
            background-color="white"
            validate-on-blur
            clearable
            @click:append="showPassword = !showPassword"
            @keyup.enter="submit"
          ></v-text-field>
        </v-row>

        <v-alert
          v-if="error"
          class="mt-2 mb-0 mx-0 py-0"
          dense
          text
          type="error"
        >{{ error }}</v-alert>

        <v-row class="form-row pt-4 pb-4 my-0">
          <v-btn
            class="my-0"
            color="success"
            @click="submit"
          >Sign Up</v-btn>
        </v-row>
      </v-form>
      <h5>Already have an account? <a href="/sign-in">Sign in.</a></h5>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SignUp',
  props: {},
  components: {
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      usernameIsUnique: null,
      email: '',
      password: '',
      showPassword: false,
      basicRules: {
        required: v => !!v || 'Required.',
      },
      usernameRules: {
        min: v => (v && v.length >= 3) || 'Min 3 characters.',
        max: v => (v && v.length <= 20) || 'Max 20 characters.',
      },
    }
  },
  computed: {
    ...mapGetters({
      isSignedIn: 'isSignedIn',
      error: "getError",
    }),
  },
  async created() {
    await this.$store.dispatch('clearError');
  },
  methods: {
    async submit() {
      try {
        const response = await this.$store.dispatch('signUp', { 
          firstName: this.firstName.replace(/\s+/g, ''),
          lastName: this.lastName.replace(/\s+/g, ''),
          username: this.username.replace(/\s+/g, ''),
          email: this.email.replace(/\s+/g, ''), 
          password: this.password,
        });

        if (response && response.auth){
          this.$router.push({ path: '/dashboard' });
        }
      } catch(error){
        console.log(error);
      }
    },
    tabTo(elementId) {
      document.getElementById(elementId).focus();
    },
  },
}
</script>

<style lang="scss" scoped>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 80vh;

    h5 { margin-top: 1.5rem; }
  }
</style>

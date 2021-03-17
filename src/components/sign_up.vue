<template>
  <div class="page">
    <main>
      <h1>Sign Up</h1>
      <v-form 
        @submit.prevent="submit" 
        class="auth-form"
        ref="form"
      >
        <v-container>
          <v-row class="form-row py-2 px-6">
            <v-col class="pl-0 pt-0">
              <v-text-field 
                v-model="firstName"
                label="First Name"
                hide-details="auto"
                lazy-validation
                background-color="white"
                clearable
                append-icon
                :rules="[basicRules.required]"
                validate-on-blur
              ></v-text-field>
            </v-col>
            
            <v-col class="pr-0 pt-0">
              <v-text-field 
                v-model="lastName"
                label="Last Name"
                hide-details="auto"
                lazy-validation
                background-color="white"
                clearable
                append-icon
                :rules="[basicRules.required]"
                validate-on-blur
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="form-row py-2 px-6">
            <v-text-field 
              v-model="username"
              label="Username"
              hide-details="auto"
              lazy-validation
              background-color="white"
              clearable
              append-icon
              :rules="[basicRules.required, usernameRules.min, usernameRules.max]"
              validate-on-blur
            ></v-text-field>
          </v-row>

          <v-row class="form-row py-2 px-6">
            <v-text-field 
              v-model="email"
              label="Email"
              hide-details="auto"
              lazy-validation
              background-color="white"
              clearable
              append-icon
              :rules="[basicRules.required]"
              validate-on-blur
            ></v-text-field>
          </v-row>

          <v-row class="form-row py-2 px-6">
            <v-text-field
              v-model="password"
              label="Password"
              hide-details="auto"
              lazy-validation
              background-color="white"
              clearable
              append-icon
              :rules="[basicRules.required]"
              validate-on-blur
              type="password"
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
            >Sign Up</v-btn>
          </v-row>
        </v-container>
      </v-form>
      <h5>Already have an account? <a href="/sign-in">Sign in.</a></h5>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { http } from '@/http'

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
      errors: "getErrors",
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

    .compact-row, .tiered-row {
      display: flex;
      min-width: 100%;
      text-align: left;

      .left { padding-right: 1rem; }
      .right { padding-left: 1rem; }
    }

    .compact-row {
      flex-direction: row;
    }
    .tiered-row {
      flex-direction: column;
    }

    h5 { margin-top: 1.5rem; }
  }
</style>

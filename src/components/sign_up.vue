<template>
  <div class="page">
    <main>
      <h1 class="auth-header">Sign up</h1>
      <form @submit.prevent="submit" class="auth-form">
        <div class="compact-row">
          <div class="left">
            <label for="first_name">First Name:</label>
            <input type="text" v-model="first_name" autocomplete required>
          </div>
          <div class="right">
            <label for="last_name">Last Name:</label>
            <input type="text" v-model="last_name" autocomplete required>
          </div>
        </div>
        <br>
        <div class="tiered-row">
          <label for="Username">Username:</label>
          <input type="text" v-model="username" maxlength="20" required>
          <br>
          <label for="Email">Email:</label>
          <input type="text" v-model="email" autocomplete required>
          <br>
          <label for="Password">Password:</label>
          <input type="password" v-model="password" autocomplete required>
        </div>
        <button type="submit" class="auth">Sign up</button>
        <p v-if="error" class="error-message">
          <span>{{ error }}</span>
        </p>
      </form>
      <h5>Already have an account? <a href="/sign-in">Sign in.</a></h5>
    </main>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  props: {},
  components: {
  },
  data() {
    return {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async submit() {
      try {
        const response = await this.$store.dispatch('sign_up', { 
          first_name: this.first_name,
          last_name: this.last_name,
          username: this.username,
          email: this.email, 
          password: this.password,
        });

        if (response && response.auth){
          this.$router.push({ path: '/dashboard' });
        };
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

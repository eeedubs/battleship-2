<template>
  <div class="banner">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav class="bootstrap-banner">
        <div class="banner-left">
          <b-nav-item href="#">Home</b-nav-item>
        </div>

        <div class="banner-right">
          <b-nav-item href="#">Log In</b-nav-item>

          <b-nav-item-dropdown text="User" center>
            <b-dropdown-item href="#">Account</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
          </b-nav-item-dropdown>
        </div>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'Banner',
  props: {},
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .banner {
    width: 100%;
    
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
      }
    }
  }
</style>

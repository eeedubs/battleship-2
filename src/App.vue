<template>
  <div id="app">
    <Banner />
    <router-view />
  </div>
</template>

<script>
import Banner from './components/banner/top_banner';

export default {
  name: 'App',
  components: {
    Banner,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: lightblue;
  min-height: 100vh;
  margin: 0 -2px; 
}
</style>

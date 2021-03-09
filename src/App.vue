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

<style lang="scss">
</style>

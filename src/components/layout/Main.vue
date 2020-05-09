<template>
  <main class="main">
    <Banner />
    <Container />
  </main>
</template>

<script>

import { Banner, Container } from './index';

export default {
  name: 'Main',
  props: {},
  components: {
    Banner,
    Container,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    background-color: lightblue;
  }
</style>

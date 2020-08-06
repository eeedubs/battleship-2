<template>
  <main class="main">
    <Banner />
    <ShipPlacement v-if="!shipPlacementComplete" />
    <GamePort v-if="shipPlacementComplete" />
  </main>
</template>

<script>

import { Banner, GamePort, ShipPlacement } from './layout/index';

export default {
  name: 'Main',
  props: {},
  components: {
    Banner,
    GamePort,
    ShipPlacement,
  },
  data() {
    return {
      shipPlacementComplete: false,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;
    margin: -2px;
    background-color: lightblue;
  }
</style>

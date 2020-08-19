<template>
  <main class="main">
    <Banner />
    <ShipPlacement v-if="!shipPlacementComplete" />
    <PlayGame v-if="shipPlacementComplete" />
  </main>
</template>

<script>

import { Banner } from './navigation/index';
import { PlayGame, ShipPlacement } from './game_screens/index';

export default {
  name: 'Main',
  props: {},
  components: {
    Banner,
    PlayGame,
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

<template>
  <div class="container">
    <div class="player-view">
      <h2>Your Ships</h2>
      <GamePort />
      <Ships />
    </div>
    <div class="opponent-view">
      <h2>Opponent Ships</h2>
      <GamePort />
      <Ships />
    </div>
  </div>
</template>

<script>
import { GamePort, Ships } from './gameport/index';

export default {
  name: 'Container',
  props: {},
  components: {
    GamePort,
    Ships,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .container {
    display: flex;
    justify-content: space-between;
    padding: 3rem 0;
    background-color: white;

    .player-view, .opponent-view {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      background-color: white;
    }
  }
</style>

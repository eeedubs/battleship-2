<template>
  <div class="container">
    <div class="player-view">
      <h2>Your Ships</h2>
      <div class="board">
        <PlayerBoard />
        <ShipsStatusPanel />
      </div>
    </div>
    
    <div class="opponent-view">
      <h2>Opponent Ships</h2>
      <div class="board">
        <ShipsStatusPanel />
        <OpponentBoard />
      </div>
    </div>
  </div>
</template>

<script>
import { PlayerBoard, OpponentBoard } from './board/index';
import { ShipsStatusPanel } from './ships/index';

export default {
  name: 'GamePort',
  props: {},
  components: {
    PlayerBoard,
    OpponentBoard,
    ShipsStatusPanel,
  },
  data() {
    return {
      ships: [
        { type: 'carrier', length: 5 },
        { type: 'battleship', length: 4 },
        { type: 'destroyer', length: 3 },
        { type: 'cruiser', length: 3 },
        { type: 'submarine', length: 2 },
      ],
    }
  },
  methods: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .container {
    display: flex;
    background-color: white;
    padding: 1rem;
    min-height: 32rem;

    // shared
    .player-view, .opponent-view {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 1rem;

      h2 {
        margin-top: 1rem;
      }

      .board {
        display: flex;
        flex-direction: row;
      }
    }

    // individual
    .player-view { 
      margin-right: 0.5rem; 
      h2 {
        position: relative;
        right: 3rem;
      }
    }

    .opponent-view { 
      margin-left: 0.5rem; 
      h2 {
        position: relative;
        left: 4rem;
      }
    }
  }
</style>

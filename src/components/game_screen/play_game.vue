<template>
  <div class="container">
    <div class="player-view">
      <h2>Your Board</h2>
      <div class="board">
        <PlayerBoard />
        <Ships />
      </div>
    </div>
    
    <div class="opponent-view">
      <h2>Opponent Board</h2>
      <div class="board">
        <Ships />
        <OpponentBoard />
      </div>
    </div>
  </div>
</template>

<script>
import { PlayerBoard, OpponentBoard, Ships } from './play_game/index';

export default {
  name: 'PlayGame',
  props: {},
  components: {
    Ships,
    PlayerBoard,
    OpponentBoard,
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
    min-width: 72rem;
    min-height: 85vh;

    // shared
    .player-view, .opponent-view {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 0 1rem;

      h2 { 
        margin: 1rem 0;
        min-width: 100%;
      }

      .board {
        display: flex;
      }
    }

    // individual
    .player-view { 
      h2 {
        padding-right: 4rem;
      }
    }

    .opponent-view { 
      h2 {
        padding-left: 4rem;
      }
    }
  }
</style>

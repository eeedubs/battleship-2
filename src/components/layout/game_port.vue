<template>
  <div class="container">
    <div class="player-view">
      <h2>Your Ships</h2>
      <div class="board">
        <PlayerBoard
          :shipPlacementComplete="shipPlacementComplete"
        />
        <Ships />
      </div>
    </div>
    
    <div class="opponent-view">
      <h2>Opponent Ships</h2>
      <div class="board">
        <Ships />
        <OpponentBoard 
          :shipPlacementComplete="shipPlacementComplete" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import { PlayerBoard, OpponentBoard, ShipPlacementBoard} from './board/index';
import Ships from './ships';

export default {
  name: 'GamePort',
  props: {},
  components: {
    PlayerBoard,
    OpponentBoard,
    ShipPlacementBoard,
    Ships,
  },
  created() {
    window.addEventListener('keydown', (e) => {
      // KEY LEGEND:
      // 27: escape key
      // 32: space
      // 37: left arrow
      // 38: up arrow
      // 39: right arrow
      // 40: down arrow

      if ([32, 37, 38, 39, 40].includes(e.keyCode)) {
        // Prevent page from scrolling
        e.preventDefault();
        if (this.selectedShip) {
          this.handleShipMovement(this.selectedShip, e.keyCode);
        };
      };

      if (e.keyCode === 27) {
        // Unset the selected ship when user presses escape
        this.selectedShip = null;
      };
    });
  },
  data() {
    return {
      selectedShip: null,
      shipPlacementComplete: false,
      selectionRange: [],
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
    setShipSelectionActive(shipType) {
      this.selectedShip = this.ships.find(ship => ship.type == shipType);
    },
    handleShipMovement(ship, keyCode) {
    },
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

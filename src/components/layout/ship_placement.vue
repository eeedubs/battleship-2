<template>
  <div class="container">
    <div class="ship-placement-view">
      <h2>Place Your Ships</h2>
      <div class="board">
        <ShipsPlacementPanel 
          :shipPlacementActive="shipPlacementActive"
          v-on:shipClicked="activateShipPlacement"
        />
        <ShipPlacementBoard 
          :shipPlacementActive="shipPlacementActive"
          :selectedShip="selectedShip"
          :selectedTileCoordinates="selectedTileCoordinates"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ShipPlacementBoard } from './board/index';
import { ShipsPlacementPanel } from './ships/index';

export default {
  name: 'ShipPlacement',
  props: {},
  components: {
    ShipPlacementBoard,
    ShipsPlacementPanel,
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
        this.handleShipMovement(this.selectedShip, e.keyCode);
      }

      if (e.keyCode === 27) {
        // Unset the selected ship when user presses escape
        this.unsetShipPlacement();
      };
    });
  },
  data() {
    return {
      shipPlacementActive: false,
      selectedShip: {},
      selectedTileCoordinates: { x: 0, y: 0, isHorizontal: true },
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
    activateShipPlacement(shipType) {
      this.shipPlacementActive = true;
      this.selectedShip = this.ships.find(ship => ship.type == shipType);
    },
    unsetShipPlacement() {
      this.shipPlacementActive = false;
      this.selectedShip = {};
      this.selectedTileCoordinates = { x: 0, y: 0, isHorizontal: true };
    },
    rotateShipPlacement(shipLength) {

    },
    handleShipMovement(ship, keyCode) {
      if (this.shipPlacementActive){
        switch(keyCode){
          case 32: // rotate
            if (this.selectedTileCoordinates.isHorizontal){
              if (this.selectedTileCoordinates.y + ship.length <= 10){
                this.selectedTileCoordinates.isHorizontal = false;
              }
            } else {
              if (this.selectedTileCoordinates.x + ship.length <= 10){
                this.selectedTileCoordinates.isHorizontal = true;
              }
            }
            break;
          case 37: // left
            if (this.selectedTileCoordinates.x > 0){
              this.selectedTileCoordinates.x -= 1;
            }
            break;
          case 38: // up
            if (this.selectedTileCoordinates.y > 0){
              this.selectedTileCoordinates.y -= 1;
            }
            break;
          case 39: // right
            if (this.selectedTileCoordinates.isHorizontal){
              if (this.selectedTileCoordinates.x + ship.length <= 9){
                this.selectedTileCoordinates.x += 1;
              }
            } else {
              if (this.selectedTileCoordinates.x < 9){
                this.selectedTileCoordinates.x += 1;
              }
            }
            break;
          case 40: // down
            if (this.selectedTileCoordinates.isHorizontal){
              if (this.selectedTileCoordinates.y < 9){
                this.selectedTileCoordinates.y += 1;
              }
            } else {
              if (this.selectedTileCoordinates.y + ship.length <= 9){
                this.selectedTileCoordinates.y += 1;
              }
              };
            break;
        };
      };
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .container {
    display: flex;
    justify-content: center;
    background-color: white;
    padding: 1rem;
    min-height: 32rem;

    .ship-placement-view {
      display: flex;
      flex: 1;
      flex-direction: column;

      h2 {
        margin: 1rem 0 2rem;
      }

      .board {
        display: flex;
        flex: 1;
        flex-direction: row;
        justify-content: center;
        width: 100%;
      }
    }
  }
</style>

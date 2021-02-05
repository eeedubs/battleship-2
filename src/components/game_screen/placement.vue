<template>
  <div class="container">
    <div class="ship-placement-view">
      <div class="header">
        <h1>Place Your Ships</h1>
      </div>
      <div class="components">
        <div class="panel">
          <Ships 
            :ships="ships"
            @selectShipForPlacement="activateShipSelection"
            @removeShip="removeShipPlacement"
          />
        </div>
        <div class="panel">
          <PlacementBoard
            :ships="ships"
            :selectedShip="getSelectedShip"
            :placedShips="getPlacedShips"
            :isAttemptingToPlaceShip="isAttemptingToPlaceShip"
            :selectedTileAxisPoint="selectedTileAxisPoint"
            @shipPlacementValidator="handleShipPlacementResponse"
          />
        </div>
        <div class="panel">
          <ControlsLegend />
          <button @click="completeShipPlacement()" class="done-button" :disabled="!allShipsArePlaced">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ControlsLegend, Ships, PlacementBoard } from './placement/index';

export default {
  name: 'Placement',
  props: {},
  components: {
    ControlsLegend,
    Ships,
    PlacementBoard,
  },
  created() {
    window.addEventListener('keydown', (e) => {      
      let selectedShip = this.getSelectedShip;
      
      // KEY LEGEND:
      const isEnter = e.keyCode === 13
      const isEscape = e.keyCode === 27
      const isSpace = e.keyCode === 32
      const isLeft = e.keyCode === 37
      const isUp = e.keyCode === 38
      const isRight = e.keyCode === 39
      const isDown = e.keyCode === 40

      if (isSpace || isLeft || isUp || isRight || isDown) {
        e.preventDefault();
        if (selectedShip) {
        // Moves or rotates the selected ship
          this.handleShipMovement(e.keyCode);
        }
      }

      if (selectedShip && isEscape) {
        e.preventDefault();
        // Unset the selected ship when user presses escape
        this.deactivateShipSelection();
      };

      if (selectedShip && isEnter) {
        e.preventDefault();
        // Place the ship on the board
        this.attemptToPlaceShip();
      };
    });
  },
  data() {
    return {
      // used to communicate with the board as to when a ship is being placed
      isAttemptingToPlaceShip: false,
      selectedTileAxisPoint: {},
      ships: [
        { 
          label: 'Carrier', 
          image_url: require('@/assets/5_carrier.png'), 
          shipLength: 5, 
          selected: false, 
          placed: false,
          coordinates: [],
        },
        { 
          label: 'Battleship', 
          image_url: require('@/assets/4_battleship.png'), 
          shipLength: 4, 
          selected: false, 
          placed: false,
          coordinates: [], 
        },
        { 
          label: 'Destroyer', 
          image_url: require('@/assets/3_destroyer.png'), 
          shipLength: 3, 
          selected: false, 
          placed: false,
          coordinates: [], 
        },
        { 
          label: 'Cruiser', 
          image_url: require('@/assets/3_cruiser.png'), 
          shipLength: 3, 
          selected: false, 
          placed: false,
          coordinates: [], 
        },
        { 
          label: 'Submarine', 
          image_url: require('@/assets/2_submarine.png'), 
          shipLength: 2, 
          selected: false, 
          placed: false,
          coordinates: [], 
        },
      ],
    }
  },
  computed: {
    getSelectedShip() {
      return this.ships.find(ship => ship.selected);
    },
    getPlacedShips() {
      return this.ships.filter(ship => ship.placed);
    },
    allShipsArePlaced() {
      return this.getPlacedShips.length === this.ships.length;
    },
  },
  methods: {
    getShipByLabel(shipLabel) {
      return this.ships.find(ship => ship.label === shipLabel);
    },
    formatCoordinates(coordinates) {
      return coordinates.map((c) => { return { column: c.column, row: c.row } });
    },
    // used to signal to the child that the user is selecting a ship for placement
    activateShipSelection(shipLabel) {
      this.resetTileCoordinates();
      this.getShipByLabel(shipLabel).selected = true;
    },
    // used to deactivate the selection of ships for placement
    deactivateShipSelection() {
      this.ships.forEach(ship => ship.selected = false);
    },
    resetTileCoordinates() {
      this.selectedTileAxisPoint = { x: 0, y: 0, isHorizontal: true };
    },
    // used to signal to the child that the user is attempting to place a ship
    attemptToPlaceShip() {
      this.isAttemptingToPlaceShip = true;
    },
    // used to mark ships as placed and 
    placeSelectedShip(shipCoordinates) {
      this.getSelectedShip.coordinates = this.formatCoordinates(shipCoordinates);
      this.getSelectedShip.placed = true;
    },
    removeShipPlacement(shipLabel) {
      this.getShipByLabel(shipLabel).placed = false;
    },
    handleShipPlacementResponse(...args) {
      let attemptWasSuccessful = args[0];
      let targettedTiles = args[1];
      if (attemptWasSuccessful && targettedTiles.length > 0) {
        // On success, place the ship and mark the coordinates, unselect the ship, 
        // and reset the tile coordinates
        this.placeSelectedShip(targettedTiles);
        this.deactivateShipSelection();
        this.resetTileCoordinates();
      } else {
        // On failure, alert that the placement was not successful
        alert("Ship placement was not successful.");
      };
      this.isAttemptingToPlaceShip = false;
    },
    rotateShipPlacement(ship) {
      if (this.selectedTileAxisPoint.isHorizontal) {
        if (this.selectedTileAxisPoint.y + ship.shipLength <= 10) {
          this.selectedTileAxisPoint.isHorizontal = false;
        }
      } else {
        if (this.selectedTileAxisPoint.x + ship.shipLength <= 10) {
          this.selectedTileAxisPoint.isHorizontal = true;
        }
      }
    },
    handleShipMovement(keyCode) {
      const selectedShip = this.getSelectedShip;
      if (selectedShip) {
        switch(keyCode) {
          case 32: // rotate
            this.rotateShipPlacement(selectedShip);
            break;
          case 37: // left
            if (this.selectedTileAxisPoint.x > 0) {
              this.selectedTileAxisPoint.x -= 1;
            }
            break;
          case 38: // up
            if (this.selectedTileAxisPoint.y > 0) {
              this.selectedTileAxisPoint.y -= 1;
            }
            break;
          case 39: // right
            if (this.selectedTileAxisPoint.isHorizontal) {
              if (this.selectedTileAxisPoint.x + selectedShip.shipLength <= 9) {
                this.selectedTileAxisPoint.x += 1;
              }
            } else {
              if (this.selectedTileAxisPoint.x < 9) {
                this.selectedTileAxisPoint.x += 1;
              }
            }
            break;
          case 40: // down
            if (this.selectedTileAxisPoint.isHorizontal) {
              if (this.selectedTileAxisPoint.y < 9) {
                this.selectedTileAxisPoint.y += 1;
              }
            } else {
              if (this.selectedTileAxisPoint.y + selectedShip.shipLength <= 9) {
                this.selectedTileAxisPoint.y += 1;
              }
              };
            break;
        };
      };
    },
    completeShipPlacement() {
      this.$emit("placementComplete");
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
    font-family: 'Alto';
    padding-bottom: 1rem;
    min-width: 72rem;
    min-height: 36rem;

    .ship-placement-view {
      display: flex;
      flex: 1;
      flex-direction: column;

      .header {
        min-width: 100%;
        h1 {
          padding: 1rem 0;
          background-color: white; 
        }
      }

      .components {
        display: flex;
        background-color: lightgray;
        flex-direction: row;
        flex: 1;
    
        .panel {
          display: inline-flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          background-color: white;

          .done-button {
            width: 10rem;
            height: 2rem;
            &:not(:disabled) {
              background-color: #44b53e; 
            }
          }
        }
      }
    }
  }
</style>

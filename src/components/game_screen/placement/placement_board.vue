<template>
  <table class="board">
    <tr class="column" v-for="c in boardTiles" :key="c.column">
      <td class="row" v-for="r in c.rows" :key="r.row">
        <StaticTile 
          @toggled="toggleStaticTile(c.column, r.row)"
          :selected="boardTiles[c.column].rows[r.row].selected"
          :shipPlacedUpon="boardTiles[c.column].rows[r.row].shipPlacedUpon"
        />
      </td>
    </tr>
  </table>
</template>

<script>
import StaticTile from './internal/static_tile';

export default {
  name: 'PlacementBoard',
  props: {
    ships: { type: Array },
    selectedShip: { type: Object },
    placedShips: { type: Array },
    isAttemptingToPlaceShip: { type: Boolean },
    selectedTileAxisPoint: { type: Object },
  },
  components: {
    StaticTile,
  },
  created() {
    let boardSetup = Array(10).fill({}).map((c, cIndex) => {
      return {
        column: cIndex,
        rows: Array(10).fill({}).map((r, rIndex) => {
          return {
            column: cIndex,
            row: rIndex,
            selected: false,
            shipPlacedUpon: false,
          };
        }),
      };
    });
    this.$set(this, 'boardTiles', boardSetup);
  },
  data() {
    return {
      targettedTiles: [],
      boardTiles: [],
    }
  },
  computed: {
    getCoordinatesOfCurrentlyPlacedTiles() {
      // Returns the coordinates of the tiles that are currently placed.
      return this.placedShips.map(ship => ship.coordinates).flat();
    },
  },
  methods: {
    activateInitialTiles(shipLength) {
      // Sets the initial sequence of tiles to be selected.
      let startingTiles = this.boardTiles.map((c) => {
        if (c.column < shipLength){
          return c.rows[0];
        }
      }).filter(x => x);
      startingTiles.forEach(tile => tile.selected = true);
    },
    deselectAllTiles() {
      // Deselects every tile.
      this.targettedTiles = [];
      this.boardTiles.forEach(c => c.rows.forEach(r => r.selected = false ));      
    },
    validatePlacementTiles() {
      // Return whether or not any of the targetted tiles are already placed upon.
      return !this.targettedTiles.some(t => t.shipPlacedUpon);
    },
    updateBoard() {
      // Update any mismatch between tiles which should be labeled as placed upon, and tiles that shouldn't.
      this.boardTiles.forEach((column) => {
        column.rows.forEach((row) => {
          let tileShouldExist = this.getCoordinatesOfCurrentlyPlacedTiles.some(tile => tile.column === row.column && tile.row === row.row);
          if (tileShouldExist) {
            row.shipPlacedUpon = true;
          } else {
            row.shipPlacedUpon = false;
          }
        })
      });
    },
  },
  watch: {
    selectedShip(newState, oldState) {
      // When switched from false to true, activate the initial tiles selection sequence.
      if (newState && !oldState) {
        this.activateInitialTiles(this.selectedShip.shipLength);
      } else {
        this.deselectAllTiles();
      };
    },
    isAttemptingToPlaceShip(newState, oldState) {
      // When switched from false to true, emit the status of whether or not the placement is valid.
      if (this.selectedShip && newState && !oldState){
        let canPlaceTiles = this.validatePlacementTiles();
        this.$emit("shipPlacementValidator", canPlaceTiles, this.targettedTiles);
      };
    },
    placedShips(newShips, oldShips) {
      // Any time this number changes, update the board and select all tiles.
      this.updateBoard();
      if (newShips.length > oldShips.length) {
        // Only deselect all tiles after a ship has been placed.
        this.deselectAllTiles();
      };
    },
    selectedTileAxisPoint: {
      handler(coordinates) {
        if (this.selectedShip){
          this.deselectAllTiles();
          if (coordinates.isHorizontal){
          // horizontal placement logic
            this.boardTiles.forEach((c) => {
              if (c.column >= coordinates.x && c.column < coordinates.x + this.selectedShip.shipLength){
                this.targettedTiles.push(c.rows[coordinates.y]);
              }
            })
          } else {
          // vertical placement logic
            this.boardTiles[coordinates.x].rows.forEach((r) => {
              if (r.row >= coordinates.y && r.row < coordinates.y + this.selectedShip.shipLength) {
                this.targettedTiles.push(r);
              }
            });
          };
          this.targettedTiles.forEach(tile => tile.selected = true);
        };
      },
      deep: true,
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .board {
    display: flex;
    .column {
      .row {
        margin: 0;
      }
    }
  }
</style>

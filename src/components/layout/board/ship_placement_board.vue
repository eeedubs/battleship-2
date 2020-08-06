<template>
  <table class="board">
    <tr class="column" v-for="c in boardData" :key="c.column">
      <td class="row" v-for="r in c.rows" :key="r.row">
        <StaticTile 
          @toggled="toggleStaticTile(c.column, r.row)"
          :selected="boardData[c.column].rows[r.row].selected"
        />
      </td>
    </tr>
  </table>
</template>

<script>
import { StaticTile } from './pieces/index';

export default {
  name: 'ShipPlacementBoard',
  props: {
    shipPlacementActive: { type: Boolean },
    selectedShip: { type: Object },
    selectedTileCoordinates: { type: Object },
  },
  components: {
    StaticTile,
  },
  data() {
    return {
      boardData: [
        { column: 0, rows: [
          { row: 0, selected: false }, 
          { row: 1, selected: false }, 
          { row: 2, selected: false }, 
          { row: 3, selected: false }, 
          { row: 4, selected: false },
          { row: 5, selected: false }, 
          { row: 6, selected: false }, 
          { row: 7, selected: false }, 
          { row: 8, selected: false }, 
          { row: 9, selected: false },
        ] },
        { column: 1, rows: [
          { row: 0, selected: false },
          { row: 1, selected: false },
          { row: 2, selected: false },
          { row: 3, selected: false },
          { row: 4, selected: false },
          { row: 5, selected: false },
          { row: 6, selected: false },
          { row: 7, selected: false },
          { row: 8, selected: false },
          { row: 9, selected: false },
        ] },
        { column: 2, rows: [
          { row: 0, selected: false },
          { row: 1, selected: false },
          { row: 2, selected: false },
          { row: 3, selected: false },
          { row: 4, selected: false },
          { row: 5, selected: false },
          { row: 6, selected: false },
          { row: 7, selected: false },
          { row: 8, selected: false },
          { row: 9, selected: false },
        ] },
        { column: 3, rows: [
          { row: 0, selected: false },
          { row: 1, selected: false },
          { row: 2, selected: false },
          { row: 3, selected: false },
          { row: 4, selected: false },
          { row: 5, selected: false },
          { row: 6, selected: false },
          { row: 7, selected: false },
          { row: 8, selected: false },
          { row: 9, selected: false },
        ] },
        { column: 4, rows: [
          { row: 0, selected: false },
          { row: 1, selected: false },
          { row: 2, selected: false },
          { row: 3, selected: false },
          { row: 4, selected: false },
          { row: 5, selected: false },
          { row: 6, selected: false },
          { row: 7, selected: false },
          { row: 8, selected: false },
          { row: 9, selected: false },
        ] },
        { column: 5, rows: [
          { row: 0, selected: false },
          { row: 1, selected: false },
          { row: 2, selected: false },
          { row: 3, selected: false },
          { row: 4, selected: false },
          { row: 5, selected: false },
          { row: 6, selected: false },
          { row: 7, selected: false },
          { row: 8, selected: false },
          { row: 9, selected: false },
        ] },
        { column: 6, rows: [
          { row: 0, selected: false },
          { row: 1, selected: false },
          { row: 2, selected: false },
          { row: 3, selected: false },
          { row: 4, selected: false },
          { row: 5, selected: false },
          { row: 6, selected: false },
          { row: 7, selected: false },
          { row: 8, selected: false },
          { row: 9, selected: false },
        ] },
        { column: 7, rows: [
          { row: 0, selected: false },
          { row: 1, selected: false },
          { row: 2, selected: false },
          { row: 3, selected: false },
          { row: 4, selected: false },
          { row: 5, selected: false },
          { row: 6, selected: false },
          { row: 7, selected: false },
          { row: 8, selected: false },
          { row: 9, selected: false },
        ] },
        { column: 8, rows: [
          { row: 0, selected: false },
          { row: 1, selected: false },
          { row: 2, selected: false },
          { row: 3, selected: false },
          { row: 4, selected: false },
          { row: 5, selected: false },
          { row: 6, selected: false },
          { row: 7, selected: false },
          { row: 8, selected: false },
          { row: 9, selected: false },
        ] },
        { column: 9, rows: [
          { row: 0, selected: false },
          { row: 1, selected: false },
          { row: 2, selected: false },
          { row: 3, selected: false },
          { row: 4, selected: false },
          { row: 5, selected: false },
          { row: 6, selected: false },
          { row: 7, selected: false },
          { row: 8, selected: false },
          { row: 9, selected: false },
        ] },
      ]
    }
  },
  methods: {
    activateInitialTiles(shipLength) {
      let startingTiles = this.boardData.map((c) => {
        if (c.column < shipLength){
          return c.rows[0];
        }
      }).filter(x => x);
      startingTiles.forEach(tile => tile.selected = true);
    },
    deactivateAllTiles() {
      this.boardData.forEach(c => c.rows.forEach(r => r.selected = false ));
    },
  },
  watch: {
    selectedShip: function (ship) {
      if (this.shipPlacementActive){
        this.activateInitialTiles(ship.length);
      } else {
        this.deactivateAllTiles();
      }
    },
    selectedTileCoordinates: {
      handler(coordinates) {
        this.deactivateAllTiles();
        let targettedTiles = [];
        if (coordinates.isHorizontal){
          this.boardData.forEach((c) => {
            if (c.column >= coordinates.x && c.column < coordinates.x + this.selectedShip.length){
              targettedTiles.push(c.rows[coordinates.y]);
            }
          })
        } else {
          this.boardData[coordinates.x].rows.forEach((r) => {
            if (r.row >= coordinates.y && r.row < coordinates.y + this.selectedShip.length) {
              targettedTiles.push(r);
            }
          });
        };
        targettedTiles.forEach(tile => tile.selected = true);
      },
      deep: true
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .board {
    display: flex;
    height: 350px;
    max-width: 25rem;
    margin-bottom: 3rem;
    margin-left: 1.5rem;
    
    .column {
      flex: 1;
      margin: 0;

      .row {
        margin: 0;
      }
    }
  }
</style>

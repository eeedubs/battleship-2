<template>
  <table class="board">
    <tr class="column" v-for="column in 10" :key="column">
      <td class="row" v-for="row in 10" :key="row">
        <ClickableTile 
          @toggled="toggleClickableTile(column, row)"
          :ref="`tile-${column}-${row}`"
          :isSelectedForShipPlacement="false"
          :isClickable="isClickable"
        />
      </td>
    </tr>
  </table>
</template>

<script>
import { ClickableTile } from './pieces/index';

export default {
  name: 'OpponentBoard',
  props: {},
  components: {
    ClickableTile,
  },
  data() {
    return {}
  },
  computed: {
    isClickable() {
      // returns true if it is the opponent's board, and the ships have all 
      // been placed
      this.shipPlacementComplete;
    },
  },
  methods: {
    toggleTile (column, row) {
      const targetTile = this.$refs[`tile-${column}-${row}`];
    },
    activateShipSelection(shipLength) {
      const startingTiles = [
        this.$refs[`tile-1-1`],
        this.$refs[`tile-2-1`],
        this.$refs[`tile-3-1`],
        this.$refs[`tile-4-1`],
        this.$refs[`tile-5-1`],
      ]
      startingTiles.forEach((tile) => { 
        tile.set('isSelectedForShipPlacement', true)
      });
    },
  },
  watch: {
    selectedShip: function (ship) {
      this.activateShipSelection(ship.length);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .board {
    display: flex;
    height: 350px;
    width: 25rem;
    margin-bottom: 3rem;
    margin-right: 1.5rem;
    
    .column {
      flex: 1;
      margin: 0;

      .row {
        margin: 0;
      }
    }

  }
</style>

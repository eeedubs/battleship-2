<template>
  <table class="board">
    <tr class="column" v-for="column in 10" :key="column">
      <td class="row" v-for="row in 10" :key="row">
        <drop>
          <GridPiece />
        </drop>
      </td>
    </tr>
  </table>
</template>

<script>
import GridPiece from './GridPiece';

export default {
  name: 'GamePort',
  props: {},
  components: {
    GridPiece,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .board {
    display: flex;
    width: 27rem;
    height: 23rem;
    background-color: lightsteelblue;

    .column {
      width: 10%;
      height: 100%;
      .row {
        margin: 0;
        width: 100%;
        height: 10%;
      }
    }
  }
</style>

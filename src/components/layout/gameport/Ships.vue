<template>
  <div class="ships">
    <div>
      <label for="carrier">Carrier</label>
      <img class="size-5" src="@/assets/5_carrier.png" />
      <label for="battleship">Battleship</label>
      <img class="size-4" src="@/assets/4_battleship.png" />
    </div>
    <div>
      <label for="destroyer">Destroyer</label>
      <img class="size-3" src="@/assets/3_destroyer.png" />
      <label for="cruiser">Cruiser</label>
      <img class="size-3" src="@/assets/3_cruiser.png" />
      <label for="submarine">Submarine</label>
      <img class="size-2" src="@/assets/2_submarine.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridPiece',
  props: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .ships {
    display: inline-block;
    padding: 2rem 0;
    width: 100%;
    justify-content: center;
    align-items: center; 
    div {
      display: inline-block;
      max-width: 100%;
      max-height: 100%;
      flex-direction: column;
      padding: 0.5rem 0;
      label {
        background-color: lightgreen;
        vertical-align: end;
      }
      img {
        display: inline-block;
        padding: 0 0.5rem;
        max-width: 100%;
        max-height: 100%;

        &.size-5 { width: 25%; }
        &.size-4 { width: 21%; }
        &.size-3 { width: 17%; }
        &.size-2 { width: 15%; }
      }
    }
  }
</style>

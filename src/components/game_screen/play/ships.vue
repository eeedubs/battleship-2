<template>
  <table class="ship-container">
    <tr class="ship" @click="shipClicked('carrier')">
      <label for="carrier">Carrier</label>
      <img src="@/assets/5_carrier.png" />
    </tr>
    <tr class="ship" @click="shipClicked('battleship')">
      <label for="battleship">Battleship</label>
      <img src="@/assets/4_battleship.png" />
    </tr>
    <tr class="ship" @click="shipClicked('destroyer')">
      <label for="destroyer">Destroyer</label>
      <img src="@/assets/3_destroyer.png" />
    </tr>
    <tr class="ship" @click="shipClicked('cruiser')">
      <label for="cruiser">Cruiser</label>
      <img src="@/assets/3_cruiser.png" />
    </tr>
    <tr class="ship" @click="shipClicked('submarine')">
      <label for="submarine">Submarine</label>
      <img src="@/assets/2_submarine.png" />
    </tr>
  </table>
</template>

<script>
export default {
  name: 'Ships',
  methods: {
    shipClicked(shipType) {
      this.$emit("shipClicked", shipType)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .ship-container {
    display: flex;
    flex-direction: column;
    .ship {
      display: flex;
      flex: 1;
      flex-direction: column;
      height: 3rem;
      margin-bottom: 1.2rem;
      label {
        display: block;
        text-align: center;
        background-color: #44b53e;
      }
      img {
        display: flex;
        padding: 0 0.5rem;
        flex: 1;
        height: 100%;
        max-width: 100%;
      }
    }
  }
</style>

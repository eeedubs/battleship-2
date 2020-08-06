<template>
  <table class="ship-container">
    <tr>
      <div class="ship-label">
        <button @click="shipClicked('carrier')">Carrier</button>
        <img src="@/assets/5_carrier.png" />
      </div>
      <span>Length: 5</span>
    </tr>
    <tr>
      <div class="ship-label">
        <button @click="shipClicked('battleship')">Battleship</button>
        <img src="@/assets/4_battleship.png" />
      </div>
      <span>Length: 4</span>
    </tr>
    <tr>
      <div class="ship-label">
        <button @click="shipClicked('destroyer')">Destroyer</button>
        <img src="@/assets/3_destroyer.png" />
      </div>
      <span>Length: 3</span>
    </tr>
    <tr>
      <div class="ship-label">
        <button @click="shipClicked('cruiser')">Cruiser</button>
        <img src="@/assets/3_cruiser.png" />
      </div>
      <span>Length: 3</span>
    </tr>
    <tr>
      <div class="ship-label">
        <button @click="shipClicked('submarine')">Submarine</button>
        <img src="@/assets/2_submarine.png" />
      </div>
      <span>Length: 2</span>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'ShipsPlacementPanel',
  props: {
    shipPlacementActive: { type: Boolean },
  },
  data() {
    return {}
  },
  methods: {
    shipClicked(shipType) {
      if (!this.shipPlacementActive) {
        this.$emit("shipClicked", shipType)
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .ship-container {
    display: flex;
    flex-direction: column;
    tr {
      display: flex;
      flex: 1;
      flex-direction: column;
      height: 1.5rem;
      width: 18.5rem;
      margin: 0 1rem 2rem;
      .ship-label {
        display: flex;
        button {
          display: block;
          font-size: 1.3rem;
          min-width: 8rem;
          max-height: 2rem;
          border-radius: 1.5rem;
          border: 1px solid black;
          background-color: lightgreen;
          margin: 0;
          &:active { border: 1px solid grey }
          &:focus { outline: none; }
        }
        img {
          display: flex;
          padding: 0 0.5rem;
          flex: 1;
          max-height: 2rem;
        }
      }

      span {
        text-align: left;
      }
    }
  }
</style>

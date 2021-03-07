<template>
  <table class="ship-container">
    <tr v-for="ship in ships" :key="ship.label">
      <div class="ship-font">
        <h4>{{ ship.label }}</h4>
        <span>Length: {{ ship.shipLength }}</span>
      </div>
      <div class="ship-graphics">
        <button v-if="!ship.placed" class="select-button" @click="selectShipForPlacement(ship.label)" :disabled="shipPlacementIsActive">Place</button>
        <button v-if="ship.placed" class="remove-button" @click="removeShip(ship.label)">Remove</button>
        <img :src="ship.image_url" />
      </div>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'Ships',
  props: {
    ships: { type: Array },
    shipPlacementIsActive: { type: Boolean },
  },
  data() {
    return {}
  },
  methods: {
    selectShipForPlacement(shipLabel) {
      if (!this.shipPlacementIsActive) {
        this.$emit("selectShipForPlacement", shipLabel);
      };
    },
    removeShip(shipLabel){
      this.$emit("removeShip", shipLabel);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .ship-container {
    display: flex;
    flex-direction: column;
    min-width: 100%;
    min-height: 100%;
    padding: 0 1rem;
    tr {
      display: flex;
      max-width: 85%;
      margin-left: 1rem;
      margin-bottom: 0.5rem;
      flex-direction: column;
      align-items: flex-start;
      .ship-font {
        display: flex;
        justify-content: space-between;
        width: 100%;
        span { 
          line-height: 2rem;
          margin-right: 2rem;
        }
      }
      .ship-graphics {
        display: flex;
        min-width: 100%;
        flex-direction: row;
        justify-content: space-between;
        button {
          display: block;
          font-size: 1.1rem;
          min-width: 6rem;
          max-height: 1.8rem;
          border: 1px solid black;
          margin: 0;
          &:active { border: 1px solid grey }
          &:focus { outline: none; }
          &.select-button { 
            background-color: #44b53e; 
            &:disabled { 
              background-color: lightgray; 
              opacity: 0.7; 
            };
          }
          &.remove-button { 
            background-color: crimson; 
            color: white;
          }
        }
        img {
          display: flex;
          padding: 0 0.5rem;
          max-height: 1.6rem;
          margin-right: 1rem;
        }
      }

      span {
        text-align: left;
      }
    }
  }
</style>

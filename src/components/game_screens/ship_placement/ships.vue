<template>
  <table class="ship-container">
    <tr v-for="ship in ships" :key="ship.label">
      <div class="ship-font">
        <h4>{{ ship.label }}</h4>
        <span>Length: {{ ship.length }}</span>
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
    height: 100%;
    background-color: lightgray;
    flex: 1;
    padding: 0 1rem;
    tr {
      display: flex;
      margin-bottom: 0.5rem;
      flex-direction: column;
      align-items: flex-start;
      .ship-font {
        background-color: white;
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
        background-color: white;
        width: 100%;
        button {
          display: block;
          font-size: 1.1rem;
          min-width: 6rem;
          max-height: 1.8rem;
          border-radius: 1.5rem;
          border: 1px solid black;
          margin: 0;
          &:active { border: 1px solid grey }
          &:focus { outline: none; }
          &.select-button { 
            background-color: lightgreen; 
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
          flex: 1;
          max-height: 1.6rem;
        }
      }

      span {
        text-align: left;
      }
    }
  }
</style>

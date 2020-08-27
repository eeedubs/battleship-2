<template>
  <div class="clickable">
    <button :class="{ 'active': selected, 'placed-upon': shipPlacedUpon }"></button>
  </div> 
</template>

<script>
export default {
  name: 'StaticTile',
  props: {
    selected: { type: Boolean },
    shipPlacedUpon: { type: Boolean },
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .clickable {
    display: flex;
    width: 2.7rem;
    height: 2.7rem;
    background-color: white;

    button {
      opacity: 0.7;
      display: flex;
      flex: 1;
      background-color: lightskyblue;

      &.active {
        background-color: lightgreen;
      }

      &.placed-upon {
        background-color: mediumslateblue;
      }

      &.active.placed-upon {
        background-color: red;
      }

      &:focus { outline: none; }
    }
  }
</style>

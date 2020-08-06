<template>
  <div>
    <div v-if="isClickable" class="clickable">
      <button @click="toggle" :class="{ 'active': isActive }"></button>
    </div> 
    <div v-if="!isClickable" 
      :class="{ 'non-clickable': true, 'isSelectedForShipPlacement': isSelectedForShipPlacement }">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tile',
  props: {
    isSelectedForShipPlacement: { type: Boolean },
    isClickable: { type: Boolean },
  },
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
      this.$emit('toggled');
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  div {
    display: flex;
    width: 2.2rem;
    height: 2.2rem;
    .clickable {
      display: flex;
      border-radius: 10px;
      background-color: lightskyblue;
      opacity: 70%;
      &:focus { outline: none; }

      &.active {
        background-color: lightcoral;
      }
    }

    .non-clickable {
      border: 1px solid blue;
      opacity: 30%;
      background-color: lightskyblue;
      &.isSelectedForShipPlacement {
        background-color: yellow;
      }
    }
  }
</style>

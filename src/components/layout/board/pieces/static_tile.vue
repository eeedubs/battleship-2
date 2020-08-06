<template>
  <div class="clickable">
    <button :class="{ 'active': selected }"></button>
  </div> 
</template>

<script>
export default {
  name: 'StaticTile',
  props: {
    selected: { type: Boolean },
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
    opacity: 70%;
    width: 2.2rem;
    height: 2.2rem;

    button {
      display: flex;
      flex: 1;
      background-color: lightskyblue;

      &.active {
        background-color: lightcoral;
      }

      &:focus { outline: none; }
    }
  }
</style>

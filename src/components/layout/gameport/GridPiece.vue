<template>
  <button>
  </button>
</template>

<script>
export default {
  name: 'GridPiece',
  props: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  button {
    display: flex;
    flex: 1;
    border-radius: 10px;
    background-color: lightslategray;
    opacity: 70%;
    &:focus {
      outline: none;
    }
  }
</style>

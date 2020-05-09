<template>
  <div class="container">
    <div class="game-view">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Container',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .container {
    display: flex;
    flex: auto;
    padding: 4rem;

    .game-view {
      flex: 1;
      background-color: white;
    }
  }
</style>

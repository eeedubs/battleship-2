<template>
  <main class="main">
  </main>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    display: flex;
    flex: 1;
    height: 90vh;
    width: 100%;
    background-color: red;
  }
</style>

<template>
  <main>
    <!-- <Window > -->
  </main>
</template>

<script>


export default {
  name: 'Dashboard',
  props: {},
  components: {
  },
  data() {
    return {
      data: {},
    }
  },
  methods: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 4rem;
    background-color: white;

    .container {
      display: flex;
      justify-content: center;
      background-color: white;
      font-family: 'Alto';
      padding-bottom: 1rem;
      min-width: 72rem;
      min-height: 36rem;
    }
  }
</style>

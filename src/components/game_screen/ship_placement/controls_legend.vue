<template>
  <div class="legend">
    <div class="icon-container">
      <unicon name="arrow-up" height="2rem" fill="white" class="icon" />
      <h4>Move down</h4>
    </div>
    <div class="icon-container">
      <unicon name="arrow-right" height="2rem" fill="white" class="icon" />
      <h4>Move right</h4>
    </div>
    <div class="icon-container">
      <unicon name="arrow-down" height="2rem" fill="white" class="icon" />
      <h4>Move down</h4>
    </div>
    <div class="icon-container">
      <unicon name="arrow-left" height="2rem" fill="white" class="icon" />
      <h4>Move left</h4>
    </div>
    <div class="icon-container">
      <unicon name="enter" height="2rem" fill="white" class="icon" />
      <h4>Place ship</h4>
    </div>
    <div class="icon-container">
      <small class="icon">esc</small>
      <h4>Deselect</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ControlsLegend',
  props: {},
  components: {
  },
  created() {
  },
  data() {
    return {
    }
  },
  computed: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .legend {
    display: flex;
    flex-direction: column;
    min-width: 100%;
    padding: 0 1rem;
    .icon-container {
      display: flex;
      align-items: center;
      margin-bottom: 0.25rem;
      margin-left: 2rem;

      .unicon, small {
        display: flex;
        flex: 1;
        color: white;
        font-size: 1rem;
        font-weight: bold;
        height: 2rem;
        max-width: 1.8rem;
        border: 1px solid black;
        border-radius: 0.35rem;
        background-color: black;
        justify-content: center;
      }

      h4 { margin-left: 1rem; }
    }
  }
</style>

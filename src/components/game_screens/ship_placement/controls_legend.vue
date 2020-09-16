<template>
  <div class="icon-container">
    <div>
      <unicon name="arrow-up" height="2rem" fill="white" class="icon" />
      <h4>Move down</h4>
    </div>
    <div>
      <unicon name="arrow-right" height="2rem" fill="white" class="icon" />
      <h4>Move right</h4>
    </div>
    <div>
      <unicon name="arrow-down" height="2rem" fill="white" class="icon" />
      <h4>Move down</h4>
    </div>
    <div>
      <unicon name="arrow-left" height="2rem" fill="white" class="icon" />
      <h4>Move left</h4>
    </div>
    <div>
      <unicon name="enter" height="2rem" fill="white" class="icon" />
      <h4>Place ship</h4>
    </div>
  <div>
    <small>esc</small>
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
  .icon-container {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    flex: 1;
    background-color: lightgray;
    div {
      display: flex;
      align-items: center;
      margin-bottom: 0.25rem;
      background-color: white;

      .icon {
        color: black;
        height: 2rem;
        border: 1px solid black;
        border-radius: 0.35rem;
        background-color: black;
      }

      small {
        color: white;
        font-weight: bold;
        font-size: 1rem;
        height: 2rem;
        width: 1.7rem;
        border: 1px solid black;
        border-radius: 0.35rem;
        background-color: black;
      }

      h4 { margin-left: 1rem; }
    }
  }
</style>

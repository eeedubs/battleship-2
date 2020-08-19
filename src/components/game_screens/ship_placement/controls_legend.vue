<template>
  <div class="icon-container">
    <div class="up">
      <b-icon icon='up-arrow-square' variant='black'></b-icon>
      <span></span>
    </div>
    <!-- <div class="right">
      <b-icon icon="arrow-right-square" class="icon" />
      <span></span>
    </div>
    <div class="down">
      <b-icon icon="arrow-down-square" class="icon" />
      <span></span>
    </div>
    <div class="left">
      <b-icon icon="arrow-left-square" class="icon" />
      <span></span>
    </div> -->
    <!-- <div class="down">
      <b-icon-arrow-down class="icon" />
      <span></span>
    </div> -->
  </div>
</template>

<script>
import {  BIconArrowUpSquare,
} from 'bootstrap-vue';

export default {
  name: 'ControlsLegend',
  props: {},
  components: {
    BIconArrowUpSquare
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
    flex: 1;
    flex-direction: column;
    .up, .right, .down, .left {
      display: flex;
      font-size: 3rem;
    }
    .icon {
      font-size: 3rem;
    }
  }
</style>

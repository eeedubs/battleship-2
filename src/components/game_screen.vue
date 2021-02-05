<template>
  <main>
    <Placement 
      v-if="!shipPlacementComplete" 
      @placementComplete="handlePlacementCompleteResponse"
    />
    <Play v-if="shipPlacementComplete" />
  </main>
</template>

<script>

import { Play } from './game_screen/play';
import { Placement } from './game_screen/placement';

export default {
  name: 'GameScreen',
  props: {},
  components: {
    Play,
    Placement,
  },
  data() {
    return {
      authenticated: false,
      shipPlacementComplete: true,
    }
  },
  methods: {
    handlePlacementCompleteResponse() {
      this.shipPlacementComplete = true;
    },
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
  }
</style>

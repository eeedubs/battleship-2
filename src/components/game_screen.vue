<template>
  <div class="page">
    <main>
      <ShipPlacement 
        v-if="!shipPlacementComplete" 
        @placementComplete="handlePlacementCompleteResponse"
      />
      <PlayGame v-if="shipPlacementComplete" />
    </main>
  </div>
</template>

<script>

import { PlayGame, ShipPlacement } from './game_screen/index';

export default {
  name: 'GameScreen',
  props: {},
  components: {
    PlayGame,
    ShipPlacement,
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
  }
</style>

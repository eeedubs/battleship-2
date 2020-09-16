<template>
  <div class="clickable">
    <button @click="toggle" :class="{ 'active': isActive }"></button>
  </div> 
</template>

<script>
export default {
  name: 'ClickableTile',
  props: {
    isSelected: { type: Boolean },
  },
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
      this.$emit('toggled');
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .clickable {
    display: flex;
    opacity: 0.7;
    width: 2.2rem;
    height: 2.2rem;

    &.active {
      background-color: lightcoral;
    }

    button {
      display: flex;
      flex: 1;
      background-color: lightskyblue;

      &:focus { outline: none; }
    }
  }
</style>

<template>
  <div :class="$style.root">
    {{ title }}
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  computed: {
  },
};
</script>

<style module>
  .root {
    border: 1px solid black;
    box-sizing: border-box;
    padding: 5px;
    margin: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<template>
  <div :class="computedClasses" :style="{ backgroundColor: color }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    cubicId: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      default: 'transparent',
    },
    tags: {
      type: Array,
      default: () => ([]),
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  computed: {
    computedClasses() {
      return {
        [this.$style.root]: true,
      };
    },
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

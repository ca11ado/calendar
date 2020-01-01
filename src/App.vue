<template>
  <div :class="$style.calendar">
    <x-cubic
      v-for="cubicId in 4*12*80"
      :cubic-id="cubicId"
      :title="getTitle(cubicId)"
      :key="cubicId"
    /> 
  </div>
</template>

<script>
import XCubic from 'blocks/x-cubic/x-cubic.vue';

export default {
  components: {
    XCubic
  },
  props: {
  },
  data() {
    return {
      
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    getTitle(cubicId) {
      return String(Math.floor(cubicId / (4*12)) + 1);
    },
  },
};
</script>

<style module>
  .calendar {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-between;
  }
</style>

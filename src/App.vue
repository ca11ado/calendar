<template>
  <div :class="$style.root">
    <x-calendar 
      :date-from="new Date('03.25.1989')"
      :date-to="new Date('03.25.2069')"
      date-interval="week"
    />
  </div>
</template>

<script>
import XCalendar from 'blocks/x-calendar/x-calendar.vue';

export default {
  components: {
    XCalendar,
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
  .root {
    display: block;
  }
</style>

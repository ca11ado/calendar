<template>
  <div :class="$style.root">
    <x-calendar 
      :date-from="new Date('03.25.1989')"
      :date-to="new Date('03.25.2069')"
      date-interval="week"
    />
    <div :class="$style.description">
      <h3>Legend:</h3>
      <ul>
      <li v-for="event in events">
        <span :style="{ color: getColor(event.title) }">
          {{ event.title }}
        </span>
      </li>
      </ul>
    </div>
  </div>
</template>

<script>
import db from './db';
import XCalendar from 'blocks/x-calendar/x-calendar.vue';
import { getRandomColor } from 'utils/color';

export default {
  components: {
    XCalendar,
  },
  props: {
  },
  data() {
    return {
      events: db,      
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
    getColor(id) {
      return getRandomColor(id);
    },
  },
};
</script>

<style module>
  .root {
    display: flex;
  }

  .description {
    padding: 20px;
    color: white;
  }
</style>

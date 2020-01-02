<template>
  <div :class="$style.root">
    <x-cubic
      v-if="calendarFrom && calendarTo && calendarStep"
      cubic-id="root"
      :from="calendarFrom"
      :to="calendarTo"
      :step="calendarStep"
      color="white"
      :class="$style.calendar"
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
import moment from 'moment';
import { mapState, mapActions } from 'vuex';
import { calendar as dbCalendar, events as dbEvents } from './db';
import XCubic from 'blocks/x-cubic/x-cubic.vue';
import { getRandomColor } from 'utils/color';

export default {
  components: {
    XCubic,
  },
  props: {
  },
  data() {
    return {
      events: dbEvents,      
    };
  },
  computed: {
    ...mapState('calendar', {
      stateEvents: 'events',
      calendarFrom: 'from',
      calendarTo: 'to',
      calendarStep: 'step',
    }),
  },
  mounted() {
    this.setCalendar({
      from: moment(dbCalendar.from),
      to: moment(dbCalendar.to),
      step: dbCalendar.step,
    });

    this.addEvents(
      dbEvents.map(event =>
        Object.assign({}, event, {
          from: moment(event.from),
          to: moment(event.to)
        }),
      ),
    );
  },
  methods: {
    getTitle(cubicId) {
      return String(Math.floor(cubicId / (4*12)) + 1);
    },
    getColor(id) {
      return getRandomColor(id);
    },
    ...mapActions('calendar',
      ['setCalendar', 'addEvents'],
    ),
  },
};
</script>

<style module>
  :global(body) {
    background: black;
  }

  .root {
    display: flex;
  }

  .calendar {
    max-width: 70%;
  }

  .description {
    padding: 20px;
    color: white;
  }
</style>

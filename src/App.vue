<template>
  <div :class="$style.root">
    <x-menu @active="active = $event"/>
    <div v-if="active === 'calendar'" :class="$style.content">
      <x-cubic
        v-if="calendarFrom && calendarTo && calendarStep"
        cubic-id="root"
        :from="calendarFrom"
        :to="calendarTo"
        :step="calendarStep"
        color="white"
        :class="$style.calendar"
      />

      <x-legend />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState, mapActions } from 'vuex';
import { calendar as dbCalendar, events as dbEvents } from './db';
import XCubic from 'blocks/x-cubic/x-cubic.vue';
import XMenu from 'blocks/x-menu/x-menu.vue';
import XLegend from 'blocks/x-legend/x-legend.vue';

export default {
  components: {
    XCubic,
    XLegend,
    XMenu,
  },
  props: {
  },
  data() {
    return {
      events: dbEvents,      
      active: false,
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

  .content {
    display: flex;
  }

  .calendar {
    max-width: 70%;
  }
</style>

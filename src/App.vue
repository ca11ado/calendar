<template>
  <div :class="$style.root">
    <x-menu :items="menuItems" :active="menuActive" />
    <div v-show="menuActive === 'calendar'" :class="$style.content">
      <x-cubic
        v-if="calendarFrom && calendarTo && calendarStep"
        cubic-id="root"
        :from="calendarFrom"
        :to="calendarTo"
        :step="calendarStep"
        color="white"
        :class="{
          [$style.calendar]: true,
          [$style.yearInMonthRow]: calendarStep === 'month',
          [$style.yearInWeeksRow]: calendarStep === 'week',
        }"
      />
      <x-legend />
    </div>
    <div v-if="menuActive === 'controls'">
      <x-controls />
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
import XControls from 'blocks/x-controls/x-controls.vue';

export default {
  components: {
    XCubic,
    XLegend,
    XMenu,
    XControls,
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
    ...mapState('menu', {
      menuItems: 'items',
      menuActive: 'active',
    }),
  },
  mounted() {
    this.setCalendar({
      from: moment(dbCalendar.from),
      to: moment(dbCalendar.to),
      step: dbCalendar.step,
    });

    this.addEvents(
      dbEvents
        .filter(event => event.tags.includes('travel'))
        .map(event =>
          Object.assign({}, event, {
            from: moment(event.from),
            to: moment(event.to)
          }),
        ),
    );

    this.addEvents(
      dbEvents
        .filter(event => event.tags.includes('work'))
        .map(event =>
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
    max-width: 90%;
  }

  .yearInMonthRow {
    width: 206px;
  }

  .yearInWeeksRow {
    width: 894px;
  }
</style>

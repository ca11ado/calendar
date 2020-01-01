<template>
  <div :class="$style.root">
    <x-cubic
      v-for="{ id, title, color, hasMargin } in cubics"
      :key="id"
      :cubic-id="id"
      :color="color"
      :class="$style.root"
    >
    </x-cubic>
  </div>
</template>

<script>
import capitalize from 'lodash/capitalize';
import moment from 'moment';
import XCubic from 'blocks/x-cubic/x-cubic.vue';

const intervalsValue = interval => ['none', 'week', 'day', 'year'].includes(interval);

export default {
  components: {
    XCubic,
  },
  props: {
    dateFrom: {
      type: Date,
      required: true,
    },
    dateTo: {
      type: Date,
      default: '01.01.1900',
    },
    dateInterval: {
      type: String,
      default: 'week',
      validator: intervalsValue,
    },

    highlightIntervals: {
      type: String,
      default: 'none',
      validator: intervalsValue,
    },
  },
  data() {
    const cubics = () => {
      const momentMethod = `as${capitalize(this.dateInterval)}s`;
      const count = Math.ceil(moment.duration(this.dateTo - this.dateFrom)[momentMethod]());
      return new Array(count)
        .fill(1)
        .map((v, index) => ({ id: index + 1, title: index + 1 }));
    };

    return {
      cubics: cubics(),
    };
  },
  mounted() {
    setTimeout(() => {
      this.addEvent(
        new Date('01.01.2000'),
        new Date('03.01.2000'),
        'blue',
        'Пробное событие',
      );
    }, 2000);
  },
  methods: {
    addEvent(dateFrom, dateTo, color, title, tags, description) {
      // todo make global
      const findStartId = (interval, dateCalendarFrom, dateEvent) => {
        const momentMethod = `as${capitalize(interval)}s`;
        const intervalMs = dateEvent - dateCalendarFrom;
        return Math.floor(moment.duration(intervalMs)[momentMethod]());
      }; 

      const findEndId = (interval, dateCalendarTo, dateEventTo) => {
        const momentMethod = `as${capitalize(interval)}s`;
        const intervalMs = dateCalendarTo - dateEventTo;
        return Math.ceil(moment.duration(intervalMs)[momentMethod]());
      }; 

      const eventStartId = findStartId(this.dateInterval, this.dateFrom, dateFrom);
      // const eventEndId = findEndId(this.dateInterval, this.dateTo, dateTo);
      const eventEndId = findStartId(this.dateInterval, this.dateFrom, dateTo);

      this.cubics = this.cubics
        .map(cubic => {
          return cubic.id > eventStartId && cubic.id < eventEndId
            ? Object.assign({}, cubic, { color })
            : cubic;
        })
    },
  },
};
</script>

<style module>
  .root {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: flex-start;
  }
</style>

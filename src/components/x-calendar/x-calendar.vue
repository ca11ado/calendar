<template>
  <div :class="$style.root">
    <x-cubic
      v-for="{ id, title } in cubics"
      :key="id"
      :cubic-id="id"
      :class="$style.root"
    >
      {{ title }}
    </x-cubic>
  </div>
</template>

<script>
import capitalize from 'lodash/capitalize';
import moment from 'moment';
import XCubic from 'blocks/x-cubic/x-cubic.vue';

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
      validator(interval) {
        return ['none', 'week', 'day', 'year'].includes(interval);
      },
    },
  },
  data() {
    const cubics = () => {
      const momentMethod = `as${capitalize(this.dateInterval)}s`;
      const count = Math.ceil(moment.duration(this.dateTo - this.dateFrom)[momentMethod]());
      const cb = new Array(count)
        .fill(1)
        .map((v, index) => ({ id: index + 1, title: index + 1 }));
      return cb;
    };

    return {
      cubics: cubics(),
    };
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

<template>
  <div
    :class="computedClasses"
    :style="{ backgroundColor: color }"
    :title="componentTitle"
  >
    <x-cubic
      v-if="cubics.length"
      v-for="cubic in cubics"
      :key="`22222_${cubic.cubicId}`"
      :cubic-id="`22222_${cubic.cubicId}`"
      :from="cubic.from"
      :to="cubic.to"
    />
    <slot v-else></slot>
  </div>
</template>

<script>
import flow from 'lodash/flow';
import tap from 'lodash/fp/tap';
import map from 'lodash/map';
import moment from 'moment';
import capitalize from 'lodash/capitalize';
import { isStepAllowed } from 'utils/date';

const DATE_FORMAT = 'DD.MM.YYYY';

export default {
  name: 'x-cubic',
  components: {
  },
  props: {
    cubicId: {
      type: String,
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
    from: {
      type: [Boolean, Date, moment],
      default: false,
    },
    to: {
      type: [Boolean, Date, moment],
      default: false,
    },
    step: {
      type: String,
      default: 'none',
      validator: isStepAllowed,
    },
  },
  data() {
    return {};
  },
  computed: {
    componentTitle() {
      return this.from && this.to && this.from.format
        ? `${this.from.format(DATE_FORMAT)} : ${this.to.format(DATE_FORMAT)}`
        : false;
    },
    computedClasses() {
      return {
        [this.$style.root]: true,
      };
    },
    stepsCount() {
      if (!this.to || !this.from) return 0;
      if (this.step === 'none') return 0;

      const duration = this.to - this.from;
      return this.getStepsCountFromMs(this.step, duration);
    },
    cubics() {
      if (!this.stepsCount) return [];

      return map(Array(this.stepsCount), (gap, stepNumber) => {
        const from = flow(
          this.addStepsToDate.bind(null, this.from, this.step, stepNumber),
          this.getToTheStartofStep.bind(null, this.step),
        )();
        const to = this.getToTheEndOfStep(this.step, from); 
        return {
          cubicId: `${this.cubicId}_${stepNumber}`,
          from,
          to,
          fromString: from.format(DATE_FORMAT),
          toString: to.format(DATE_FORMAT),
        };
      });
    },
  },
  methods: {
    getStepsCountFromMs(step, duration) {
      const momentMethod = `as${capitalize(step)}s`;
      return Math.ceil(moment.duration(duration)[momentMethod]());
    },
    addStepsToDate(date, step, count) {
      return moment(date).add(count, step);
    },
    getToTheStartofStep(step, date) {
      return moment(date).startOf(step);
    },
    getToTheEndOfStep(step, date) {
      return moment(date).endOf(step);
    },
  },
  mounted() {
    /*
    if (this.cubics.length) {
      console.log('%c custom log', 'color:red;', this.cubics);
    }
    */
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
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>

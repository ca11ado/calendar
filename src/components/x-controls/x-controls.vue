<template>
  <div :class="$style.root">
    <x-export />
    <h3>Calendar preferences</h3>
    <form
      ref="formCalendar"
      :class="$style.form"
      @submit.prevent="submitCalendarForm"
    >
      <label>
        <span>From:</span>
        <input
          v-model="from"
          type="date"
          name="from"
        >
      </label>
      <label>
        <span>To:</span>
        <input
          v-model="to"
          type="date"
          name="to"
        >
      </label>
      <label>
        <span>Step:</span>
        <select name="step">
          <option v-for="possibleStep in steps" :selected="step">
            {{ possibleStep }}
          </option>
        </select>
      </label>
      <label>
        <input
          type="submit"
          value="Submit"
        >
      </label>
    </form>
    <h3>Add event</h3>
    <form
      ref="form"
      @submit.prevent="submit"
      :class="$style.form"
    >
      <label>
        <span>From date</span>
        <input type="date" name="from">
      </label>
      <label>
        <span>To date</span>
        <input type="date" name="to">
      </label>
      <label>
        <span>Title</span>
        <input name="title">
      </label>
      <label>
        <span>Tags</span>
        <select name="tags">
          <option v-for="tag in tags">
            {{ tag }}
          </option>
        </select>
      </label>
      <label>
        <span>Description</span>
        <input name="description">
      </label>
      <label>
        <input
          type="submit"
          value="submit"
          @blur="submitBlur"
        >
      </label>
    </form>
    <div v-if="successMessage" :class="$style.success">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" :class="$style.error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import map from 'lodash/map';
import compact from 'lodash/compact';
import { mapState, mapActions, mapGetters } from 'vuex';
import XExport from 'blocks/x-export/x-export.vue';

const FORM_DATE_FORMAT = 'YYYY-MM-DD';

export default {
  components: {
    XExport,
  },
  props: {
  },
  data() {
    return {
      errorMessage: '',
      successMessage: '',
      calendarErrorMessage: '',
      calendarSuccessMessage: '',

      newFrom: '',
      newTo: '',
      newStep: '',
    };
  },
  computed: {
    from: {
      get() {
        if (!this.$store.state.calendar.from) return '';
        return this.$store.state.calendar.from.format(FORM_DATE_FORMAT);
      },
      set(value) {
        this.newFrom = value;
      },
    },
    to: {
      get() {
        if (!this.$store.state.calendar.to) return '';
        return this.$store.state.calendar.to.format(FORM_DATE_FORMAT);
      },
      set(value) {
        this.newTo = value;
      },
    },
    step: {
      get() {
        if (!this.$store.state.calendar.step) return '';
        return this.$store.state.calendar.step;
      },
      set(value) {
        // todo set and v-model for select
      },
    },
    ...mapState('calendar', [
      'steps',
    ]),
    ...mapGetters('calendar', [
      'tags',
    ]),
  },
  methods: {
    submitCalendarForm(e) {
      const formData = new FormData(e.target);
      const values = [...formData.values()];
      // todo checks for big dates range or wrong range
      if (values.length !== compact(values).length) {
        this.calendarErrorMessage = 'Please, fill all fields';
        return;
      }

      const eventObj = {};
      Array.from(formData.entries(), ([key, value]) =>
        Object.assign(eventObj, { [key]: value })
      );
      const normalizedObj = Object.assign({}, eventObj, {
        tags: [eventObj.tags],
        from: moment(eventObj.from),
        to: moment(eventObj.to),
      });

      try {
        // this.addEvents([normalizedObj]);
        this.updateCalendar({
          from: this.newFrom && moment(this.newFrom),
          to: this.newTo && moment(this.newTo),
          step: this.newStep && moment(this.newStep),
        });
      } catch(e) {
        this.calendarErrorMessage = 'Произошла неопознанная ошибка';
        throw Error(e);
      }
      this.calendarSuccessMessage = 'Событие успешно добавлено'
      this.$refs.form.reset();
    },
    submitBlur() {
      this.errorMessage = '';
      this.calendarErrorMessage = '';
      this.calendarSuccessMessage = '';
      this.successMessage = '';
    },
    submit(e) {
      const formData = new FormData(e.target);
      const values = [...formData.values()];
      if (values.length !== compact(values).length) {
        this.errorMessage = 'Please, fill all fields';
        return;
      }

      const eventObj = {};
      Array.from(formData.entries(), ([key, value]) =>
        Object.assign(eventObj, { [key]: value })
      );
      const normalizedObj = Object.assign({}, eventObj, {
        tags: [eventObj.tags],
        from: moment(eventObj.from),
        to: moment(eventObj.to),
      });

      try {
        this.addEvents([normalizedObj]);
      } catch(e) {
        this.errorMessage = 'Произошла неопознанная ошибка';
        throw Error(e);
      }
      this.successMessage = 'Событие успешно добавлено'
      this.$refs.form.reset();
    },
    ...mapActions('calendar',
      ['setCalendar', 'updateCalendar', 'addEvents'],
    ),
  },
};
</script>

<style module>
  .root {
    display: block;
    color: white;
  }

  .form {
    display: flex;
    flex-direction: column;
  }

  .form > label {
    display: flex;
  }

  .form > label + label {
    margin-top: 6px;
  }

  input[type=submit] {
    margin-top: 20px;
    height: 40px;
    border: none;
    margin: 0;
    margin-top: 10px;
  }

  label > span {
    min-width: 200px;
  }

  label > select,
  label > input {
    width: 100%;
    margin: 0 10px;
  }

  .success,
  .error {
    margin-top: 10px;
  }

  .success {
    color: green;
  }

  .error {
    color: red;
  }
</style>

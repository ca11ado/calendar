<template>
  <div :class="$style.root">
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
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
  },
  props: {
  },
  data() {
    return {
      errorMessage: '',
      successMessage: '',
    };
  },
  computed: {
    ...mapGetters('calendar', ['tags']),
  },
  mounted() {
    window.tmap = map;
  },
  methods: {
    submitBlur() {
      this.errorMessage = '';
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
      ['setCalendar', 'addEvents'],
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

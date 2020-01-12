<template>
  <div :class="$style.root">
    Export file
    <button @click.prevent="download" :disabled="isProcessed">
      Download
    </button>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import { exportToCsv } from 'utils/export-to-csv';

const FORM_DATE_FORMAT = 'YYYY-MM-DD';

export default {
  components: {
  },
  props: {
  },
  data() {
    return {
      isProcessed: false,
    };
  },
  computed: {
    ...mapState('calendar', ['events']),
  },
  methods: {
    download(e) {
      this.isProcessed = true;

      const columns = ['From', 'To', 'Title', 'Description'];
      const rows =  this.events.map(({ from, to, title, description }) =>
        [
          moment(from).format(FORM_DATE_FORMAT),
          moment(to).format(FORM_DATE_FORMAT),
          title,
          `"${description}"`
        ]
      );
      exportToCsv('Events', [columns, ...rows]);

      this.isProcessed = false;
    },
  },
};
</script>

<style module>
  .root {
    display: block;
  }
</style>

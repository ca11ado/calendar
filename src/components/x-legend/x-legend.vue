<template>
  <div :class="$style.root">
    <h4>Legend:</h4>
      <ul>
        <li
          v-for="tag in tags"
          :class="$style.tag"
          :style="{ color: getColor(tag) }"
        >{{ tag }}</li>
      </ul>
    <!--
    <ul>
    <li v-for="event in events">
      <span :style="{ color: getColor(event.tags[0]) }">
        {{ event.title }}
      </span>
    </li>
    </ul>
    -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getRandomColor } from 'utils/color';

export default {
  components: {
  },
  props: {
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('calendar', ['events']),
    ...mapGetters('calendar', ['tags']),
  },
  methods: {
    getColor(id) {
      return getRandomColor(id);
    },
  },
};
</script>

<style module>
  .root {
    padding: 20px;
    color: white;
  }

  .root h4,
  .root ul {
    margin: 5px;
  }

  .tags > .tag + .tag {
    margin-left: 4px;
  }

  .tag {
    text-decoration: underline;
  }
</style>

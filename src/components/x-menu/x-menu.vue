<template>
  <div :class="$style.root">
    <span
      v-for="item in items"
      :class="computedClass(item)"
      @click="select(item)"
    >{{ item }}</span>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  components: {
  },
  props: {
    items: Array,
    active: String,
  },
  methods: {
    ...mapActions('menu', {
      select: 'setActive',
    }),
    computedClass(item) {
      return {
        [this.$style.menu]: true,
        [this.$style.activeMenu]: item === this.active,
      };
    },
  },
};
</script>

<style module>
  .root {
    display: block;
    color: white;
    border: 1px solid white;
    padding: 4px 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .root > .menu + .menu {
    margin-left: 4px;
  }

  .activeMenu {
    text-decoration: underline;
  }
</style>

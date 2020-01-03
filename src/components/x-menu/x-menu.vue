<template>
  <div :class="$style.root">
    <span
      v-for="item in menu"
      :class="computedClass(item)"
      @click="select(item)"
    >
      {{ item }}
    </span>
  </div>
</template>

<script>


export default {
  components: {
  },
  props: {
  },
  data() {
    return {
      activeMenu: 'calendar',
      menu: ['calendar', 'controls'],
    };
  },
  mounted() {
    this.$emit('acitve', this.activeMenu);
  },
  methods: {
    select(menuName) {
      this.activeMenu = menuName;
      this.$emit('active', menuName);
    },
    computedClass(item) {
      return {
        [this.$style.menu]: true,
        [this.$style.activeMenu]: item === this.activeMenu,
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
    color: red;
  }
</style>

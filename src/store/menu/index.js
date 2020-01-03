export default {
  namespaced: true,
  state: {
    items: ['calendar', 'controls'],
    active: 'calendar',
  },
  actions: {
    setActive({ commit }, item) {
      commit('active', item);
    },
  },
  mutations: {
    active(state, item) {
      state.active = item;
    },
  },
};

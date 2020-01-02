export default {
  namespaced: true,
  state: {
    events: [],
    from: null,
    to: null,
    step: null,
  },
  actions: {
    setCalendar({ commit }, { from, to, step }) {
      commit('setFrom', from);
      commit('setTo', to);
      commit('setStep', step);
    },
    addEvent({ commit }, event) {
      commit('addEvent', event);
    },
  },
  mutations: {
    setFrom(state, payload) {
      state.from = payload;
    },
    setTo(state, payload) {
      state.to = payload;
    },
    setStep(state, payload) {
      state.step = payload;
    },
    addEvent(state, event) {
      state.push(event);
    },
  },
  getters: {
  },
};

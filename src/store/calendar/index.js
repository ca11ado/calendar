const steps = ['day', 'week', 'month', 'year'];

export default {
  namespaced: true,
  state: {
    events: [],
    from: null,
    to: null,
    step: steps[steps.length - 1],
    steps,
  },
  actions: {
    setCalendar({ commit }, { from, to, step }) {
      commit('setFrom', from);
      commit('setTo', to);
      commit('setStep', step);
    },
    updateCalendar({ commit }, { from, to, step }) {
      if (from) commit('setFrom', from);
      if (to) commit('setTo', to);
      if (step) commit('setStep', step);
    },
    addEvents({ commit }, events) {
      commit('addEvents', events);
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
    addEvents(state, events) {
      state.events = [...state.events, ...events];
    },
  },
  getters: {
    tags: (state) => {
      const uniq = (value, index, self) => self.indexOf(value) === index;
      return state.events
        .map(({ tags }) => tags)
        .reduce((accum, tags) => [...accum, ...tags], [])
        .filter(uniq);
    },
  },
};

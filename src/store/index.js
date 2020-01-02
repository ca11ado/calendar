import Vue from 'vue';
import Vuex from 'vuex';
import calendarModule from 'store/calendar';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    calendar: calendarModule,
  },
});

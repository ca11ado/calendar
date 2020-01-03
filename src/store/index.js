import Vue from 'vue';
import Vuex from 'vuex';
import calendarModule from 'store/calendar';
import menuModule from 'store/menu';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    calendar: calendarModule,
    menu: menuModule,
  },
});

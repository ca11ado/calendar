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

if (module.hot) {
  // accept actions and mutations as hot modules
  module.hot.accept(['./calendar', './menu'], () => {
    const newCalendarModule = require('./calendar').default;
    const newMenuModule = require('./menu').default;
    // swap in the new modules and mutations
    store.hotUpdate({
      modules: {
        calendar: calendarModule,
        menu: menuModule,
      }
    })
  })
}

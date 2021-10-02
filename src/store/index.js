import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const mutations = {
  showDialog: (state) => {
    state.dialogShown = true;
    return state;
  },

  hideDialog: (state) => {
    state.dialogShown = false;
    return state;
  },
};

export default new Vuex.Store({
  state: {
    dialogShown: false,
    itemsPerPage: 5,
    currentPage: 0,
  },
  mutations,
});

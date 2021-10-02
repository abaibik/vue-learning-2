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
  },

  setCurrentPage: (state, pageNumber) => {
    if (pageNumber < 0 || pageNumber > getters.pageCount(state) - 1) {
      return;
    }
    state.currentPage = pageNumber;
  },

  jumpPrevPage: (state) => {
    if (state.currentPage > 0) {
      state.currentPage--;
    }
  },

  jumpNextPage: (state) => {
    if (state.currentPage < getters.pageCount(state) - 1) {
      state.currentPage++;
    }
  },
};

export const getters = {
  pageCount: (state) => {
    return Object.keys(state.expences).length;
  },
};

export default new Vuex.Store({
  state: {
    dialogShown: false,
    currentPage: 0,
    expences: { page0: [] },
  },
  mutations,
  getters,
});

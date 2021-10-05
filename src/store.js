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

  addCost: (state, cost) => {
    const lastPageNumber = getters.pageCount(state) - 1;
    const lastPage = state.expences[`page${lastPageNumber}`];
    if (lastPage.length < 5) {
      lastPage.push(cost);
    } else {
      // https://vuejs.org/v2/guide/reactivity.html#For-Objects
      Vue.set(state.expences, `page${lastPageNumber + 1}`, [cost]);
    }
  },
};

export const getters = {
  currentPageItems: (state) => {
    return state.expences[`page${state.currentPage}`];
  },
  pageCount: (state) => {
    return Object.keys(state.expences).length;
  },
};

export const actions = {
  async fetchData(context) {
    const response = await fetch(
      "https://gist.githubusercontent.com/abaibik/ee8f5f9e6819f41899359f7a4a1f4c6e/raw/49bd90890c95e44a179ce89a96db84710dfd02fd/expences.json"
    );
    const json = await response.json();
    for (const page in json) {
      for (const cost of json[page]) {
        const item = {
          category: cost.category,
          value: cost.value,
          date: new Date(cost.date),
        };
        context.commit("addCost", item);
      }
    }
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
  actions,
});

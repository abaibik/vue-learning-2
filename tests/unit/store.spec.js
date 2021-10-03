import { mutations, getters, actions } from "@/store";
const {
  showDialog,
  hideDialog,
  setCurrentPage,
  jumpPrevPage,
  jumpNextPage,
  addCost,
} = mutations;
const { pageCount, currentPageItems } = getters;
const { fetchData } = actions;

describe("Store", () => {
  it("showDialog", () => {
    const state = { dialogShown: false };
    showDialog(state);
    expect(state.dialogShown).toBe(true);
  });

  it("hideDialog", () => {
    const state = { dialogShown: true };
    hideDialog(state);
    expect(state.dialogShown).toBe(false);
  });

  it("setCurrentPage", () => {
    const state = { currentPage: 1, expences: { page0: [], page1: [] } };
    setCurrentPage(state, 0);
    expect(state.currentPage).toBe(0);
  });

  it("setCurrentPage does nothing when pageNumber < 0", () => {
    const state = { currentPage: 1 };
    setCurrentPage(state, -2);
    expect(state.currentPage).toBe(1);
  });

  it("setCurrentPage does nothing when currentPage is the last page", () => {
    const state = { currentPage: 1, expences: { page0: [], page1: [] } };
    setCurrentPage(state, 2);
    expect(state.currentPage).toBe(1);
  });

  it("jumpPrevPage", () => {
    const state = { currentPage: 2 };
    jumpPrevPage(state);
    expect(state.currentPage).toBe(1);
  });

  it("jumpPrevPage does nothing when currentPage = 0", () => {
    const state = { currentPage: 0 };
    jumpPrevPage(state);
    expect(state.currentPage).toBe(0);
  });

  it("jumpNextPage", () => {
    const state = { currentPage: 0, expences: { page0: [], page1: [] } };
    jumpNextPage(state);
    expect(state.currentPage).toBe(1);
  });

  it("jumpNextPage does nothing when currentPage is the last page", () => {
    const state = { currentPage: 1, expences: { page0: [], page1: [] } };
    jumpNextPage(state);
    expect(state.currentPage).toBe(1);
  });

  it("pageCount", () => {
    const state = { expences: { page0: [], page1: [] } };
    expect(pageCount(state)).toBe(2);
  });

  it("addCost when no expences", () => {
    const state = { expences: { page0: [] } };
    const newCost = {
      date: new Date("2021-09-03T00:00:00.000Z"),
      category: "cats",
      value: "40",
    };
    addCost(state, newCost);
    expect(state.expences.page0).toStrictEqual([newCost]);
  });

  it("addCost to second page", () => {
    const oldCost = {
      date: new Date("2020-10-03T00:00:00.000Z"),
      category: "dogs",
      value: "1",
    };
    const state = {
      expences: {
        page0: [],
        page1: [oldCost],
      },
    };
    const newCost = {
      date: new Date("2021-09-03T00:00:00.000Z"),
      category: "cats",
      value: "40",
    };
    addCost(state, newCost);
    expect(state.expences.page1).toStrictEqual([oldCost, newCost]);
  });

  it("addCost creates a new page", () => {
    const oldCost = {
      date: new Date("2020-10-03T00:00:00.000Z"),
      category: "dogs",
      value: "1",
    };
    const state = {
      expences: {
        page0: [oldCost, oldCost, oldCost, oldCost, oldCost],
      },
    };
    const newCost = {
      date: new Date("2021-09-03T00:00:00.000Z"),
      category: "cats",
      value: "40",
    };
    addCost(state, newCost);
    expect(state.expences.page1).toStrictEqual([newCost]);
  });

  it("currentPageItems", () => {
    const oldCost = {
      date: new Date("2020-10-03T00:00:00.000Z"),
      category: "dogs",
      value: "1",
    };
    const state = {
      currentPage: 1,
      expences: {
        page0: [],
        page1: [oldCost],
      },
    };
    expect(currentPageItems(state)).toStrictEqual([oldCost]);
  });

  it("fetchData", async () => {
    const context = {
      commit: jest.fn(),
    };

    const cost1 = {
      date: new Date("2020-10-03T00:00:00.000Z"),
      category: "dogs",
      value: "1",
    };
    const cost2 = {
      date: new Date("2020-10-03T00:00:00.000Z"),
      category: "cats",
      value: "40",
    };

    global.fetch = jest.fn(async () => {
      return {
        json: async () => {
          return { page1: [cost1], page2: [cost2] };
        },
      };
    });

    await fetchData(context);
    expect(global.fetch).toHaveBeenCalled();
    expect(context.commit).toHaveBeenCalledTimes(2);
    expect(context.commit.mock.calls[0]).toEqual(["addCost", cost1]);
    expect(context.commit.mock.calls[1]).toEqual(["addCost", cost2]);

    delete global.fetch;
  });
});

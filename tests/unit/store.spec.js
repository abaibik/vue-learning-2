import { mutations } from "@/store";
const { showDialog, hideDialog, setCurrentPage, jumpPrevPage, jumpNextPage } =
  mutations;

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
    const state = { currentPage: 1 };
    setCurrentPage(state, 2);
    expect(state.currentPage).toBe(2);
  });

  it("setCurrentPage does nothing when pageNumber < 0", () => {
    const state = { currentPage: 1 };
    setCurrentPage(state, -2);
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
    const state = { currentPage: 1 };
    jumpNextPage(state);
    expect(state.currentPage).toBe(2);
  });
});

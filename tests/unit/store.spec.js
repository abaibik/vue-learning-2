import { mutations } from "@/store";
const { showDialog, hideDialog, setCurrentPage } = mutations;

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
});

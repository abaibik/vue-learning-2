import { mutations } from "@/store";
const { showDialog, hideDialog } = mutations;

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
});

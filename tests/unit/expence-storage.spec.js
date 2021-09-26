import ExpenceStorage from "@/expence-storage";

describe("Expence storage", () => {
  it("returns empty list when nothing added", () => {
    const sut = new ExpenceStorage();
    expect(sut.getExpences()).toStrictEqual([]);
  });
});

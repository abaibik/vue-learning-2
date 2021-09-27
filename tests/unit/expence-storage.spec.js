import ExpenceStorage from "@/expence-storage";

describe("Expence storage", () => {
  it("returns empty list when nothing added", () => {
    const sut = new ExpenceStorage();
    expect(sut.getExpences()).toStrictEqual([]);
  });

  it("returns list with item after add", () => {
    const sut = new ExpenceStorage();
    const cost = {
      date: new Date("1995-12-17T03:24:00"),
      category: "cats",
      value: 40,
    };
    sut.add(cost);
    expect(sut.getExpences()).toStrictEqual([cost]);
  });
});

import ExpenceStorage from "@/expence-storage";

describe("Expence storage", () => {
  const mockGetItem = jest.fn();
  const mockSetItem = jest.fn();
  const mockStorage = {
    getItem: mockGetItem,
    setItem: mockSetItem,
  };
  beforeAll(() => {
    mockStorage.getItem.mockClear();
    mockStorage.setItem.mockClear();
  });

  it("returns empty list when nothing in storage", () => {
    mockStorage.getItem.mockReturnValueOnce(null);
    const sut = new ExpenceStorage(mockStorage);
    expect(mockStorage.getItem).toHaveBeenCalled();
    expect(sut.getExpences()).toStrictEqual([]);
  });

  it("returns an expence when it is in storage", () => {
    mockStorage.getItem.mockReturnValueOnce(
      '[{"date":"2021-09-03T00:00:00.000Z","category":"cats","value":"40"}]'
    );
    const sut = new ExpenceStorage(mockStorage);
    expect(mockStorage.getItem).toHaveBeenCalled();
    expect(sut.getExpences()).toStrictEqual([
      {
        date: new Date("2021-09-03T00:00:00.000Z"),
        category: "cats",
        value: "40",
      },
    ]);
  });

  it("safes expense in storage", () => {
    mockStorage.getItem.mockReturnValueOnce(null);
    const sut = new ExpenceStorage(mockStorage);
    const cost = {
      date: new Date("1995-12-17T03:24:00"),
      category: "cats",
      value: 40,
    };
    sut.add(cost);
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      "expences",
      JSON.stringify([cost])
    );
  });
});

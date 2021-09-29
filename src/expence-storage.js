export default class ExpenceStorage {
  constructor() {
    const loadedItems = localStorage.getItem("expences");
    if (loadedItems === null) {
      this.items = [];
    } else {
      this.items = JSON.parse(loadedItems).map((item) => {
        return {
          date: new Date(item.date),
          category: item.category,
          value: item.value,
        };
      });
    }
  }

  getExpences() {
    return this.items;
  }

  add(cost) {
    this.items.push(cost);
    localStorage.setItem("expences", JSON.stringify(this.items));
  }
}

export default class ExpenceStorage {
  constructor() {
    this.items = [];
  }

  getExpences() {
    return this.items;
  }

  add(cost) {
    this.items.push(cost);
  }
}

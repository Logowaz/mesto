export default class Section {
    constructor({data, renderer}, containerSelector) {
      this._items = data;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
  
  addItem(element) {
    this._container.prepend(element);
  }
  
  renderNewCard(item) {
    this._renderer(item);
  }
  
  renderItems() {
    this._items.forEach((item) => {
      this.renderNewCard(item);
    });
  };
}
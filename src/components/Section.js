export default class Section {
    constructor({renderer}, containerSelector) {
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
  
  addItem(element) {
    this._container.prepend(element);
  }
  
  addItems(items) {
    this._container.append(items);
  } 

  renderNewCard(item) {
    this._renderer(item);
  }
  
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  };
}
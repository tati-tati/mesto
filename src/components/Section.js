export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items, id) {
    items.reverse();
    items.forEach(item => {
      this._renderer(item, id);
    });
  }
}


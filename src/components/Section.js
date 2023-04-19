export class Section {
    constructor({ renderer }, container) {
      this._renderer = renderer;
      this._container = document.querySelector(container);
    }
    renderItems(items) {
      items.forEach(item => {
        this._renderer(item);
      });
    }
  
    setItem(element) {
      this._container.prepend(element);
    }
  }
  
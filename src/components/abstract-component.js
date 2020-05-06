import {createElement, removeElement} from './utils.js';
export default class AbstractComponent {
  constructor() {
    this._element = null;
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
  }
  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    removeElement(this._element);
    this._element = null;
  }

}

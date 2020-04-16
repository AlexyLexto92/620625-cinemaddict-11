import {createElement} from './utils.js';
export const getFilter = ({name, count}) => {
  return (
    `<a href="#${name}" class="main-navigation__item" data-filter = ${name}>${name}${name === `All movies` ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a ></a > `
  );
};
export default class Filter {
  constructor(filter) {
    this._filter = filter;
    this.element = null;
  }
  getTemplate() {
    return getFilter(this._filter);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    } return this._element;
  }
  removeElement() {
    this._element = null;
  }
}

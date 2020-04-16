import {createElement} from './utils.js';
export const createSiteSort = () => {
  return (
    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort="default">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort="date-up">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort="rating-up">Sort by rating</a></li>
  </ul>`
  );
};
export default class Sort {
  constructor() {
    this.element = null;
  }
  getTemplate() {
    return createSiteSort();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}

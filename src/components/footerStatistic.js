import {createElement} from './utils.js';
export const getSiteFooterStatistic = (count) => {
  return (
    `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`
  );
};
export default class FoterStatistic {
  constructor(count) {
    this._count = count;
    this.element = null;
  }
  getTemplate() {
    return getSiteFooterStatistic(this._count);
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

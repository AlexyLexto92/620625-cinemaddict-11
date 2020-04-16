import {createElement} from './utils.js';
export const getSiteTopRated = () => {
  return (
    `<section class="films-list--rated films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">
    </div>
  </section>`
  );
};
export default class TopRated {
  constructor() {
    this.element = null;
  }
  getTemplate() {
    return getSiteTopRated();
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

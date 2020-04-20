import {createElement} from './utils.js';
export const getSiteTopComenter = () => {
  return (
    `<section class="films-list--comment films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
    </div>
  </section>`
  );
};
export default class TopComment {
  constructor() {
    this.element = null;
  }
  getTemplate() {
    return getSiteTopComenter();
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

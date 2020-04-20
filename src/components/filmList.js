import {createElement} from './utils.js';
export const getSiteFilmList = () => {
  return (
    `<section class="films">
    <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container films-list__container--top">    
    </div>
  </section>
  </section>`
  );
};
export default class FilmList {
  constructor() {
    this.element = null;
  }
  getTemplate() {
    return getSiteFilmList();
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

import {createElement} from './utils.js';
export const createSiteMenu = () => {
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
     
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};


export default class Menu {
  constructor() {
    this.element = null;
  }
  getTemplate() {
    return createSiteMenu();
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

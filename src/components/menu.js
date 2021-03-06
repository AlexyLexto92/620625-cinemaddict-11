import AbstractComponent from './abstract-component.js';
export const createSiteMenu = () => {
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
     
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};


export default class Menu extends AbstractComponent {

  getTemplate() {
    return createSiteMenu();
  }

}

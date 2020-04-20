import AbstractComponent from './abstract-component.js';
export const getLoadMoreButton = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};
export default class LoadButton extends AbstractComponent {
  getTemplate() {
    return getLoadMoreButton();
  }

}

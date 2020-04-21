import AbstractComponent from './abstract-component.js';
export const getSiteTopComenter = () => {
  return (
    `<section class="films-list--comment films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
    </div>
  </section>`
  );
};
export default class TopComment extends AbstractComponent {
  getTemplate() {
    return getSiteTopComenter();
  }

}

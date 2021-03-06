import AbstractComponent from './abstract-component.js';
export const getSiteTopRated = () => {
  return (
    `<section class="films-list--rated films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">
    </div>
  </section>`
  );
};
export default class TopRated extends AbstractComponent {
  getTemplate() {
    return getSiteTopRated();
  }
}

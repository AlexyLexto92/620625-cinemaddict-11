import AbstractComponent from './abstract-component.js';
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
export default class FilmList extends AbstractComponent {

  getTemplate() {
    return getSiteFilmList();
  }

}

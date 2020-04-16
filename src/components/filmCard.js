import {createElement} from './utils.js';
export const getSiteFilmCard = ({id, film_info: filmInfo, user_details: userDetails, comments}) => {
  let {title, total_rating: totalRating, poster, release: {date}, runtime, genre, description} = filmInfo;
  let {watchlist, already_watched: alreadyWatched, favorite} = userDetails;
  return (
    `<article class="film-card">
          <h3 data-id="${id}" class="film-card__title">${title}</h3>
          <p class="film-card__rating">${totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${ new Date(date).getFullYear()}</span>
            <span class="film-card__duration">${runtime}</span>
            <span class="film-card__genre">${genre.length > 0 ? genre[0] : ``}</span>
          </p>
          <img data-id="${id}"  src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a data-id="${id}" class="film-card__comments">${comments.length} ${comments.length > 1 ? `comments` : `comment`}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
          </form>
        </article>`
  );
};
export default class FilmCard {
  constructor(card) {
    this._card = card;
    this.element = null;
  }
  getTemplate() {
    return getSiteFilmCard(this._card);
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

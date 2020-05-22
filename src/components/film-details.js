import SmartAbstracktComponent from './smart-abstract-component.js';
import moment from 'moment';
import {getFilmDuration} from '../components/utils.js';
export const getFilmDetails = ({id, film_info, user_details, comments}) => {
  let {title, alternative_title: altTitle, total_rating: totalRating, poster, age_rating: ageRating, director, writers, actors, release: {date, release_country: releaseCounry}, runtime, genre, description} = film_info;
  let {watchlist, already_watched: alreadyWatched, favorite} = user_details;
  return (
    `<section class="film-details">
<form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
        <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap" data-id="${id}">
            <div class="film-details__poster">
                <img class="film-details__poster-img" src="${poster}" alt="">

                <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
                <div class="film-details__info-head">
                    <div class="film-details__title-wrap">
                        <h3 class="film-details__title">${title}</h3>
                        <p class="film-details__title-original">
                            Original: ${altTitle}
                        </p>
                    </div>

                    <div class="film-details__rating">
                        <p class="film-details__total-rating">${totalRating}</p>
                    </div>
                </div>

                <table class="film-details__table">
                    <tbody><tr class="film-details__row">
                        <td class="film-details__term">Director</td>
                        <td class="film-details__cell">${director}</td>
                    </tr>
                    <tr class="film-details__row">
                        <td class="film-details__term">Writers</td>
                       ${writers.length ? `<td class="film-details__cell">
      ${writers}
    </td>` : ``}
                    </tr>
                    <tr class="film-details__row">
                        <td class="film-details__term">Actors</td>
                       ${actors.length ? `<td class="film-details__cell">
                          ${actors}
                        </td>` : ``}
                    </tr>
                    <tr class="film-details__row">
                        <td class="film-details__term">Release Date</td>
                        <td class="film-details__cell">${moment(date).format(`Do MMMM YYYY`)}</td>
                    </tr>
                    <tr class="film-details__row">
                        <td class="film-details__term">Runtime</td>
                        <td class="film-details__cell">${getFilmDuration(runtime)}</td>
                    </tr>
                    <tr class="film-details__row">
                        <td class="film-details__term">Country</td>
                        <td class="film-details__cell">${releaseCounry}</td>
                    </tr>
                    <tr class="film-details__row">
                        <td class="film-details__term">Genres</td>
                        <td class="film-details__cell">
                          ${genre ? genre.map((it) => `<span class="film-details__genre">${it}</span>`).join(``) : ``}

                        </td>
                    </tr>
                </tbody></table>

                <p class="film-details__film-description">
                ${description}
                </p>
            </div>
        </div>

        <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlist ? `checked='cheked'` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${alreadyWatched ? `checked='cheked'` : ``}>
    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favorite ? `checked='cheked'` : ``}>
    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
  </section>
</div>

<div class="form-details__bottom-container">
<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">
      Comments <span class="film-details__comments-count">${comments.length}</span>
    </h3>

    <ul class="film-details__comments-list">
    </ul>
</section>
  </div>
</section>`);
};
export default class FilmCardDetail extends SmartAbstracktComponent {
  constructor(card) {
    super();
    this._card = card;
    this._closeHandler = null;
    this._watchlistHandeler = null;
    this._watchedHandler = null;
    this._isFavoriteHandler = null;
    this.watchlist = this._card.user_details.watchlist;
    this.alreadyWatched = this._card.user_details.already_watched;
    this.favorite = this._card.user_details.favorite;
    this._subscribeOnEvents();
  }
  getTemplate() {
    return getFilmDetails(this._card);
  }
  rerender() {
    super.rerender();
  }

  setOnCloseHendler(hendler) {
    this._closeHandler = hendler;
    this.getElement().addEventListener(`click`, hendler);

  }
  setOnEscKeyDown(hendler) {
    this.getElement().addEventListener(`keydown`, hendler);
  }
  setOnClickButtonWatchlist(hendler) {
    this._watchlistHandeler = hendler;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, hendler);

  }
  setOnClickButtonalreadyWatched(hendler) {
    this._watchedHandler = hendler;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, hendler);

  }
  setOnClickButtonWatchlistFavorite(hendler) {
    this._isFavoriteHandler = hendler;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, hendler);

  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.setOnCloseHendler(this._closeHandler);
    this.setOnClickButtonWatchlist(this.__watchlistHandeler);
    this.setOnClickButtonWatchlistFavorite(this._isFavoriteHandler);
    this.setOnClickButtonWatchlistFavorite(this._isFavoriteHandler);
  }
  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {

        this.rerender();
      });
  }
}


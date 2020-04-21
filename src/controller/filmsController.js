import FilmCard from '../components/filmCard.js';
import FilmCardDetail from '../components/film-details.js';
import TopComment from '../components/topComment.js';
import TopRated from '../components/topRated.js';

import LoadButton from '../components/buttonMore.js';
import NoFilms from '../components/no-films.js';
import {dataFilms} from '../components/mock.js';
import {render, RenderPosition, remove} from '../components/utils.js';

const FILM = {
  START: 0,
  COUNT: 5,
  END: 5
};
const RATED = {
  START: 0,
  END: 2
};

const COMMENT = {
  START: 0,
  END: 2
};
let startFilmCount = FILM.START;

const activeClassesToOpenPopup = [`film-card__poster`, `film-card__comments`, `film-card__title`];

let footer = document.querySelector(`.footer`);


const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCard(film);
  const filmDetail = new FilmCardDetail(film);

  filmComponent.setOnClickHendler((evt) => {
    let target = evt.target;
    if (activeClassesToOpenPopup.includes(target.className)) {

      render(footer, filmDetail, RenderPosition.AFTERBEGIN);

      const onEscKeyDown = (event) => {
        const isEscKey = event.key === `Escape` || event.key === `Esc`;

        if (isEscKey) {
          filmPopupRemove();
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };
      let filmPopupRemove = () => {
        remove(filmDetail);
      };

      filmDetail.setOnCloseHendler((event) => {
        if (event.target.className === `film-details__close-btn`) {
          filmPopupRemove();
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      });
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  });
  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
};


export default class PageController {
  constructor(container) {
    this._container = container;
    this._filmComponent = new FilmCard();
    this._filmDetail = new FilmCardDetail();
    this._ratedTopFillms = new TopRated();
    this._commentTopFilms = new TopComment();
    this._loadMoreButtonComponent = new LoadButton();
    this._noFilms = new NoFilms();
  }

  render(films) {
    const container = this._container.getElement();
    let countOfFilms = films.length;

    if (countOfFilms <= 0) {
      render(container, this._noFilms, RenderPosition.BEFOREEND);
      return;
    }
    let sliceFilms = films.slice(FILM.START, FILM.COUNT);
    for (let film of sliceFilms) {
      renderFilm(container.querySelector(`.films-list__container--top`), film);
    }
    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    render(container, this._ratedTopFillms, RenderPosition.BEFOREEND);
    render(container, this._commentTopFilms, RenderPosition.BEFOREEND);


    let filmListContainerTop = container.querySelector(`.films-list__container--top`);

    const addFilms = () => {

      startFilmCount = startFilmCount + FILM.COUNT;

      let endFilmCount = startFilmCount + FILM.COUNT;

      sliceFilms = films.slice(startFilmCount, endFilmCount);
      for (let film of sliceFilms) {
        renderFilm(container.querySelector(`.films-list__container--top`), film);
      }


      const filmsCards = filmListContainerTop.querySelectorAll(`.film-card__poster`);
      const filmLength = Array.from(filmsCards).length;
      if (filmLength >= dataFilms.length - 1) {
        remove(this._loadMoreButtonComponent);
      }
    };
    this._loadMoreButtonComponent.setClickButtonMoreHendler(addFilms);


    let getTopCategoryFilms = (data, Topcategory) => {
      let TopCategoryFilmsContainer = ``;
      let start = 0;
      let end = 0;
      let slicedFilms;
      let renderCategoryFilms = (array) => {
        for (let film of array) {
          renderFilm(TopCategoryFilmsContainer, film);
        }
      };
      if (Topcategory === `rating`) {
        let ratingArr = data.slice().sort((a, b) => {
          return b.film_info.total_rating - a.film_info.total_rating;
        });
        TopCategoryFilmsContainer = this._ratedTopFillms.getElement().querySelector(`.films-list__container`);
        start = RATED.START;
        end = RATED.END;

        slicedFilms = ratingArr.slice(start, end);
        renderCategoryFilms(slicedFilms);
      } else {
        let commentArr = data.slice().sort((a, b) => {
          return b.comments.length - a.comments.length;
        });
        TopCategoryFilmsContainer = this._commentTopFilms.getElement().querySelector(`.films-list__container`);
        start = COMMENT.START;
        end = COMMENT.END;

        slicedFilms = commentArr.slice(start, end);
        renderCategoryFilms(slicedFilms);
      }
    };
    getTopCategoryFilms(dataFilms, `rating`);
    getTopCategoryFilms(dataFilms);
  }
}

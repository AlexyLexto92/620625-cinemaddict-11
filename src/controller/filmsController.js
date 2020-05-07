import TopComment from '../components/topComment.js';
import TopRated from '../components/topRated.js';
import Sort, { SortType } from '../components/sort.js';
import LoadButton from '../components/buttonMore.js';
import NoFilms from '../components/no-films.js';
import { dataFilms } from '../components/mock.js';
import { render, RenderPosition, remove } from '../components/utils.js';
import FilmController from '../controller/filmController.js';

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

const renderFilm = (containerElement, films, popupContainer, onDataChange,onViewChange) => {
  films.map((film) => {
    const filmController = new FilmController(containerElement, popupContainer, onDataChange,onViewChange);
    filmController.render(film);
    return filmController;
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedArray = [];
  const showFilms = films.slice();
  switch (sortType) {
    case SortType.DATE_UP:
      sortedArray = showFilms.slice().sort((a, b) => {
        a.film_info.release.date = new Date(a.film_info.release.date).getTime();
        b.film_info.release.date = new Date(b.film_info.release.date).getTime();
        return b.film_info.release.date - a.film_info.release.date;
      });
      break;
    case SortType.RATING_UP:
      sortedArray = showFilms.slice().sort((a, b) => b.film_info.total_rating - a.film_info.total_rating);
      break;
    case SortType.DEFAULT:
      sortedArray = showFilms.slice();
      break;
  }
  return sortedArray.slice(from, to);
};


export default class PageController {
  constructor(container, popupContainer) {
    this._popupContainer = popupContainer;
    this._films = [];
    this._container = container;
    this._ratedTopFillms = new TopRated();
    this._commentTopFilms = new TopComment();
    this._loadMoreButtonComponent = new LoadButton();
    this._noFilms = new NoFilms();
    this._sort = new Sort();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(films) {
    this._films = films;
    const container = this._container.getElement();
    let countOfFilms = this._films.length;

    render(container, this._sort, RenderPosition.AFTERBEGIN);

    if (countOfFilms <= 0) {
      render(container, this._noFilms, RenderPosition.BEFOREEND);
      return;
    }
    let sliceFilms = this._films.slice(FILM.START, FILM.COUNT);
    const cont = container.querySelector(`.films-list__container--top`);
    renderFilm(cont, sliceFilms, this._popupContainer, this._onDataChange, this._onViewChange);
    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    render(container, this._ratedTopFillms, RenderPosition.BEFOREEND);
    render(container, this._commentTopFilms, RenderPosition.BEFOREEND);


    let filmListContainerTop = container.querySelector(`.films-list__container--top`);

    const addFilms = () => {

      startFilmCount = startFilmCount + FILM.COUNT;

      let endFilmCount = startFilmCount + FILM.COUNT;

      sliceFilms = this._films.slice(startFilmCount, endFilmCount);
      renderFilm(container.querySelector(`.films-list__container--top`), sliceFilms, this._popupContainer, this._onDataChange, this._onViewChange);



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
        renderFilm(TopCategoryFilmsContainer, array, this._popupContainer, this._onDataChange, this._onViewChange);
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


    this._sort.setSortTypeChangeHandler((sortType) => {
      const soretedFilms = getSortedFilms(this._films, sortType, 0, FILM.END);
      const filmListElement = container.querySelector(`.films-list__container--top`);
      filmListElement.innerHTML = ``;
      renderFilm(filmListElement, soretedFilms.slice(0, FILM.END), this._popupContainer, this._onDataChange,this._onViewChange);

    });
  }
  _onDataChange(filmController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    filmController.render(this._films[index]);
  }
  _onViewChange(){

  }
}

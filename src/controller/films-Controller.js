import TopComment from '../components/top-Comment.js';
import TopRated from '../components/top-Rated.js';
import Sort, {SortType} from '../components/sort.js';
import LoadButton from '../components/button-More.js';
import NoFilms from '../components/no-films.js';
import {render, RenderPosition, remove} from '../components/utils.js';
import FilmController from './film-Controller.js';

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

const renderFilm = (containerElement, films, popupContainer, onDataChange, onViewChange, movieModel, commentModel) => {
  return films.map((film) => {
    const filmController = new FilmController(containerElement, popupContainer, onDataChange, onViewChange, movieModel, commentModel);
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
  constructor(container, popupContainer, movieModel, commentModel) {
    this._popupContainer = popupContainer;
    this._container = container;
    this._ratedTopFillms = new TopRated();
    this._commentTopFilms = new TopComment();
    this._loadMoreButtonComponent = new LoadButton();
    this._noFilms = new NoFilms();
    this._sort = new Sort();
    this._movieModel = movieModel;
    this._commentModel = commentModel;
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._movieModel.setFilterChangeHandler(this._onFilterChange);
    this._showedMoviesControllers = [];
  }

  render() {
    const films = this._movieModel.getMovies();
    this._films = films;
    const container = this._container.getElement();
    let countOfFilms = this._films.length;

    render(container, this._sort, RenderPosition.AFTERBEGIN);

    if (countOfFilms <= 0) {
      render(container, this._noFilms, RenderPosition.BEFOREEND);
      return;
    }
    let sliceFilms = this._films.slice(FILM.START, FILM.COUNT);
    this._renderMovies(sliceFilms);
    this._renderLoadMoreButton();
    render(container, this._ratedTopFillms, RenderPosition.BEFOREEND);
    render(container, this._commentTopFilms, RenderPosition.BEFOREEND);


    let getTopCategoryFilms = (data, Topcategory) => {
      let TopCategoryFilmsContainer = ``;
      let start = 0;
      let end = 0;
      let slicedFilms;
      let renderCategoryFilms = (array) => {
        renderFilm(TopCategoryFilmsContainer, array, this._popupContainer, this._onDataChange, this._onViewChange, this._movieModel, this._commentModel);
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
    getTopCategoryFilms(this._films, `rating`);
    getTopCategoryFilms(this._films);


    this._sort.setSortTypeChangeHandler((sortType) => {
      const soretedFilms = getSortedFilms(this._movieModel.getMovies(), sortType, 0, FILM.END);
      this._removeMovies();
      this._renderMovies(soretedFilms);

    });
  }
  _removeLoadMoreButton() {
    remove(this._loadMoreButtonComponent);
  }
  _renderLoadMoreButton() {
    this._removeLoadMoreButton();
    const container = this._container.getElement();
    let filmListContainerTop = container.querySelector(`.films-list__container--top`);


    const filmsCards = filmListContainerTop.querySelectorAll(`.film-card__poster`);
    const filmLength = Array.from(filmsCards).length;
    if (filmLength >= this._films.length - 1) {
      return;
    } else {
      const containerButton = this._container.getElement().querySelector(`.films-list`);
      render(containerButton, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);


      this._loadMoreButtonComponent.setClickButtonMoreHendler(() => {
        startFilmCount = startFilmCount + FILM.COUNT;

        let endFilmCount = startFilmCount + FILM.COUNT;

        let sliceFilms = this._movieModel.getMovies().slice(startFilmCount, endFilmCount);
        this._renderMovies(sliceFilms);
      });
    }
  }
  _renderMovies(films) {
    const cont = document.querySelector(`.films-list__container--top`);
    let newMovies = renderFilm(cont, films, this._popupContainer, this._onDataChange, this._onViewChange, this._movieModel, this._commentModel);
    this._showedMoviesControllers = this._showedMoviesControllers.concat(newMovies);
    this._showedMoviesCount = this._showedMoviesControllers.length;
  }
  _onDataChange(filmController, oldData, newData) {
    const isSuccess = this._movieModel.updateMovie(oldData.id, newData);
    if (isSuccess) {
      filmController.render(newData);
    }
  }
  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }
  _removeMovies() {
    this._showedMoviesControllers.forEach((movieController) => movieController.destroy());
    this._showedMoviesControllers = [];
  }
  _updateMovies(count) {
    this._removeMovies();
    this._renderMovies(this._movieModel.getMovies().slice(0, count));
    if (this._movieModel.getMovies().length > 5) {
      this._renderLoadMoreButton();
    }
  }
  _onFilterChange() {
    this._updateMovies(FILM.COUNT);
  }
}

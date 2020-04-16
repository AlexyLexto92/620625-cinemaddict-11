import Profile from './components/profile.js';
import Menu from './components/menu.js';
import Filter from './components/filters.js';
import Sort from './components/sort.js';
import FilmList from './components/filmList.js';
import FilmCard from './components/filmCard.js';
import FilmCardDetail from './components/film-details.js';
import TopComment from './components/topComment';
import TopRated from './components/topRated.js';
import FoterStatistic from './components/footerStatistic.js';
import LoadButton from './components/buttonMore.js';

import {dataFilms, filtersData} from './components/mock.js';
import {render, RenderPosition} from './components/utils.js';

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


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
let footer = document.querySelector(`.footer`);
const menu = new Menu().getElement();
const Topfilters = menu.querySelector(`.main-navigation__items`);
render(siteHeaderElement, new Profile().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, menu, RenderPosition.AFTERBEGIN);
filtersData.forEach((element) => {
  render(Topfilters, new Filter(element).getElement(), RenderPosition.BEFOREEND);
});
render(siteMainElement, new Sort().getElement(), RenderPosition.BEFOREEND);

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCard(film).getElement();

  filmComponent.addEventListener(`click`, (evt) => {
    let target = evt.target;
    if (target.className === `film-card__poster` || target.className === `film-card__comments` || target.className === `film-card__title`) {
      let filmId = target.dataset.id;
      let data = dataFilms.find((element) => element.id === filmId);
      const filmDetail = new FilmCardDetail(data).getElement();
      render(footer, filmDetail, RenderPosition.AFTER);

      let buttonClose = filmDetail.querySelector(`.film-details__close-btn`);
      buttonClose.addEventListener(`click`, () => {
        filmDetail.remove();
      });
    }
  });
  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
};

const renderFilms = (filmListElement, films) => {
  const filmListContainer = siteMainElement.querySelector(`.films-list__container`);
  let sliceFilms = films.slice(FILM.START, FILM.COUNT);
  for (let film of sliceFilms) {
    renderFilm(filmListContainer, film);
  }
  const loadMoreButtonComponent = new LoadButton().getElement();
  render(filmListElement, loadMoreButtonComponent, RenderPosition.BEFOREEND);


  let filmListContainerTop = document.querySelector(`.films-list__container--top`);
  const addFilms = () => {

    startFilmCount = startFilmCount + FILM.COUNT;

    let endFilmCount = startFilmCount + FILM.COUNT;

    sliceFilms = films.slice(startFilmCount, endFilmCount);
    for (let film of sliceFilms) {
      renderFilm(filmListContainer, film);
    }


    const filmsCards = filmListContainerTop.querySelectorAll(`.film-card__poster`);
    const filmLength = Array.from(filmsCards).length;
    if (filmLength >= dataFilms.length - 1) {
      loadMoreButtonComponent.remove();
    }
  };
  loadMoreButtonComponent.addEventListener(`click`, addFilms);
};
const filmListElement = new FilmList().getElement();
render(siteMainElement, filmListElement, RenderPosition.BEFOREEND);
renderFilms(filmListElement, dataFilms);

const ratedTopFillms = new TopRated().getElement();
const commentTopFilms = new TopComment().getElement();
render(filmListElement, ratedTopFillms, RenderPosition.BEFOREEND);
render(filmListElement, commentTopFilms, RenderPosition.BEFOREEND);


let getTopCategoryFilms = (data, Topcategory) => {
  let TopCategoryFilmsContainer = ``;
  let start = 0;
  let end = 0;
  let sliceFilms;
  if (Topcategory === `rating`) {
    let ratingArr = data.slice().sort((a, b) => {
      return b.film_info.total_rating - a.film_info.total_rating;
    });
    TopCategoryFilmsContainer = ratedTopFillms.querySelector(`.films-list__container`);
    start = RATED.START;
    end = RATED.END;
    sliceFilms = ratingArr.slice(start, end);
    for (let film of sliceFilms) {
      renderFilm(TopCategoryFilmsContainer, film);
    }
  } else {
    let commentArr = data.slice().sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
    TopCategoryFilmsContainer = commentTopFilms.querySelector(`.films-list__container`);
    start = COMMENT.START;
    end = COMMENT.END;
    sliceFilms = commentArr.slice(start, end);
    for (let film of sliceFilms) {
      renderFilm(TopCategoryFilmsContainer, film);
    }
  }
};
getTopCategoryFilms(dataFilms, `rating`);
getTopCategoryFilms(dataFilms);

render(footer, new FoterStatistic(dataFilms.length).getElement(), RenderPosition.BEFOREEND);

import {createSiteProfile} from './components/profile.js';
import {createSiteMenu} from './components/menu.js';
import {getFilter} from './components/filters.js';
import {createSiteSort} from './components/sort.js';
import {getSiteFilmList} from './components/filmList.js';
import {getSiteFilmCard} from './components/filmCard.js';
import {getFilmDetails} from './components/film-details.js';
import {getSiteTopComenter} from './components/topComment';
import {getSiteTopRated} from './components/topRated.js';
import {getSiteFooterStatistic} from './components/footerStatistic.js';
import {getLoadMoreButton} from './components/buttonMore.js';
import {removeElement} from './components/utils.js';
import {dataFilms, filtersData} from './components/mock.js';
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

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);


render(siteHeaderElement, createSiteProfile(), `beforeend`);
render(siteMainElement, createSiteMenu(), `beforeend`);
let navigationContainer = document.querySelector(`.main-navigation__items`);
for (let filter of filtersData) {
  render(navigationContainer, getFilter(filter), `beforeend`);
}
render(siteMainElement, createSiteSort(), `beforeend`);
render(siteMainElement, getSiteFilmList(), `beforeend`);

const films = siteMainElement.querySelector(`.films`);
const filmList = siteMainElement.querySelector(`.films-list`);
const filmListContainer = siteMainElement.querySelector(`.films-list__container`);
let renderFilms = (data, container, card, position, start, end) => {

  let sliceFilms = data.slice(start, end);
  for (let film of sliceFilms) {
    render(container, card(film), position);
  }
};

let sortedArray = [];
let sortContainer = document.querySelector(`.sort`);
sortContainer.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== `A`) {
    return;
  }

  let target = evt.target;
  let sorts = document.querySelectorAll(`.sort__button`);
  for (const sort of sorts) {
    sort.className = `sort__button`;
  }
  target.classList.add(`sort__button--active`);

  filmListContainer.innerHTML = ``;
  switch (evt.target.dataset.sort) {
    case `date-up`:
      sortedArray = dataFilms.slice().sort((a, b) => {
        a.film_info.release.date = new Date(a.film_info.release.date).getTime();
        b.film_info.release.date = new Date(b.film_info.release.date).getTime();
        return b.film_info.release.date - a.film_info.release.date;
      });

      renderFilms(sortedArray, filmListContainer, getSiteFilmCard, `beforeend`, FILM.START, FILM.END);
      break;
    case `rating-up`:
      sortedArray = dataFilms.slice().sort((a, b) => b.film_info.total_rating - a.film_info.total_rating);
      renderFilms(sortedArray, filmListContainer, getSiteFilmCard, `beforeend`, FILM.START, FILM.END);
      break;
    case `default`:
      sortedArray = dataFilms.slice();
      renderFilms(sortedArray, filmListContainer, getSiteFilmCard, `beforeend`, FILM.START, FILM.END);
      break;
  }
});
renderFilms(dataFilms, filmListContainer, getSiteFilmCard, `beforeend`, FILM.START, FILM.END);


render(filmList, getLoadMoreButton(), `beforeend`);
render(films, getSiteTopRated(), `beforeend`);
render(films, getSiteTopComenter(), `beforeend`);
const ratedFilm = films.querySelector(`.films-list--rated`);
const commentFilm = films.querySelector(`.films-list--comment`);
let filmListContainerRated = ratedFilm.querySelector(`.films-list__container`);
const filmListContainerComment = commentFilm.querySelector(`.films-list__container`);

let getTopCategoryFilms = (data, Topcategory) => {
  let TopCategoryFilmsContainer = ``;
  let start = 0;
  let end = 0;
  if (Topcategory === `rating`) {
    let ratingArr = data.slice().sort((a, b) => {
      return b.film_info.total_rating - a.film_info.total_rating;
    });
    TopCategoryFilmsContainer = filmListContainerRated;
    start = RATED.START;
    end = RATED.END;
    renderFilms(ratingArr, TopCategoryFilmsContainer, getSiteFilmCard, `beforeend`, start, end);
  } else {
    let commentArr = data.slice().sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
    TopCategoryFilmsContainer = filmListContainerComment;
    start = COMMENT.START;
    end = COMMENT.END;
    renderFilms(commentArr, TopCategoryFilmsContainer, getSiteFilmCard, `beforeend`, start, end);
  }


};

getTopCategoryFilms(dataFilms, `rating`);
getTopCategoryFilms(dataFilms);

const footerStatistic = document.querySelector(`.footer__statistics`);
render(footerStatistic, getSiteFooterStatistic(), `beforeend`);
filmListContainerRated = ratedFilm.querySelector(`.films-list__container`);
let footer = document.querySelector(`.footer`);
siteMainElement.addEventListener(`click`, (evt) => {
  let target = evt.target;
  if (target.className === `film-card__poster` || target.className === `film-card__comments` || target.className === `film-card__title`) {
    let filmId = target.dataset.id;
    let data = dataFilms.find((element) => element.id === filmId);
    render(footer, getFilmDetails(data), `afterend`);

    let deatilsContainer = document.querySelector(`.film-details`);
    let buttonClose = document.querySelector(`.film-details__close-btn`);
    buttonClose.addEventListener(`click`, () => {
      removeElement(deatilsContainer);
    });
  }
});

const loadButton = document.querySelector(`.films-list__show-more`);
let filmListContainerTop = document.querySelector(`.films-list__container--top`);
const addFilms = () => {
  startFilmCount = startFilmCount + FILM.COUNT;
  let endFilmCount = startFilmCount + FILM.COUNT;
  let sliceFilms = sortedArray.slice();
  renderFilms(sliceFilms, filmListContainer, getSiteFilmCard, `beforeend`, startFilmCount, endFilmCount);
  const filmsCards = filmListContainerTop.querySelectorAll(`.film-card__poster`);
  const filmLength = Array.from(filmsCards).length;
  if (filmLength >= sliceFilms.length - 1) {
    removeElement(loadButton);
  }
};
loadButton.addEventListener(`click`, addFilms);

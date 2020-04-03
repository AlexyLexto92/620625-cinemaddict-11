import {createSiteProfile} from './components/profile.js';
import {createSiteMenu} from './components/menu.js';
import {createSiteSort} from './components/sort.js';
import {getSiteFilmList} from './components/filmList.js';
import {getSiteFilmCard} from './components/filmCard.js';
import {getSiteTopComenter} from './components/topComment';
import {getSiteTopRated} from './components/topRated.js';
import {getSiteFooterStatistic} from './components/footerStatistic.js';
import {getLoadMoreButton} from './components/buttonMore.js';

const FILM_COUNT = 4;
const RATED_COUNT = 2;
const COMMENT_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);


render(siteHeaderElement, createSiteProfile(), `beforeend`);
render(siteMainElement, createSiteMenu(), `beforeend`);
render(siteMainElement, createSiteSort(), `beforeend`);
render(siteMainElement, getSiteFilmList(), `beforeend`);

const films = siteMainElement.querySelector(`.films`);
const filmList = siteMainElement.querySelector(`.films-list`);
const filmListContainer = siteMainElement.querySelector(`.films-list__container`);
render(filmListContainer, getSiteFilmCard(), `beforeend`);


for (let i = 0; i < FILM_COUNT; i++) {
  render(filmListContainer, getSiteFilmCard(), `beforeend`);
}

render(filmList, getLoadMoreButton(), `beforeend`);
render(films, getSiteTopRated(), `beforeend`);
render(films, getSiteTopComenter(), `beforeend`);
const ratedFilm = films.querySelector(`.films-list--rated`);
const commentFilm = films.querySelector(`.films-list--comment`);
const filmListContainerRated = ratedFilm.querySelector(`.films-list__container`);
const filmListContainerComment = commentFilm.querySelector(`.films-list__container`);
for (let i = 0; i < RATED_COUNT; i++) {
  render(filmListContainerRated, getSiteFilmCard(), `beforeend`);
}

for (let i = 0; i < COMMENT_COUNT; i++) {
  render(filmListContainerComment, getSiteFilmCard(), `beforeend`);
}

const footerStatistic = document.querySelector(`.footer__statistics`);
render(footerStatistic, getSiteFooterStatistic(), `beforeend`);

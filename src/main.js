import Profile from './components/profile.js';
import Menu from './components/menu.js';
import Filter from './components/filters.js';
import FilmList from './components/filmList.js';
import FooterStatistic from './components/footerStatistic.js';
import PageController from './controller/filmsController.js';
import {dataFilms, filtersData} from './components/mock.js';
import {render, RenderPosition} from './components/utils.js';

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
let footer = document.querySelector(`.footer`);

const menu = new Menu();
const Topfilters = menu.getElement().querySelector(`.main-navigation__items`);
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
render(siteMainElement, menu, RenderPosition.AFTERBEGIN);
filtersData.forEach((element) => {
  render(Topfilters, new Filter(element), RenderPosition.BEFOREEND);
});


const filmList = new FilmList();
const pageController = new PageController(filmList,footer);
render(siteMainElement, filmList, RenderPosition.BEFOREEND);
pageController.render(dataFilms);

render(footer, new FooterStatistic(dataFilms.length), RenderPosition.BEFOREEND);

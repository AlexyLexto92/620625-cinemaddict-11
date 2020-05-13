import Profile from './components/profile.js';
import Menu from './components/menu.js';
import Filter from './components/filters.js';
import FilmList from './components/film-List.js';
import FooterStatistic from './components/footer-Statistic.js';
import PageController from './controller/films-Controller.js';
import {dataFilms, filtersData} from './components/mock.js';
import {render, RenderPosition} from './components/utils.js';
import MovieModel from './models/movie.js';

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
let footer = document.querySelector(`.footer`);
const movieModel = new MovieModel();
movieModel.setMovie(dataFilms);
const menu = new Menu();
const Topfilters = menu.getElement().querySelector(`.main-navigation__items`);
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
render(siteMainElement, menu, RenderPosition.AFTERBEGIN);
filtersData.forEach((element) => {
  render(Topfilters, new Filter(element), RenderPosition.BEFOREEND);
});


const filmList = new FilmList();
const pageController = new PageController(filmList, footer, movieModel);
render(siteMainElement, filmList, RenderPosition.BEFOREEND);
pageController.render();

render(footer, new FooterStatistic(dataFilms.length), RenderPosition.BEFOREEND);

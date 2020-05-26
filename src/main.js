import Profile from './components/profile.js';
import Menu from './components/menu.js';
import FilmList from './components/film-List.js';
import FooterStatistic from './components/footer-Statistic.js';
import PageController from './controller/films-Controller.js';
import {render, RenderPosition} from './components/utils.js';
import MovieModel from './models/movie.js';
import CommentModel from './models/comment.js';
import FilterController from './controller/filters-Controller.js';
import API from './api.js';
const AUTHORIZATION = `Basic awdkma1=09dfvlk`;
const api = new API(AUTHORIZATION);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
let footer = document.querySelector(`.footer`);
const movieModel = new MovieModel();
const commentModel = new CommentModel();

const menu = new Menu();
const Topfilters = menu.getElement().querySelector(`.main-navigation__items`);
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
render(siteMainElement, menu, RenderPosition.AFTERBEGIN);

const filterController = new FilterController(Topfilters, movieModel);
filterController.render();

const filmList = new FilmList();
const pageController = new PageController(filmList, footer, movieModel, commentModel, api);
render(siteMainElement, filmList, RenderPosition.BEFOREEND);


api.getMovies()
  .then((movies) => {
    movieModel.setMovie(movies);
    pageController.render();
    render(footer, new FooterStatistic(movieModel.getMoviesthLength()), RenderPosition.BEFOREEND);
  });

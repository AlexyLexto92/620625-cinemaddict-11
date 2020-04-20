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
import NoFilms from './components/no-films.js';
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

const activeClassesToOpenPopup = [`film-card__poster`, `film-card__comments`, `film-card__title`];
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

const filmList = new FilmList().getElement();
render(siteMainElement, filmList, RenderPosition.BEFOREEND);

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCard(film).getElement();


  filmComponent.addEventListener(`click`, (evt) => {
    let target = evt.target;
    if (activeClassesToOpenPopup.includes(target.className)) {
      let filmId = target.dataset.id;
      let data = dataFilms.find((element) => element.id === filmId);
      const filmDetail = new FilmCardDetail(data).getElement();
      render(footer, filmDetail, RenderPosition.AFTER);
      const onEscKeyDown = (event) => {
        const isEscKey = event.key === `Escape` || event.key === `Esc`;

        if (isEscKey) {
          filmPopupRemove();
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };
      let filmPopupRemove = () => {
        filmDetail.remove();
      };

      let buttonClose = filmDetail.querySelector(`.film-details__close-btn`);
      buttonClose.addEventListener(`click`, filmPopupRemove);
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  });
  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
};

const renderFilms = (filmListElement, films) => {
  const filmListContainer = siteMainElement.querySelector(`.films-list__container`);
  let countOfFilms = films.length;
  if (countOfFilms <= 0) {
    render(filmListElement, new NoFilms().getElement(), RenderPosition.BEFOREEND);
    return;
  }
  const ratedTopFillms = new TopRated().getElement();
  const commentTopFilms = new TopComment().getElement();
  const loadMoreButtonComponent = new LoadButton().getElement();
  render(filmListElement, loadMoreButtonComponent, RenderPosition.BEFOREEND);
  render(filmListElement, ratedTopFillms, RenderPosition.BEFOREEND);
  render(filmListElement, commentTopFilms, RenderPosition.BEFOREEND);
  let sliceFilms = films.slice(FILM.START, FILM.COUNT);

  for (let film of sliceFilms) {
    renderFilm(filmListContainer, film);
  }

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


  let getTopCategoryFilms = (data, Topcategory) => {
    let TopCategoryFilmsContainer = ``;
    let start = 0;
    let end = 0;
    let slicedFilms;
    let renderCategoryFilms = (array)=>{
      for (let film of array) {
        renderFilm(TopCategoryFilmsContainer, film);
      }
    };
    if (Topcategory === `rating`) {
      let ratingArr = data.slice().sort((a, b) => {
        return b.film_info.total_rating - a.film_info.total_rating;
      });
      TopCategoryFilmsContainer = ratedTopFillms.querySelector(`.films-list__container`);
      start = RATED.START;
      end = RATED.END;

      slicedFilms = ratingArr.slice(start, end);
      renderCategoryFilms(slicedFilms);
    } else {
      let commentArr = data.slice().sort((a, b) => {
        return b.comments.length - a.comments.length;
      });
      TopCategoryFilmsContainer = commentTopFilms.querySelector(`.films-list__container`);
      start = COMMENT.START;
      end = COMMENT.END;

      slicedFilms = commentArr.slice(start, end);
      renderCategoryFilms(slicedFilms);
    }
  };
  getTopCategoryFilms(dataFilms, `rating`);
  getTopCategoryFilms(dataFilms);

};

renderFilms(filmList, dataFilms);


render(footer, new FoterStatistic(dataFilms.length).getElement(), RenderPosition.BEFOREEND);

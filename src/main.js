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
import {render, RenderPosition, remove} from './components/utils.js';

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
const menu = new Menu();
const Topfilters = menu.getElement().querySelector(`.main-navigation__items`);
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
render(siteMainElement, menu, RenderPosition.AFTERBEGIN);
filtersData.forEach((element) => {
  render(Topfilters, new Filter(element), RenderPosition.BEFOREEND);
});
render(siteMainElement, new Sort(), RenderPosition.BEFOREEND);

const filmList = new FilmList();
render(siteMainElement, filmList, RenderPosition.BEFOREEND);

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
        }
        document.addEventListener(`keydown`, onEscKeyDown);
      });
    }
  });
  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
};

const renderFilms = (filmListElement, films) => {
  const filmListContainer = siteMainElement.querySelector(`.films-list__container`);
  let countOfFilms = films.length;
  const noFilms = new NoFilms();
  if (countOfFilms <= 0) {
    render(filmListElement.getElement(), noFilms, RenderPosition.BEFOREEND);
    return;
  }
  const ratedTopFillms = new TopRated();
  const commentTopFilms = new TopComment();
  const loadMoreButtonComponent = new LoadButton();

  render(filmListElement.getElement(), loadMoreButtonComponent, RenderPosition.BEFOREEND);
  render(filmListElement.getElement(), ratedTopFillms, RenderPosition.BEFOREEND);
  render(filmListElement.getElement(), commentTopFilms, RenderPosition.BEFOREEND);
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
      remove(loadMoreButtonComponent);
    }
  };
  loadMoreButtonComponent.setClickButtonMoreHendler(addFilms);


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
      TopCategoryFilmsContainer = ratedTopFillms.getElement().querySelector(`.films-list__container`);
      start = RATED.START;
      end = RATED.END;

      slicedFilms = ratingArr.slice(start, end);
      renderCategoryFilms(slicedFilms);
    } else {
      let commentArr = data.slice().sort((a, b) => {
        return b.comments.length - a.comments.length;
      });
      TopCategoryFilmsContainer = commentTopFilms.getElement().querySelector(`.films-list__container`);
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


render(footer, new FoterStatistic(dataFilms.length), RenderPosition.BEFOREEND);

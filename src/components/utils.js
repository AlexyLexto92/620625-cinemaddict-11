import moment from 'moment';
import momentDurationFormatSetup from "moment-duration-format";
momentDurationFormatSetup(moment);
export const FilterType = {
  ALL: `All`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

export const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
export const elementRandom = (arr, start, end, counts) => {
  const startCount = randomInteger(start, end);
  const elemNewArray = arr.slice(startCount, startCount + counts);
  return elemNewArray;
};
export const removeElement = (elem) => {
  elem.remove();
};
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};
export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(element.getElement());
      break;
  }
};
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};
export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
export const replaceElement = (parentElement, replacementElement, replaceableElement) => {
  parentElement.replaceChild(replacementElement, replaceableElement);
};
export const getFilmDuration = (movieDuration) => {
  const duration = moment.duration(movieDuration, `minutes`).format(`h[h] m[m]`);

  return duration;
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const getAllMoveis = (movies) => {
  return movies.slice();
};

export const getWatchListMovies = (movies) => {
  return movies.slice().filter((film) => film.user_details.watchlist === true);
};

export const getHistoryMovies = (movies) => {
  return movies.slice().filter((film) => film.user_details.already_watched === true);
};

export const getFavoriteMovies = (movies) => {
  return movies.slice().filter((film) => film.user_details.favorite === true);
};


export const getMoviesByFilter = (movies, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return getAllMoveis(movies);
    case FilterType.WATCHLIST:
      return getWatchListMovies(movies);
    case FilterType.HISTORY:
      return getHistoryMovies(movies);
    case FilterType.FAVORITES:
      return getFavoriteMovies(movies);
  }
  return movies;
};

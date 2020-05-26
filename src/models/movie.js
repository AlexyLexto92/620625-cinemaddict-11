import {getMoviesByFilter, FilterType} from '../components/utils.js';
export default class Movies {
  constructor() {
    this._movies = [];
    this._activeFilterType = FilterType.ALL;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._comments = [];
    this._moviesthLength = 0;
  }

  getMovies() {

    return getMoviesByFilter(this._movies, this._activeFilterType);
  }
  getMoviesAll() {
    return this._movies;
  }

  getMoviesthLength() {
    this._moviesthLength = this._movies.length;
    return this._moviesthLength;
  }

  setMovie(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);
    this.getMoviesthLength();
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateMovie(id, movies) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movies, this._movies.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }
  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

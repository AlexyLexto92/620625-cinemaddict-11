import AbstractComponent from './abstract-component.js';
import {SortType} from './utils.js';
export const createSiteSort = () => {
  return (
    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type=${SortType.DEFAULT}>Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type=${SortType.DATE_UP}>Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type=${SortType.RATING_UP}>Sort by rating</a></li>
  </ul>`
  );
};
export default class Sort extends AbstractComponent {

  getTemplate() {
    return createSiteSort();
  }
  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }
      let target = evt.target;
      let sorts = this.getElement().querySelectorAll(`.sort__button`);
      for (const sort of sorts) {
        sort.className = `sort__button`;
      }
      target.classList.add(`sort__button--active`);
      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;


      handler(this._currenSortType);
    });
  }
}

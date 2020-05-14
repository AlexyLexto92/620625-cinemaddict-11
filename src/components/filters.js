import AbstractComponent from './abstract-component.js';
const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

export const getFilter = (filters) => {
  return (`<div class="main-navigation__items"> 
       ${filters.map((it) => `<a href="#${it.name}" id="filter__${it.name}" class="main-navigation__item ${it.checked ? `main-navigation__item--active` : ``}" data-filter = ${it.name}>${it.name}${it.name === `All movies` ? `` : `<span class="main-navigation__item-count">${it.count}</span>`}</a ></a > `).join(`\n`)}
         </div>
 `);
};
export default class Filter extends AbstractComponent {
  constructor(filter) {
    super();
    this._filter = filter;
  }
  getTemplate() {
    return getFilter(this._filter);
  }
  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }

}

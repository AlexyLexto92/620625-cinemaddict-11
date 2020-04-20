import AbstractComponent from './abstract-component.js';
export const getFilter = ({name, count}) => {
  return (
    `<a href="#${name}" class="main-navigation__item" data-filter = ${name}>${name}${name === `All movies` ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a ></a > `
  );
};
export default class Filter extends AbstractComponent {
  constructor(filter) {
    super();
    this._filter = filter;
  }
  getTemplate() {
    return getFilter(this._filter);
  }

}

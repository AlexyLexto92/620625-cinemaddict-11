import AbstractComponent from './abstract-component.js';
export const getSiteFooterStatistic = (count) => {
  return (
    `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`
  );
};
export default class FoterStatistic extends AbstractComponent {
  constructor(count) {
    super();
    this._count = count;

  }
  getTemplate() {
    return getSiteFooterStatistic(this._count);
  }
}

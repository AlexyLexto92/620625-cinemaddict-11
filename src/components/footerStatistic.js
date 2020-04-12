export const getSiteFooterStatistic = (count) => {
  return (
    `<section class="footer__statistics">
    <p>${count.length} movies inside</p>
  </section>`
  );
};

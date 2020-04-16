export const getFilter = ({name, count}) => {
  return (
    `<a href="#${name}" class="main-navigation__item" data-filter = ${name}>${name}${name === `All movies` ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a ></a > `
  );
};
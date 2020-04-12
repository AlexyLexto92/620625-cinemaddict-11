export const getFilter = ({name, count}) => {
  return (
    `<a href="#${name}" class="main-navigation__item main-navigation__item--active">${name}${name === `All movies` ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a ></a > `
  );
};

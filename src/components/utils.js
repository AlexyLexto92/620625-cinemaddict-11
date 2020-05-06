export const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
export const elementRandom = (arr, start, end, counts)=>{
  const startCount = randomInteger(start, end);
  const elemNewArray = arr.slice(startCount, startCount + counts);
  return elemNewArray;
};
export const removeElement = (elem)=>{
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
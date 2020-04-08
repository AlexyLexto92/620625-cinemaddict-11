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

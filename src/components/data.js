import {elementRandom, randomInteger} from './utils.js';
const DATA_COUNT = 25;
const commentCount = 4;
const films = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`, `Santa Claus Conquers the Martians`, `Popeye the Sailor Meets Sindbad the Sailor`];
const images = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`];
const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.
 Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
   Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. 
   Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;
export const getText = (text) => {
  let separator = `.`;
  let stringArray = text.split(separator);
  return stringArray;
};
const RATING = {
  MIN: 0,
  MAX: 10,
};
const DESCRIPTION = {
  MIN: 1,
  MAX: 5,
};
const COMMENTS = {
  MIN: 0,
  MAX: 40
};
let descriptions = getText(descriptionText);
let getComments = () => ({
  image: [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`][Math.floor(Math.random() * 4)],
  author: [`James`, `Tim Macoveev`][Math.floor(Math.random() * 2)],
  text: [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`][Math.floor(Math.random() * 4)],
  date: [Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000][Math.floor(Math.random() * 2)],
});
let genres = [`Musical`, `Western`, `Drama`, `Comedy`];
export let getDataFilm = () => ({
  image: images[[Math.floor(Math.random() * films.length)]],
  name: films[[Math.floor(Math.random() * films.length)]],
  description: elementRandom(descriptions, DESCRIPTION.MIN, descriptions.length, DESCRIPTION.MAX).toString(),
  rating: randomInteger(RATING.MIN, RATING.MAX),
  year: 1195,
  duration: `2h 33m`,
  genre: genres[[Math.floor(Math.random() * genres.length)]],
  commentsCount: randomInteger(COMMENTS.MIN, COMMENTS.MAX),
  get comments() {
    return new Array(commentCount).fill(getComments()).map(getComments);
  },
  isFavorite: Boolean(randomInteger(0, 1)),
  isWatched: Boolean(randomInteger(0, 1)),
  author: `Anthony Mann`,
  writers: `Anne Wigton, Heinz Herald, Richard Weil`,
  actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
  country: `USA`,
  genres,
});
export let dataFilms = new Array(DATA_COUNT).fill(getDataFilm()).map(getDataFilm);
dataFilms.forEach((element, index) => {
  element.id = index;
  return element;
});

export let filtersData = [{
  name: `All movies`,
},
{
  name: `Watchlist`,
  get count() {
    let numb = 0;
    for (let elem of dataFilms) {
      if (elem.isWatched) {
        numb += 1;
      }
    }
    return numb;
  }
},
{
  name: `History`,
  get count() {
    let numb = 0;
    for (let elem of dataFilms) {
      if (elem.isWatched) {
        numb += 1;
      }
    }
    return numb;
  }
},
{
  name: `Favorites`,
  get count() {
    let numb = 0;
    for (let elem of dataFilms) {
      if (elem.isFavorite) {
        numb += 1;
      }
    }
    return numb;
  }
}];

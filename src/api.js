export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }
  getMovies() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {headers})
      .then((response) => response.json());
  }
  getComments(id) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    return fetch(`https://htmlacademy-es-9.appspot.com/cinemaddict//comments/${id}`, {headers})
      .then((response) => response.json());
  }
}


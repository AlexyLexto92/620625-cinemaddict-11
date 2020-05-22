export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }
  getMovies() {
    debugger
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    return fetch(`https://11.ecmascript.pages.academy/cinemaddict`, {headers})
    .then((response) => response.json());
  }
}


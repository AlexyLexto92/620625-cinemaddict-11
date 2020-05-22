const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};
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

  _updateMovie(id, data) {
    debugger
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);
    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies/${id}`, {
      method: `PUT`,
      body: JSON.stringify(data),
      headers,
    })
      .then(checkStatus)
      .then((response) => response.json())
      .then(data);
  }
}


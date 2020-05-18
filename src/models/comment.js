export default class Comment {
  constructor() {
    this._comments = [];
  }

  setComment(film) {
    this._comments = film.comments;
    return this._comments;
  }
  getComments() {
    return this._comments;
  }
  updateComments(id, comment) {
    const index = this._comments.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }
    if (!comment) {
      this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
    } else {
      this._comments = [].concat(this._comments.slice(0, index), comment, this._comments.slice(index + 1));
    }
    return true;
  }
}


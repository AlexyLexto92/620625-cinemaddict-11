export default class Comment {
  constructor(api) {
    this._comments = [];
    this._api = api;
    this._commentsLength = 0;
  }

  setComment(comments) {
    this._comments = comments;
    this.getCommentsLength();
    return this._comments;
  }
  getComments() {
    return this._comments;
  }

  getCommentsLength() {
    this._commentsLength = this._comments.length;
    return this._commentsLength;

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
  addComment(comment) {
    this._comments.push(comment);
    this.getCommentsLength();
  }
}


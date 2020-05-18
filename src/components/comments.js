import AbstractComponent from "./abstract-component";

export const getComments = ({author, comment, date, emotion, id}) => {
  return (
    `<li class="film-details__comment" data-id=${id}>
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">
         ${comment}
        </p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
`);
};

export default class Comment extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }
  getTemplate() {
    return getComments(this._comment);
  }
  rerender() {
    super.rerender();
  }
  _setClickOnButton(hendler) {
    this._onDelHendler = hendler;
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, hendler);

  }
}


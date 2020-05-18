import AbstractComponent from "../components/abstract-component";
import {render, RenderPosition, remove} from '../components/utils.js';
import CommentAdd from "../components/comment-add.js";
import Comment from "../components/comments.js";

export default class CommentController extends AbstractComponent {
  constructor(container, mode, onCommentsChange) {
    super();
    this._onCommentsChange = onCommentsChange;
    this._comments = [];
    this._commentComtainer = container;
    this._mode = mode;
  }
  render(coment) {
    this._comment = new Comment(coment);
    this._commentNew = new CommentAdd();
    let oldData = coment;
    let newData = null;

    if (this._mode === `old`) {
      this._comment._setClickOnButton((evt) => {
        evt.preventDefault();
        oldData = Object.assign({}, coment, {});
        this._onCommentsChange(this, null, oldData);
      });
      render(this._commentComtainer, this._comment, RenderPosition.BEFOREEND);
    } else {
      let valueEmoji = null;
      this._commentNew.setOnClickEmoji((evt) => {
        const target = evt.target;
        if (target.tagName === `IMG`) {
          valueEmoji = target.dataset.emoji;
          const formImg = document.querySelector(`.film-details__add-emoji-label`);
          formImg.innerHTML = `<img src="./images/emoji/${valueEmoji}.png" width="55" height="55" alt="emoji"></img>`;
        }
        return valueEmoji;
      });

      this._commentNew.setOnEnterForm((evt) => {
        if (evt.keyCode === 13) {
          const text = document.querySelector(`.film-details__comment-input`).value;
          newData = Object.assign({}, {author: ``, comment: ``, date: new Date(), emotion: `puke`, id: 2});
          newData.author = null;
          newData.comment = text;
          newData.date = new Date();
          newData.emotion = valueEmoji;
          this._onCommentsChange(this, newData, null);
        }
      });
      render(this._commentComtainer, this._commentNew, RenderPosition.BEFOREEND);
    }
  }
  destroy() {
    remove(this._comment);
  }

}

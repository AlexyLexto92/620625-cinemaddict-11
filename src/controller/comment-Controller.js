import AbstractComponent from "../components/abstract-component";
import {render, RenderPosition, remove} from '../components/utils.js';
import CommentAdd from "../components/comment-add.js";
import Comment from "../components/comments.js";

export default class CommentController extends AbstractComponent {
  constructor(container, mode, onCommentsChange) {
    super();
    this._onCommentsChane = onCommentsChange;
    this._comments = [];
    this._commentComtainer = container;
    this._mode = mode;
  }
  render(comment) {
    this._comment = new Comment(comment);
    this._commentNew = new CommentAdd();
    let oldData = comment;

    if (this._mode === `old`) {
      this._comment._setClickOnButton((evt) => {
        evt.preventDefault();
        oldData = Object.assign({}, comment, {});
        this._onCommentsChane(this, null, oldData);
      });
      render(this._commentComtainer, this._comment, RenderPosition.BEFOREEND);
    } else {

      render(this._commentComtainer, this._commentNew, RenderPosition.BEFOREEND);
    }
  }
  destroy() {
    remove(this._comment);
  }

}

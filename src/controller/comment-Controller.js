import AbstractComponent from "../components/abstract-component";
import { render, RenderPosition, remove } from '../components/utils.js';
import CommentAdd from "../components/comment-add.js";
import Comment from "../components/comments.js";

export default class CommentController extends AbstractComponent {
  constructor(container, mode, movieModel) {
    super();
    this._comments = [];
    this._commentComtainer = container;
    this._mode = mode;
 
    this._movieModel = movieModel;
  }
  render(comment) {
    debugger
    const a = this._movieModel.getComments();
    this._comment = new Comment(comment);
    this._commentNew = new CommentAdd();


    if (this._mode === `old`) {
      this._comment._setClickOnButton((evt) => {
        evt.preventDefault();
        this.destroy();
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

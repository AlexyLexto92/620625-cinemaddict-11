import FilmCard from '../components/film-Card.js';
import FilmCardDetail from '../components/film-details.js';
import {render, RenderPosition, remove, replaceElement} from '../components/utils.js';
import SmartAbstracktComponent from '../components/smart-abstract-component.js';
import CommentController from './comment-Controller.js';
const activeClassesToOpenPopup = [`film-card__poster`, `film-card__comments`, `film-card__title`];
export const MODE = {
  OLD: `old`,
  NEW: `new`,
};
const renderComments = (containerElement, mode, _onCommentsChange, array = []) => {

  if (array.length >= 1) {

    return array.map((comment) => {
      const commentController = new CommentController(containerElement, mode, _onCommentsChange);
      commentController.render(comment);
      return commentController;
    });
  } else {
    const commentController = new CommentController(containerElement, mode, _onCommentsChange);
    commentController.render();
    return commentController;
  }

};
const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class FilmController extends SmartAbstracktComponent {
  constructor(container, popupContainer, onDataChange, onViewChange, movieModel, commentModel, api) {
    super();
    this._onViewChange = onViewChange;
    this._container = container;
    this._popupContainer = popupContainer;
    this._filmComponent = null;
    this._filmDetail = null;
    this._onDataChange = onDataChange;
    this._oldPopupComponent = null;
    this._showedCommentsControllers = [];
    this._movieModel = movieModel;
    this._commentModel = commentModel;
    this._onCommentsChange = this._onCommentsChange.bind(this);
    this._api = api;
    this._comments = [];
  }
  _filmPopupRemove(elem) {
    remove(elem);
  }
  _renderComments(id) {
    this._api.getComments(id).
      then((comments) => {
        this._commentModel.setComment(comments);
        this._createComments();
      });
  }
  _createComments() {
    this._comments = this._commentModel.getComments();
    const container = document.querySelector(`.film-details__comments-list`);
    const newComments = renderComments(container, MODE.OLD, this._onCommentsChange, this._comments);
    this._showedCommentsControllers = this._showedCommentsControllers.concat(newComments);
  }
  _removeComments() {
    this._showedCommentsControllers.forEach((commentController) => commentController.destroy());
    this._showedCommentsControllers = [];
  }
  _renderAddComment() {
    const container = document.querySelector(`.film-details__comments-wrap`);
    renderComments(container, MODE.NEW, this._onCommentsChange);
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    this._commentsLength = this._commentModel.getCommentsLength();
    this._filmComponent = new FilmCard(film, this._commentsLength);
    this._filmDetail = new FilmCardDetail(film, this._commentsLength);
    const cont = this._popupContainer;

    const setOnEscKeyDown = (event) => {
      const isEscKey = event.key === `Escape` || event.key === `Esc`;
      if (isEscKey) {
        this._filmPopupRemove(this._filmDetail);
        this._onDataChange(this, film, oldData);
        document.removeEventListener(`keydown`, setOnEscKeyDown);
      }
    };

    this._filmComponent.setOnClickHendler((evt) => {
      let target = evt.target;
      if (activeClassesToOpenPopup.includes(target.className)) {

        this._oldPopupComponent = this._popupContainer.querySelector(`.film-details`);
        if (this._oldPopupComponent) {
          this._replacePopup();
          this._mode = Mode.DEFAULT;
        } else {
          render(cont, this._filmDetail, RenderPosition.AFTERBEGIN);
          this._renderComments(film.id);
          this._renderAddComment();

        }
        document.addEventListener(`keydown`, setOnEscKeyDown);
      }
    });
    let oldData = film;
    this._filmDetail.setOnCloseHendler((event) => {
      if (event.target.className === `film-details__close-btn`) {
        this._filmPopupRemove(this._filmDetail);
        this._onDataChange(this, film, oldData);
        document.removeEventListener(`keydown`, setOnEscKeyDown);
      }
    });
    this._filmComponent.setOnClickButtonWatchlist((evt) => {

      evt.preventDefault();
      oldData = Object.assign({}, film, {});
      oldData.user_details.watchlist = !oldData.user_details.watchlist;
      this._onDataChange(this, film, oldData);
    });

    this._filmComponent.setOnClickButtonalreadyWatched((evt) => {
      evt.preventDefault();
      oldData = Object.assign({}, film, {});
      oldData.user_details[`already_watched`] = !oldData.user_details[`already_watched`];
      this._onDataChange(this, film, oldData);
    });

    this._filmComponent.setOnClickButtonWatchlistFavorite((evt) => {
      evt.preventDefault();
      oldData = Object.assign({}, film, {});
      oldData.user_details.favorite = !oldData.user_details.favorite;
      this._onDataChange(this, film, oldData);
    });


    this._filmDetail.setOnClickButtonWatchlist(() => {
      oldData = Object.assign({}, film, {});
      oldData.user_details.watchlist = !oldData.user_details.watchlist;
      return oldData;
    });
    this._filmDetail.setOnClickButtonalreadyWatched(() => {
      oldData = Object.assign({}, film, {});
      oldData.user_details[`already_watched`] = !oldData.user_details[`already_watched`];
      return oldData;
    });
    this._filmDetail.setOnClickButtonWatchlistFavorite(() => {
      oldData = Object.assign({}, film, {});
      oldData.user_details.favorite = !oldData.user_details.favorite;
      return oldData;
    });
    if (oldFilmComponent) {
      replaceElement(this._container, this._filmComponent.getElement(), oldFilmComponent.getElement());
    } else {
      render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
    }
  }


  _replacePopup() {
    const cont = this._popupContainer;
    this._onViewChange();
    replaceElement(cont, this._filmDetail.getElement(), this._oldPopupComponent);
    this._mode = Mode.EDIT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replacePopup();
    }
  }
  destroy() {
    remove(this._filmDetail);
    remove(this._filmComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onCommentsChange(commentController, newData, oldData) {
    if (!oldData) {
      this._commentModel.addComment(newData);
      this._removeComments();
      this._createComments();
    } else {

      const isSuccess = this._commentModel.updateComments(oldData.id, newData);
      if (isSuccess) {
        this._removeComments();
        this._createComments();
      }


    }
  }


}

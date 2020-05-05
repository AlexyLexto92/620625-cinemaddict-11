import FilmCard from '../components/filmCard.js';
import FilmCardDetail from '../components/film-details.js';
import { render, RenderPosition, remove } from '../components/utils.js';
import AbstractComponent from '../components/abstract-component.js';
const activeClassesToOpenPopup = [`film-card__poster`, `film-card__comments`, `film-card__title`];

export default class FilmController extends AbstractComponent {
  constructor(container, popupContainer, onDataChange, onViewChange) {
    super();
    this._onViewChange= onViewChange;
    this._container = container;
    this._popupContainer = popupContainer;
    this._filmComponent = null;
    this._filmDetail = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDataChange = onDataChange;
  }
  _filmPopupRemove(elem) {
    remove(elem);
  }
  render(film) {

    this._filmComponent = new FilmCard(film);
    this._filmDetail = new FilmCardDetail(film);
    const cont = this._popupContainer;

    this._filmComponent.setOnClickHendler((evt) => {
      let target = evt.target;
      if (activeClassesToOpenPopup.includes(target.className)) {

        render(cont, this._filmDetail, RenderPosition.AFTERBEGIN);

        this._filmDetail.setOnCloseHendler((event) => {
          if (event.target.className === `film-details__close-btn`) {
            this._filmPopupRemove(this._filmDetail);
            document.removeEventListener(`keydown`, this._onEscKeyDown);
          }
        });
        document.addEventListener(`keydown`, this._onEscKeyDown);
      }
    });


    this._filmComponent.setOnClickButtonWatchlist(() => {
      const oldData = Object.assign({}, film, {});
      oldData.user_details.watchlist = !oldData.user_details.watchlist;
      this._onDataChange(this, film, oldData);
    });

    this._filmComponent.setOnClickButtonalreadyWatched(() => {
      const oldData = Object.assign({}, film, {});
      oldData.user_details[`already_watched`] = !oldData.user_details[`already_watched`];
      this._onDataChange(this, film, oldData);
    });

    this._filmComponent.setOnClickButtonWatchlistFavorite(() => {
      const oldData = Object.assign({}, film, {});
      oldData.user_details.favorite = !oldData.user_details.favorite;
      this._onDataChange(this, film, oldData);
    });


    this._filmDetail.setOnClickButtonWatchlist(() => {
     
      const oldData = Object.assign({}, film, {});
      oldData.user_details.watchlist = !oldData.user_details.watchlist;
      this._onDataChange(this, film, oldData);
      this._filmDetail.rerender();
    });
    this._filmDetail.setOnClickButtonalreadyWatched(() => {
      const oldData = Object.assign({}, film, {});
      oldData.user_details[`already_watched`] = !oldData.user_details[`already_watched`];
      this._onDataChange(this, film, oldData);
   
    });
    this._filmDetail.setOnClickButtonWatchlistFavorite(() => {
      const oldData = Object.assign({}, film, {});
      oldData.user_details.favorite = !oldData.user_details.favorite;
      this._onDataChange(this, film, oldData);
    });

    this._filmDetail.setOnClickEmoji(()=>{
    const emojiContainer = this._filmDetail.querySelector(`.film-details__add-emoji-label`).
      emojiContainer.innerHtml = `<img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">`;
  });

    render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
  }
  _onEscKeyDown(event) {
    const isEscKey = event.key === `Escape` || event.key === `Esc`;

    if (isEscKey) {
      this._filmPopupRemove(this._filmDetail);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }


  }


}

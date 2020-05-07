import FilmCard from '../components/filmCard.js';
import FilmCardDetail from '../components/film-details.js';
import { render, RenderPosition, remove, replaceElement } from '../components/utils.js';
import SmartAbstracktComponent from '../components/smart-abstract-component.js';
const activeClassesToOpenPopup = [`film-card__poster`, `film-card__comments`, `film-card__title`];

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class FilmController extends SmartAbstracktComponent {
  constructor(container, popupContainer, onDataChange, onViewChange) {
    super();
    this._onViewChange = onViewChange;
    this._container = container;
    this._popupContainer = popupContainer;
    this._filmComponent = null;
    this._filmDetail = null;

    this._onDataChange = onDataChange;
  }
  _filmPopupRemove(elem) {
    remove(elem);
  }

  render(film) {
    this._filmComponent = new FilmCard(film);
    this._filmDetail = new FilmCardDetail(film);
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
        render(cont, this._filmDetail, RenderPosition.AFTERBEGIN);
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

    render(this._container, this._filmComponent, RenderPosition.BEFOREEND);

  }


  _replacePopup() {
    this._onViewChange();
    replaceElement(this._popupRenderPlace, this._filmPopup.getElement(), this._oldPopupComponent);
    this._mode = Mode.EDIT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replacePopup();
    }
  }


}

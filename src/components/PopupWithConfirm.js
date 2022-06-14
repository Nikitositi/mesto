import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ submit }, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button_type_confirm');
    this._submit = submit;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submit(this._card);
        this.close();
    });
  }
}
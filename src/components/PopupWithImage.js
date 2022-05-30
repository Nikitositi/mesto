import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }

  open(cardname, cardlink) {
    this._popupImage.src = cardlink;
    this._popupImage.alt = cardname;
    this._popupCaption.textContent = cardname;
    super.open();
  }
}
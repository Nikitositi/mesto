// Фукнция открытия картинки в полном размере
export function imagePopupHandler(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openPopup(popupTypeImage);
}
export function rendering(button, isLoading) {
  if(isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить';
  }
}
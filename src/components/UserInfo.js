export default class UserInfo {
  constructor(userSelectors) {
    this._name = document.querySelector(userSelectors.userName);
    this._about = document.querySelector(userSelectors.userActivity);
    this._avatar = document.querySelector(userSelectors.userAvatar)
  }
  
  getUserInfo() {
    return {
      name: this._name.textContent,
      activity: this._about.textContent,
    }
  }

  setUserInfo(data) {
    if (data.name) {
      this._name.textContent = data.name;
    }
    if (data.about) {
      this._about.textContent = data.about;
    }
  }

  setUserAvatar(item){
    if (item.avatar) {
      this._avatar.src = item.avatar;  
    }
  }
}
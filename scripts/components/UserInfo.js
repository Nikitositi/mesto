export default class UserInfo {
  constructor(nameSelector, activitySelector) {
    this._name = document.querySelector(nameSelector);
    this._activity = document.querySelector(activitySelector);
  }
  
  getUserInfo() {
    return {
      name: this._name.textContent,
      activity: this._activity.textContent,
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._activity.textContent = data.activity;
  }
}
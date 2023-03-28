export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._nameInput = document.querySelector(userNameSelector);
    this._jobInput = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return userInfo = {
      this._nameInput.value,
      this._jobInput.value
    }
  }

  setUserInfo() {
    this._nameInput.value = profileName.textContent;
    this._jobInput.value = profileJob.textContent;
  }
}
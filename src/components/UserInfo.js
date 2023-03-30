export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._nameProfile = document.querySelector(userNameSelector);
    this._jobProfile = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return userInfo = {
      name: this._nameProfile.textContent,
      job: this._jobProfile.textContent
    }
  }

  setUserInfo(item) {
    this._nameProfile.textContent = item.nameProfile;
    this._jobProfile.textContent = item.jobProfile;
  }
}
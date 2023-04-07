export default class UserInfo {
  constructor( { name, job, avatar } ) {
    this._nameProfile = name;
    this._jobProfile = job;
    this._avatar = avatar;
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameProfile.textContent,
      about: this._jobProfile.textContent,
      avatar: this._avatar.src
    }
    return userInfo;
  }

  setUserInfo(item) {
    this._nameProfile.textContent = item.name;
    this._jobProfile.textContent = item.job;
    this._avatar.textContent = item.avatar;
  }
}
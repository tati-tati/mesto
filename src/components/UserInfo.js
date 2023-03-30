export default class UserInfo {
  constructor( { name, job } ) {
    this._nameProfile = name;
    this._jobProfile = job;
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameProfile.textContent,
      job: this._jobProfile.textContent,
    }
    return userInfo;
  }

  setUserInfo(item) {
    this._nameProfile.textContent = item.name;
    this._jobProfile.textContent = item.job;
  }
}
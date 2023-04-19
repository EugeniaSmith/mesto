export class UserInfo {
    constructor({nameUser, jobUser}) {
     this._nameUser = nameUser;
     this._jobUser = jobUser;
    }
    getUserInfo() {
     return {
      name: this._nameUser.textContent,
      about: this._jobUser.textContent
     }
    }

    setUserInfo(name, about) {
      this._nameUser.textContent = name;
      this._jobUser.textContent = about;
    }
  }
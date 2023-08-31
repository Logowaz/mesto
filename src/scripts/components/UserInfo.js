export default class UserInfo {
     constructor({profileName, profileJob, profilePhoto}) {
        this._profileJob = document.querySelector(profileJob);
        this._profileName = document.querySelector(profileName);
        this._avatar = document.querySelector(profilePhoto);
    }
  
    getUserInfo() {
        return {
            name: this._profileName.textContent, 
            job: this._profileJob.textContent
        }
    }
  
    setUserInfo({name, about, avatar}) {
        this._profileName.textContent = name;
        this._profileJob.textContent = about;
        this.setAvatarImage(avatar);
    }

    setAvatarImage(avatar) {
    this._avatar.src = avatar;
    }

}
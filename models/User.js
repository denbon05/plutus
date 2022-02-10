export default class User {
  constructor({ username, id }) {
    this.username = username;
    this.id = id;
  }

  isGuest() {
    return false;
  }

  getName() {
    return this.name;
  }

  setDataToLocalStorage() {
    localStorage.setItem('username', this.username);
    localStorage.setItem('userId', this.id);
  }

  resetDataFromLocalStorage() {
    localStorage.clear();
  }
}

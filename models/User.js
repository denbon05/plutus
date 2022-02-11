export default class User {
  #name;

  constructor({ name }) {
    this.name = name;

    localStorage.setItem('user', JSON.stringify({ name }));
  }

  isGuest() {
    return false;
  }

  getName() {
    return this.name ?? JSON.parse(localStorage.getItem('user')).name;
  }

  logOut() {
    localStorage.clear();
  }
}

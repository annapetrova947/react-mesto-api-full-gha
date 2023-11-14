class Api {
  constructor(basePath, token) {
    this._basePath = basePath;
    //this._token = token;
  }

  _getHeaders() {
    return { authorization: `Bearer ${localStorage.getItem('token')}`, "Content-Type": "application/json" };
  }

  _getJSON(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards() {
    const promise = fetch(`${this._basePath}cards`, {
      headers: this._getHeaders(),
    });
    return promise.then(this._getJSON);
  }

  createCard(item) {
    return fetch(`${this._basePath}cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(item),
    }).then(this._getJSON);
  }

  getProfileInformation() {
    return fetch(`${this._basePath}users/me`, {
      headers: this._getHeaders(),
    }).then(this._getJSON);
  }

  saveProfileInfo(data) {
    return fetch(`${this._basePath}users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    }).then(this._getJSON);
  }

  deleteCard(id) {
    return fetch(`${this._basePath}cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJSON);
  }

  changeLikeCardStatus(id, isLiked) {
    let method;
    if (isLiked) {
      method = "DELETE";
    } else {
      method = "PUT";
    }
    return fetch(`${this._basePath}cards/${id}/likes`, {
      method: method,
      headers: this._getHeaders(),
    }).then(this._getJSON);
  }

  saveAvatar(data) {
    return fetch(`${this._basePath}users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    }).then(this._getJSON);
  }
}

export const api = new Api(
  "http://localhost:3000/",
  "8f841aa5-d524-4117-84e2-1be232c9909b",
);

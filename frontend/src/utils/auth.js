class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
    };
  }

  _getJSON(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  signup(email, password) {
    const promise = fetch(`${this._baseUrl}/signup`, {
      headers: this._getHeaders(),
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return promise.then(this._getJSON);
  }

  signin(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      headers: this._getHeaders(),
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(this._getJSON)
      .then((res) => {
        if (res.token) {
        console.log('res', res)
          localStorage.setItem("token", res.token);
          return res;
        }
      });
  }

  checkToken(token) {
    const promise = fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    return promise.then(this._getJSON);
  }
}

export const auth = new Auth("http://localhost:3000");

class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res){
    if (res.ok) {
        return res.json();
    } else {
      return Promise.reject(`Error! : ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers
    })

    .then(this._handleResponse);
  }

  getInfoUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers
    })

    .then(this._handleResponse);
  }

  patchUserInfo(item) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,

      body: JSON.stringify({
        name: item.name,
        about: item.about,
      })
    })

    .then(this._handleResponse);
  }

  patchUserAvatar(item) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,

      body: JSON.stringify({
        avatar: item.avatar
      })
    })

    .then(this._handleResponse);
  }

  addNewCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,

      body: JSON.stringify(item)
    })
  }

  addLike() {//Вместо cardId в URL нужно подставить свойство _id соответствующей карточки.
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._handleResponse);
  }

  getCurrentUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._handleResponse);
  }

  deleteLike() {//Вместо cardId в URL нужно подставить свойство _id соответствующей карточки.
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleResponse);
  }

  deleteCard(cardId) {
    // console.log(cardId, `${this._baseUrl}/cards/${cardId}`)
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse);
  }
}

export default Api;

// "Высылаю данные для 9-й проектной работы:


// Токен: 2f88b489-99f5-491c-a88e-5aa5d9bc02d4
// Идентификатор группы: cohort-62"
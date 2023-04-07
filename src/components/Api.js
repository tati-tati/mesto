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
      headers: this._headers
    })

    .then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/user/me`, {
      headers: this._headers
    })

    .then(this._handleResponse);
  }

  patchUserInfo(item) {
    return fetch(`${this._baseUrl}/user/me`, {
      method: 'PATCH',
      headers: this._headers,

      body: JSON.stringify({
        name: item.name,
        about: item.job
      })
    })

    .then(this._handleResponse);
  }

  patchUserAvatar(link) {
    return fetch(`${this._baseUrl}/user/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,

      body: JSON.stringify({
        avatar: link
      })
    })

    .then(this._handleResponse);
  }

  addNewCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,

      body: JSON.stringify({
      name: item.name,
      link: item.link
      })
    })
  }

  addLike() {//Вместо cardId в URL нужно подставить свойство _id соответствующей карточки.
    return fetch(`${this._baseUrl}/cards/cardId/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
  }

  deleteLike() {//Вместо cardId в URL нужно подставить свойство _id соответствующей карточки.
    return fetch(`${this._baseUrl}/cards/cardId/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  deleteCard() {

  }


}

export default Api;

// "Высылаю данные для 9-й проектной работы:


// Токен: 2f88b489-99f5-491c-a88e-5aa5d9bc02d4
// Идентификатор группы: cohort-62"
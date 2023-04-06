class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
    // ...
  }

  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '2f88b489-99f5-491c-a88e-5aa5d9bc02d4',
    'Content-Type': 'application/json'
  }
});

// "Высылаю данные для 9-й проектной работы:


// Токен: 2f88b489-99f5-491c-a88e-5aa5d9bc02d4
// Идентификатор группы: cohort-62"
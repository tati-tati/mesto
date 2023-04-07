class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards', {
      headers: {
        authorization: '2f88b489-99f5-491c-a88e-5aa5d9bc02d4'
      }
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    });
  }

  // другие методы работы с API
}

export default Api;

// "Высылаю данные для 9-й проектной работы:


// Токен: 2f88b489-99f5-491c-a88e-5aa5d9bc02d4
// Идентификатор группы: cohort-62"
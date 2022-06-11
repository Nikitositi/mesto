export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  // Метод - сообщение во время загрузки
  _rendering(button, isLoading) {
    // isLoading ? button.textContent = 'Сохранение...' : button.textContent = 'Сохранить';
    if (isLoading === true) {
      button.textContent = 'Сохранение...';
    } else {
      button.textContent = 'Сохранить';
    }
  }

  getData(additive) {
    return fetch(this._url + additive, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  patchProfile(data, button) {
    this._rendering(button, true);
    return fetch(this._url + '/users/me', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this._rendering(button, false);
      });
  }

  addNewCard(data, button) {
    this._rendering(button, true);
    return fetch(this._url + '/cards', {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this._rendering(button, false);
      });
  }
  deleteCard(id) {
    this._rendering(button, true);
    return fetch(this._url + '/cards/' + id, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this._rendering(button, false);
      });
  }

  handleCard(id, action) {
    if (action === true) {
      this._method = "PUT";
    } else {
      this._method = "DELETE";
    }
    return fetch(this._url + '/cards/likes/' + id, {
      method: this._method,
      headers: this._headers,
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      });
  }

  updateAvatar(data, button) {
    this._rendering(button, true);
    return fetch(this._url + '/users/me/avatar', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarlink,
      }),
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this._rendering(button, false);
      });
  }

}
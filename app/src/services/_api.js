import {Cookies, Dialog, Notify} from 'quasar'
export class API {
  static async makeRequest(request) {
    const noty = Notify.create({
      position: 'top-right',
      message: 'Получение данных',
      timeout: 0,
      group: false,
      spinner: true,
      color: 'primary'
    })
    try {
      const response = await request
      if (response.data.description) {
        noty({
          timeout: 2500,
          message: response.data.description,
          color: 'positive',
          spinner: false,
          icon: 'done'
        })
      } else {
        noty()
      }

      if (response.data.success) {
        return Promise.resolve(response.data)
      }
      return Promise.reject(response.description)
    } catch (e) {
      switch (e.response?.status) {
        case 403:
          Dialog.create({
            title: 'Ошибка доступа',
            message: `${e.response.data.description}`,
            html: true,
            persistent: true
          }).onOk(() => {
            Cookies.remove('token')
            window.location.href = `${window.origin}/security`
          })
          break;
        case 401:
          Dialog.create({
            title: 'Ошибка сессии',
            message: 'Ваша сессия истекла, необходимо авторизоваться!',
            persistent: true
          }).onOk(() => {
            Cookies.remove('token')
            window.location.href = `${window.origin}/security`
          })
          break;
        default:
          noty({
            icon: 'report',
            message: e.response?.data.description ? e.response.data.description : `Ошибка: ${e.message}`,
            color: 'negative',
            timeout: 2500,
            spinner: false
          })
          break;
      }
      return Promise.reject(e)
    }
  }
  static async makeRequestSilently(request) {
    try {
      const response = await request
      return Promise.resolve(response.data)
    } catch (e) {
      switch (e.response?.status) {
        case 403:
          Dialog.create({
            title: 'Ошибка доступа',
            message: `${e.response.data.description}.`,
            html: true,
            persistent: true
          }).onOk(() => {
            Cookies.remove('token')
            window.location.href = `${window.origin}/security`
          })
          break;
        case 401:
          Dialog.create({
            title: 'Ошибка сессии',
            message: 'Ваша сессия истекла, необходимо авторизоваться!',
            persistent: true
          }).onOk(() => {
            Cookies.remove('token')
            window.location.href = `${window.origin}/security`
          })
          break;
      }
      return Promise.reject(e)
    }
  }
}

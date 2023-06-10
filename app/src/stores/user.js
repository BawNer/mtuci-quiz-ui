import { defineStore } from "pinia";
import { api } from "boot/axios";
import { Cookies, Notify } from "quasar";

export const useUserStore = defineStore('user', {
  actions: {
    login({ login, password }) {
      api.post('/users/login', {
        login, password
      }).then((response) => {
        Cookies.set('token', response.headers.get('authorization').split(' ')[1], {
          expires: 1,
          sameSite: "Strict",
          secure: true
        })
        api.defaults.headers.common['Authorization'] = response.headers.get('authorization')
        this.router.push('/')
      }).catch((err) => {
        Notify.create({
          icon: 'report',
          message: err.response?.data.description ? err.response.data.description : `Ошибка: ${err.message}`,
          color: 'negative',
          timeout: 2500,
          spinner: false
        })
      })
    },
    logout() {
      if (Cookies.has('token')) {
        Cookies.remove('token')
      }
      window.location.href = `${window.origin}/security`
    }
  }
})

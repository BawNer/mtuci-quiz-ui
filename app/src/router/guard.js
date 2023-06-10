import { Cookies } from "quasar";

export default class RouteProtection {
  static checkAuth (to, from, next) {
    if (Cookies.has('token')) {
      next()
    } else {
      next('/security')
    }
  }
}

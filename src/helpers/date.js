export default class DateHelper {
  static getLocale(date) {
    const d = new Date(date)
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
  }
}

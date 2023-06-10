import {API} from "src/services/_api";
import {api} from "boot/axios";

export default class QuizService {
  static async getAllQuiz() {
    return await API.makeRequest(api.get('/quiz/'))
  }
  static async getQuizByHash(hash) {
    return await API.makeRequest(api.get(`/quiz/${hash}`))
  }
  static async saveRespond(quizID, answers) {
    return await API.makeRequest(api.post('/quiz/respond', {
      quizID,
      answers
    }))
  }
}

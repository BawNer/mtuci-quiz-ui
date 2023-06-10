<template>
  <q-page class="flex flex-center">
    <template v-if="!isLoaded">
      <div>
        <q-spinner-ball
          color="primary"
          size="2em"
        />
        <q-tooltip :offset="[0, 8]">QSpinnerBall</q-tooltip>
      </div>
    </template>
    <template v-else>
      <q-card style="width: 600px">
        <q-card-section class="q-pb-none">
          <div class="text-h6">{{quiz.title}}</div>
          <q-separator spaced></q-separator>
        </q-card-section>
        <q-card-section>
          <div
            class="column"
            v-for="(question, qid) in quiz.questions"
            :key="question.id"
          >
            <div v-show="qid === quizQuestionId">
              <div class="col">
                <q-item class="q-ma-none q-pa-none">
                  <q-item-section>
                    <q-item-label class="text-h5">{{question.label}}</q-item-label>
                    <q-item-label caption>{{question.description}}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div class="col q-my-md text-h6">Ответы:</div>

              <div class="col">
                <q-item
                  v-for="answer in question.answersOptions"
                  :key="answer.id"
                  tag="label"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-radio v-model="questionAnswer[qid]" :val="answer" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{answer.label}}</q-item-label>
                    <q-item-label>{{answer.description}}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            label="Предыдущий вопрос"
            no-caps
            flat
            dense
            @click="quizQuestionId--"
            :disable="quizQuestionId < 1"
          ></q-btn>
          <q-btn
            v-if="quizQuestionId < quiz.questions.length - 1"
            label="Следующий вопрос"
            no-caps
            unelevated
            color="primary"
            dense
            @click="quizQuestionId++"
            :disable="quizQuestionId >= quiz.questions.length - 1 || typeof questionAnswer[quizQuestionId] === 'undefined'"
          ></q-btn>
          <q-btn
            v-else
            label="Завершить"
            no-caps
            unelevated
            color="positive"
            dense
            :disable="typeof questionAnswer[quizQuestionId] === 'undefined'"
            @click="onSaveHandler(quiz.id)"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </template>
  </q-page>
</template>

<script setup>
  import {onBeforeMount, ref} from "vue";
  import {useRoute, useRouter} from "vue-router";
  import QuizService from "src/services/_quiz";
  import {useUserStore} from "stores/user";

  const route = useRoute()
  const userStore = useUserStore()
  const quiz = ref(null)
  const isLoaded = ref(false)
  const quizQuestionId = ref(0)
  const questionAnswer = ref([])

  onBeforeMount(() => {
    QuizService.getQuizByHash(route.params.hash).then(response => {
      quiz.value = response.quiz
      isLoaded.value = true
    })
  })

  const onSaveHandler = (quizID) => {
    QuizService.saveRespond(quizID, questionAnswer.value).then(() => {
      userStore.logout()
    })
  }
</script>

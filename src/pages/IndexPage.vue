<template>
  <q-page
    padding
    :class="isLoaded ? '' : 'flex flex-center'"
  >
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
      <q-table
        title="Опросы"
        :columns="columns"
        :rows="quizzes"
        :pagination="{
          rowsPerPage: 0
        }"
        no-data-label="Нет доступных опросов"
      >
        <template v-slot:body-cell-questions="props">
          <q-td :props="props">
            {{props.row.questions.length}}
          </q-td>
        </template>
        <template v-slot:body-cell-createdAt="props">
          <q-td :props="props">
            {{DateHelper.getLocale(props.row.createdAt)}}
          </q-td>
        </template>
        <template v-slot:body-cell-link="props">
          <q-td :props="props">
            <q-btn
              label="Пройти опрос"
              :to="`/quiz/${props.row.quizHash}`"
              flat
              dense
              no-caps
              color="primary"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </template>
  </q-page>
</template>

<script setup>
  import {onBeforeMount, ref} from "vue";
  import QuizService from "src/services/_quiz";
  import DateHelper from "../helpers/date";

  const quizzes = ref([])
  const isLoaded = ref(false)
  const columns = [
    { name: 'title', label: 'Название', field: 'title', align: 'left' },
    { name: 'questions', label: 'Вопросов', field: 'questions', align: 'center' },
    { name: 'link', label: 'Ссылка на опрос', field: 'link', align: 'center' },
    { name: 'createdAt', label: 'Создан', field: 'createdAt', align: 'center' }
  ]

  onBeforeMount(() => {
    QuizService.getAllQuiz().then((response) => {
      quizzes.value = response.quizzes
      isLoaded.value = true
    }).catch(() => {
      isLoaded.value = false
    })
  })
</script>

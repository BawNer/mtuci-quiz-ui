<template>
  <q-page class="flex flex-center">
    <q-card style="width: 400px" bordered>
      <q-card-section class="text-center q-pb-none">
        <div class="text-h6">
          <span class="text-primary">СКФ</span> МТУСИ
        </div>
      </q-card-section>
      <q-form
        autofocus
        @submit="onAuthHandler"
        ref="authForm"
      >
        <q-card-section>
          <q-input
            dense
            outlined
            label="Логин"
            v-model="user.login"
            class="q-mb-sm"
            hide-bottom-space
            hide-hint
            :rules="[
            v => !!v || 'Поле не должно быть пустым'
          ]"
          ></q-input>

          <q-input
            dense
            outlined
            label="Пароль"
            v-model="user.password"
            class="q-mb-sm"
            :type="showPassword ? 'tel' : 'password'"
            hide-bottom-space
            hide-hint
            :rules="[
            v => !!v || 'Поле не должно быть пустым'
          ]"
          >
            <template v-slot:append>
              <q-btn
                flat
                dense
                @click="() => showPassword = !showPassword"
                :icon="showPassword ? 'visibility_off' : 'visibility'"
              ></q-btn>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            no-caps
            dense
            color="primary"
            unelevated
            type="submit"
          >Авторизоваться</q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "stores/user";

const userStore = useUserStore()
const authForm = ref(null)
const showPassword = ref(false)
const user = ref({
  login: '',
  password: ''
})

const onAuthHandler = () => {
  authForm.value.validate().then((result) => {
    if (result) {
      userStore.login(user.value)
    }
  })
}
</script>

<style scoped>

</style>

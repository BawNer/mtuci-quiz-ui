<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered>
      <q-toolbar>
        <q-list class="row q-mx-auto">
          <template
            v-for="link in links"
            :key="link.label"
          >
            <q-item
              clickable
              exact
              :to="link.path"
              active-class="text-amber"
            >
              <q-item-section avatar>
                <q-icon :name="link.icon"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{link.label}}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
        <q-item clickable @click="onLogout">
          <q-item-section avatar>
            <q-icon name="logout"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>Выход</q-item-label>
          </q-item-section>
        </q-item>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>
<script setup>
import { useUserStore } from "stores/user";

const links = [
  {
    label: 'Главная',
    icon: 'home',
    path: '/'
  },
]
const userStore = useUserStore()
const onLogout = () => {
  userStore.logout()
}
</script>

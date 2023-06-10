<template>
  <router-view />
</template>

<script setup>
import {onBeforeMount} from "vue";
import {Cookies} from "quasar";
import {api} from "boot/axios";

onBeforeMount(() => {
  if (Cookies.has("token")) {
    api.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get("token")}`
  }
})
</script>

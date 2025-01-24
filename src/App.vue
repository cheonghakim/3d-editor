<script setup lang="ts">
import { useRoute } from "vue-router";
import AlarmToast from "./components/toast/AlarmToast.vue";

const $route = useRoute();
</script>

<template>
  <router-view :key="$route.fullPath" />
  <AlarmToast></AlarmToast>
</template>

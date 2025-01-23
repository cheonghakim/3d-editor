import { createApp } from "vue";

import "@/css/app.scss";

import App from "./App.vue";
import { createBootstrap } from "bootstrap-vue-next";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(createBootstrap());
app.use(createPinia());
app.mount("#app");

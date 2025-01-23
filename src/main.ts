import { createApp } from "vue";

import "@/css/app.scss";

import App from "./App.vue";
import { createBootstrap } from "bootstrap-vue-next";
import { createPinia } from "pinia";
import eventBus$ from "@/plugins/eventBus";
import router from "@/router/index";

const app = createApp(App);
app.use(router);
app.use(createBootstrap());
app.use(createPinia());
app.mount("#app");

export { eventBus$, app };

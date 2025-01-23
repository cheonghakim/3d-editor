export default [
  /**
   * Error
   */
  {
    path: "/404",
    name: "404",
    component: () =>
      import(
        /* webpackChunkName: "Error" */ "@/views/v1/utility/ErrorPage404.vue"
      ),
  },
  {
    path: "/500",
    name: "500",
    component: () =>
      import(
        /* webpackChunkName: "Error" */ "@/views/v1/utility/ErrorPage500.vue"
      ),
  },
  {
    path: "/403",
    name: "403",
    component: () =>
      import(
        /* webpackChunkName: "Error" */ "@/views/v1/utility/ErrorPage403.vue"
      ),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "404",
  },
];

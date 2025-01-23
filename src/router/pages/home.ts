export default [
  {
    path: "/",
    name: "Default",
    component: () =>
      import(
        /* webpackChunkName: "Home" */ "@/views/v1/layout/DefaultLayout.vue"
      ),
    meta: {
      requiresAuth: true,
    },
    children: [],
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Guest" */ "@/views/v1/login/UserLogin.vue"),
    meta: {
      requiresAuth: false,
    },
  },
];

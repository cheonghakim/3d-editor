export default [
  {
    path: "/",
    name: "Default",
    component: () =>
      import(
        /* webpackChunkName: "Home" */ "@/views/v1/layout/DefaultLayout.vue"
      ),
    redirect: "/editor",
    children: [
      {
        path: "editor",
        name: "Editor",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "@/views/v1/editor/3DEditor.vue"
          ),
      },
    ],
  },
];

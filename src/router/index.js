import { createRouter, createWebHistory } from "vue-router"

import { BaseLayout } from '../layouts';

const routes = [
  { path: "/",
    component: BaseLayout,
    redirect: "/home",
    meta: {
      keepAlive: true,
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home/index.vue'),
      },
      {
        path: "/login",
        name: "login",
        component: () => import(/* webpackChunkName: "Login" */ '../views/Login/index.vue'),
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

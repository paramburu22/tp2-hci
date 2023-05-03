import {createRouter, createWebHistory} from "vue-router";
import LogIn from '../views/LogIn.vue'

const router = createRouter( {
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LogIn
    },
    {
      path: '/home',
      component: () => import('../views/Home.vue')
    }
  ]
})

export default router

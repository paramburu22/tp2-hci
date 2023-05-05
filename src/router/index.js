import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'
// import HomeView from '../views/HomeScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LogIn,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import("../views/HomeScreen.vue"),
    },
    {
      path: '/misdispositivos',
      name: 'misdispositivos',
      component: () => import("../views/MisDispositivos.vue"),
    }
  ]
  
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'

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
    },
    {
      path: '/misrutinas',
      name: 'misrutinas',
      component: () => import("../views/Rutinas.vue")
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: () => import("../views/User.vue"),
    },
    {
      path: '/room/:id',
      name: 'room',
      component: () => import("../views/Room.vue"),
    }
  ]
  
})

export default router

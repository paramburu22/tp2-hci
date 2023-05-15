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
      component: () => import("../views/Homes.vue"),
    },
    {
      path: '/mydevices/:id',
      name: 'mydevices',
      component: () => import("../views/MisDispositivos.vue"),
    },
    {
      path: '/myroutines',
      name: 'myroutines',
      component: () => import("../views/Rutinas.vue")
    },
    {
      path: '/room/:id',
      name: 'room',
      component: () => import("../views/Room.vue"),
    },
    {
      path: '/routinecreation',
      name:'routinecreation',
      component: () => import("../views/RoutineCreation.vue"),
    },
    {
      path: '/help',
      name: 'help',
      component: () => import("../views/Help.vue")
    },
  ]
  
})

export default router

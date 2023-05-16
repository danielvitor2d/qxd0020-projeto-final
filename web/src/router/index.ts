import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'
import HomeView from '../views/HomeView.vue'
import EditTest from '../views/EditTest.vue'
import RecoverPassword from '../views/RecoverPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/admin/edit-test',
      name: 'admin-edit-test',
      component: EditTest
    },
    {
      path: '/auth/recover-password',
      name: 'recover-password',
      component: RecoverPassword
    },
    {
      path: '/auth/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/auth/login',
      name: 'login',
      component: Login
    },
  ]
})

export default router

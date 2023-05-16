import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import EditTest from '../views/EditTestView.vue'
import CoursesView from '../views/CoursesView.vue'
import Registration from '../views/RegistrationView.vue'
import RecoverPassword from '../views/RecoverPasswordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/courses',
      name: 'courses',
      component: CoursesView
    },
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

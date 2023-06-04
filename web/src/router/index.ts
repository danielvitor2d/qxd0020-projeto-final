import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: () => import('@/layouts/MinimalLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/LoginView.vue')
        },
        {
          path: 'registration',
          name: 'registration',
          component: () => import('@/views/RegistrationView.vue')
        },
        {
          path: 'recover-password',
          name: 'recover-password',
          component: () => import('@/views/RecoverPasswordView.vue')
        },
      ]
    },
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: 'courses',
          name: 'courses',
          component: () => import('@/views/CoursesView.vue')
        },
      ]
    },
    {
      path: '/admin',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: 'tests',
          name: 'tests',
          component: () => import('@/views/TestsView.vue')
        },
        {
          path: 'create-test',
          name: 'create-test',
          component: () => import('@/views/CreateTestView.vue')
        },
        {
          path: 'edit-test',
          name: 'edit-test',
          component: () => import('@/views/EditTestView.vue')
        },
      ]
    },
  ]
})

export default router

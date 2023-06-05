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
          name: 'LoginPage',
          component: () => import('@/views/LoginView.vue')
        },
        {
          path: 'registration',
          name: 'RegistrationPage',
          component: () => import('@/views/RegistrationView.vue')
        },
        {
          path: 'recover-password',
          name: 'RecoverPasswordPage',
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
          name: 'HomePage',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: 'courses',
          name: 'CoursesPage',
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
          name: 'TestsPage',
          component: () => import('@/views/TestsView.vue')
        },
        {
          path: 'test/:id',
          name: 'TestSingle',
          component: () => import('@/views/TestView.vue')
        },
        {
          path: 'test/:id/edit',
          name: 'EditTestSingle',
          component: () => import('@/views/TestView.vue')
        },
        {
          path: 'create-test',
          name: 'CreateTestPage',
          component: () => import('@/views/CreateTestView.vue')
        },
      ]
    },
  ]
})

export default router

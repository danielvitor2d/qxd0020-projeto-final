import { useAuthStore } from '@/stores/authStore'
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
        }
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
        {
          path: 'tests',
          name: 'TestsPage',
          component: () => import('@/views/TestsView.vue')
        },
        {
          path: 'test/:id/answer-test',
          name: 'AnswerTestPage',
          component: () => import('@/views/AnswerTestView.vue')
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: 'tests',
          name: 'AdminTestsPage',
          component: () => import('@/views/AdminTestsView.vue')
        },
        {
          path: 'test/:id',
          name: 'TestSingle',
          component: () => import('@/views/TestView.vue')
        },
        {
          path: 'test/:id/edit',
          name: 'EditTestSingle',
          component: () => import('@/views/SaveTestView.vue')
        },
        {
          path: 'test/create',
          name: 'CreateTestPage',
          component: () => import('@/views/SaveTestView.vue')
        }
      ],
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isLogged } = useAuthStore()

  if (to.matched.some(record => record.meta.requiresAuth) && !isLogged) {
    next('/auth/login')
  } else [
    next()
  ]
})

export default router

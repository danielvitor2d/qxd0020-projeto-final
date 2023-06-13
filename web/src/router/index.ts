import { createRouter, createWebHistory } from 'vue-router'
import { checkAuthenticated } from './middlewares/checkAuthenticated'
import { checkRole } from './middlewares/checkRole'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
          path: '/',
          children: [
            {
              path: 'tests',
              name: 'TestsPage',
              component: () => import('@/views/TestsView.vue')
            },
            {
              path: 'tests/history',
              name: 'AnswerTestsHistoryView',
              component: () => import('@/views/AnswerTestsHistoryView.vue')
            },
            {
              path: 'test/:id/history',
              name: 'AnswersHistoryView',
              component: () => import('@/views/AnswersHistoryView.vue')
            },
            {
              path: 'test/:id/answer-test',
              name: 'AnswerTestPage',
              component: () => import('@/views/AnswerTestView.vue')
            },
            {
              path: 'result/:userId/:testId/:createdAt',
              name: 'ResultUserTestPage',
              component: () => import('@/views/ResultUserTestPage.vue')
            },
          ],
          meta: {
            middleware: [checkAuthenticated]
          }
        }
      ],
    },
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
        middleware: [checkRole, checkAuthenticated]
      }
    },
    {
      path: '/unauthorized',
      name: 'UnauthorizedPage',
      component: () => import('@/views/UnauthorizedView.vue')
    },
    {
      path: '/unauthenticated',
      name: 'UnauthenticatedPage',
      component: () => import('@/views/UnauthenticatedView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFoundPage',
      component: () => import('@/views/NotFoundView.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const middlewares = to.meta.middleware as Array<any>
  if (middlewares) {
    middlewares.forEach(middleware => {
      middleware(to, from, next);
    });
  } else {
    next()
  }
})

export default router

import RouteProtection from './guard'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: RouteProtection.checkAuth,
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'quiz/:hash', component: () => import('pages/QuizResponder.vue') }
    ]
  },
  {
    path: '/security',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AuthPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

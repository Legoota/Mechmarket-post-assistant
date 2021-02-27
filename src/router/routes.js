
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  // 404
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

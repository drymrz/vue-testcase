import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'login' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/masteritem/list',
      name: 'masteritem-list',
      component: () => import('../views/master-item/listsView.vue')
    },
    {
      path: '/transaction/list',
      name: 'transaction-list',
      component: () => import('../views/transaction/listsView.vue')
    },
    {
      path: '/transaction/detail/item/:Oid',
      props: true,
      name: 'transaction-detail',
      component: () => import('../views/transaction/detailView.vue')
    }
  ]
})

export default router

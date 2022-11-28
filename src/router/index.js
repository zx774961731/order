import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { basicRoutes, EMPTY_ROUTE, NOT_FOUND_ROUTE, asyncRoutes } from './routes'
import { getToken } from '@/utils'
import { useUserStore } from '@/store'

const isHash = import.meta.env.VITE_USE_HASH === 'true'
export const router = createRouter({
  history: isHash ? createWebHashHistory('/') : createWebHistory('/'),
  routes: [...basicRoutes, EMPTY_ROUTE, NOT_FOUND_ROUTE, ...asyncRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export async function setupRouter(app) {
  app.use(router)
}

router.beforeEach((to, from, next) => {
  const token = getToken()
  const WHITE_LIST = ['/login', '/404']
  useUserStore()
  if (token) {
    next()
  } else {
    if (WHITE_LIST.includes(to.path)) {
      return next()
    } else {
      useUserStore().logout()
    }
  }
})

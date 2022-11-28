import { router } from '@/router'

export function toLogin() {
  console.log(333)
  router.replace({
    path: '/login',
  })
}

export function toFourZeroFour() {
  router.replace({
    path: '/404',
  })
}

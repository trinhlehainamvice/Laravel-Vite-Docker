import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { getCurrentUser } from 'vuefire'

export default async function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const user = await getCurrentUser()
  if (to.name !== 'Login' && to.meta.requiredAuth && !user) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && user) {
    next({ name: 'Home' })
  } else {
    next()
  }
}

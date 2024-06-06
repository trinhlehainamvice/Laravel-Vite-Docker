import { createRouter, createWebHistory } from 'vue-router'
import authMiddleware from './middleware/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@views/LoginView.vue'),
      meta: { standalone: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@views/ProfileView.vue'),
      meta: { requiredAuth: true }
    }
  ]
})

router.beforeEach(authMiddleware)

export default router

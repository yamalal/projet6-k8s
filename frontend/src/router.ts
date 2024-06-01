import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './shared/guards';
import { useUser } from './shared/stores';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/TheHome.vue'),
    },
    {
      path: '/connexion',
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import('@/views/TheLogin.vue'),
    },
    {
      path: '/inscription',
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import('@/views/TheSignup.vue'),
    },
    {
      path: '/profil',
      beforeEnter: [isAuthenticatedGuard],
      component: () => import('@/views/TheProfile.vue'),
    },
    {
      path: '/:notfound(.*)*',
      component: () => import('@/views/TheNotFound.vue'),
    },
  ],
});

router.beforeEach(async () => {
  const userStore = useUser();
  if (!userStore.loaded) {
    await userStore.fetchCurrentUser();
  }
});

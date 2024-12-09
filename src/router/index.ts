import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/login', component: () => import('@/components/Login.vue') },
  {
    path: '/talent-search',
    component: () => import('@/modules/cross-company-talent/views/TalentSearch.vue'),
    meta: { requiresAuth: true, role: 'HR' }
  },
  {
    path: '/talent-management',
    component: () => import('@/modules/internal-talent-management/views/TalentManagement.vue'),
    meta: { requiresAuth: true, role: 'Admin' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

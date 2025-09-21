import { createRouter, createWebHistory } from 'vue-router';
import PublicLayout from '../views/PublicLayout.vue';
import AdminDashboard from '../views/AdminDashboard.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: PublicLayout },
    { path: '/admin', name: 'admin', component: AdminDashboard },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;

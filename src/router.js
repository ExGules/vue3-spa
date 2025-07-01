import { createRouter, createWebHistory } from 'vue-router';

const IncomesPage = () => import('./pages/IncomesPage.vue');
const OrdersPage = () => import('./pages/OrdersPage.vue');
const SalesPage = () => import('./pages/SalesPage.vue');
const StocksPage = () => import('./pages/StocksPage.vue');

const routes = [
  { path: '/', redirect: '/incomes' },
  { path: '/incomes', component: IncomesPage },
  { path: '/orders', component: OrdersPage },
  { path: '/sales', component: SalesPage },
  { path: '/stocks', component: StocksPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 
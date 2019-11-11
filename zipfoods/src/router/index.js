import Vue from 'vue';
import VueRouter from 'vue-router';

import ShowHome from '@/components/pages/HomePage.vue';
import ShowProducts from '@/components/pages/ProductsPage.vue';
import ShowCategories from '@/components/pages/CategoriesPage.vue';
import ProductPage from '@/components/pages/ProductPage.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: ShowHome, name: 'home' },
  {
    path: '/products',
    component: ShowProducts,
    name: 'products',
  },
  {
    path: '/categories',
    component: ShowCategories,
    name: 'categories',
  },
  {
    path: '/products/:id',
    component: ProductPage,
    name: 'product',
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

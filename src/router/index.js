import Layout from "@/views/layout/Layout.vue";
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Registration from '../views/Registration.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'login' },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },

    {
      path: '/registration',
      name: 'registration',
      component: Registration,
    },
    {
      path: "/users",
      name: "users",
      component: Layout,
      meta: { requiresAuth: true }, 
    }
    
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = true; 

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' }); 
  } else {
    next();
  }
});


export default router

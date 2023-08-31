import porseshVaPasokh from '@/views/porseshVaPasokh/index.vue';
import { createRouter, createWebHistory } from 'vue-router';
import mezagShenasi from '@/views/mezagShenasi/index.vue';
import attarpich from '@/views/attarpich/index.vue';
import defaultLayout from '@/layout/default.vue';
import notFound from '@/views/not-found.vue';
import login from '@/views/login/index.vue';
////////////////////////////
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'defaultLayout',
      component: defaultLayout,
      children: [
        {
          path: '',
          name: 'attarpich',
          component: attarpich
        },
        {
          path: '/mezagShenasi',
          name: 'mezagShenasi',
          component: mezagShenasi
        },
        {
          path: '/porseshVaPasokh',
          name: 'mezagShenasi',
          component: porseshVaPasokh
        },

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: notFound
    }
  ]
})

export default router

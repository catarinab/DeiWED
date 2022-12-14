import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/attendees',
      name: 'attendees',
      component: () => import('@/views/deiwed/AttendeesView.vue'),
    },
    {
      path: '/addAttendee',
      name: 'addAttendee',
      component: () => import('@/views/deiwed/AddAttendeeView.vue'),
    },
    {
      path: '/dishes',
      name: 'dishes',
      component: () => import('@/views/deiwed/DishesView.vue'),
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: () => import('@/views/deiwed/SessionsView.vue'),
    },
    {
      path: '/getSession',
      name: 'getSession',
      component: () => import('@/views/deiwed/GetSessionView.vue'),
    },
  ],
});

export default router;

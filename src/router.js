import Vue from 'vue';
import VueRouter from 'vue-router'; 

import SignIn from "./components/sign_in";
import SignUp from "./components/sign_up";
import Dashboard from "./components/dashboard";
import store from './store';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { 
      path: "/sign-in",
      name: "sign-in",
      component: SignIn,
      meta: {
        requiresAuth: false,
      }
    },
    { 
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
      meta: {
        requiresAuth: false,
      }
    },
    { 
      path: "/dashboard", 
      name: "dashboard", 
      component: Dashboard, 
      meta: {
        requiresAuth: true,
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  const pageRequiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthPage = to.matched.some(record => ['sign-in', 'sign-up'].includes(record.name))
  const isLoggedIn = store.getters.isLoggedIn;
  
  if (pageRequiresAuth) {
    // Redirect to sign-in if attempting to access a page requiring authentication
    if (!isLoggedIn) {
      next({ name: 'sign-in' });
    }
  }

  if (isAuthPage) {
    // Redirect to dashboard if attempting to access an auth page (sign-up or sign-in)
    if (isLoggedIn) {
      next({ name: 'dashboard' })
    }
  }

  next();
});

export default router;

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
  const toPageRequiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const toAuthPage = to.matched.some(record => ['sign-in', 'sign-up'].includes(record.name))
  const fromAuthPage = from.matched.some(record => ['sign-in', 'sign-up'].includes(record.name))
  const isLoggedIn = store.getters.isLoggedIn;
  
  if (toPageRequiresAuth) {
    // Redirect to sign-in if attempting to access a page requiring authentication
    if (!isLoggedIn) {
      store.dispatch('signOut');
      return next({ name: 'sign-in' });
    }
    // If not from an auth page and is logged in, refresh the json web token.
    if (isLoggedIn && !fromAuthPage) {
      store.dispatch('refreshJwt', store.getters.getToken);
      return next();
    }
  }

  if (toAuthPage && isLoggedIn) {
    // Redirect to dashboard if attempting to access an auth page (sign-up or sign-in)
    return next({ name: 'dashboard' })
  }

  return next();
});

export default router;

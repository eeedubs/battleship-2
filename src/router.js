import Vue from 'vue';
import VueRouter from 'vue-router'; 

import Dashboard from "./components/dashboard";
import GameScreen from "./components/game_screen";
import SignIn from "./components/sign_in";
import SignUp from "./components/sign_up";

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
        requires_auth: false,
      },
    },
    { 
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
      meta: {
        requires_auth: false,
      },
    },
    { 
      path: "/dashboard", 
      name: "dashboard", 
      component: Dashboard, 
      meta: {
        requires_auth: true,
      },
    },
    {
      path: "/games:id",
      name: "games",
      component: GameScreen,
      meta: {
        requires_auth: true,
      },
    },
    {
      path: '/',
      redirect: '/sign-in',
    },
  ],
});

router.beforeEach(async(to, from, next) => {
  const to_page_requires_auth = to.matched.some(record => record.meta.requires_auth)
  const to_auth_page = to.matched.some(record => ['sign-in', 'sign-up'].includes(record.name))
  const from_auth_page = from.matched.some(record => ['sign-in', 'sign-up'].includes(record.name))
  const is_signed_in = store.getters.is_signed_in;
  
  // Accessing /sign-in or /sign-up pages.
  if (to_auth_page) {
    if (is_signed_in){
      // Redirect to dashboard if signed in.
      return next({ name: 'dashboard' })
    } else {
      // Continue to page.
      return next();
    }
  }
  // Accessing a page requiring authorization.
  if (to_page_requires_auth) {
    if (is_signed_in) {
      if (!from_auth_page) {
        // If signed in and not coming directly from /sign-in or /sign-up, refresh the JWT.
        let response = await store.dispatch('refresh_jwt')

        if (response){ 
          // If the response is truthy, continue to page.
          return next() 
        } else {
          // Else (response is falsey), redirect to /sign-in.
          return next({ name: 'sign-in' });
        }
      } else {
        // Else (coming from /sign-in or /sign-up), continue to page.
        return next();
      }
    } else {
      // Else (is not signed in), redirect to /sign-in. 
      return next({ name: 'sign-in' });
    }
  }
});

export default router;

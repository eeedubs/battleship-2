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
      beforeEnter: (to, from, next) => {
        return checkIfSignedIn(to, from, next);
      }
    },
    { 
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
      meta: {
        requires_auth: false,
      },
      beforeEnter: (to, from, next) => {
        return checkIfSignedIn(to, from, next);
      }
    },
    { 
      path: "/dashboard", 
      name: "dashboard", 
      component: Dashboard,
      meta: {
        requires_auth: true,
      },
      beforeEnter: (to, from, next) => {
        return handleAuthorizedRoute(to, from, next);
      },
    },
    {
      path: "/games/:id",
      name: "games",
      component: GameScreen,
      meta: {
        requires_auth: true,
      },
      beforeEnter: (to, from, next) => {
        return handleAuthorizedRoute(to, from, next);
      }
    },
    {
      path: '/',
      redirect: '/sign-in',
    },
  ],
});

const checkIfSignedIn = (to, from, next) => {
  if (store.getters.isSignedIn) {
    return next({ name: 'dashboard' });
  }
  return next();
};

const handleAuthorizedRoute = async(to, from, next) => {
  const fromAuthPage = from.matched.some(record => ['sign-in', 'sign-up'].includes(record.name))
  
  if (!store.getters.isSignedIn){
    return next({ name: 'sign-in' });
  } else {
    if (!fromAuthPage) {
      let response = await store.dispatch('refreshJwt')
      if (response){ 
        return next();
      }

      return next({ name: 'sign-in' });
    }
    return next();
  }
};

export default router;

import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import LandingPage from "@/components/LandingPage";
import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";
import SpacesList from "@/components/Space/SpacesList";
import SpacePage from "@/components/Space/SpacePage";

window.axios = require('axios');
Vue.use(Router);

const router = new Router({
    routes: [
      {
        path: '/',
        name: 'LandingPage',
        component: LandingPage
      },
      {
        path: '/',
        name: 'SpacePage',
        component: SpacePage
      },

      {
        path: "/signin",
        name: 'Login',
        component: Login,
        beforeEnter: (to, from, next) => {
          next(!window.auth_check)
        },
      },
      {
        path: "/signup",
        name: 'Register',
        component: Register,
        beforeEnter: (to, from, next) => {
          next(!window.auth_check)
        },
      },
      {
        path: "/spaces",
        name: 'Spaces',
        component: SpacesList,
        beforeEnter: (to, from, next) => {
          next(window.auth_check)
        }
      }
    ]
  },
);
router.beforeEach((to, from, next) => {
  var subdir = window.location.host.split(".")[0];
  var domain = "chatclient";
  if (subdir !== domain) {
    next({name: "SpacePage", params: {subdomain: subdir}})
  } else {
    next()
  }
});

export default router;

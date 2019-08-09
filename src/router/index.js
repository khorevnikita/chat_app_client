import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import LandingPage from "@/components/LandingPage";
import SpacesList from "@/components/Space/SpacesList";
import SpaceMain from "@/components/SpaceMain";
import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";
import NewChannel from "@/components/Space/Channel/NewChannel";

window.axios = require('axios');
Vue.use(Router);

/**
 * CHECK TOKEN IN LOCAL STORAGE
 */
const token = localStorage.getItem('user-token');
window.has_token = false;
if (token) {
  axios.defaults.headers.common['Authorization'] = token;
  window.has_token = true;
}

/**
 * CHECK IS SUBDOMAIN
 */

let subdomain = window.location.host.split(".")[0];
let host = "chatclient";

var indexPage = {
  path: '/',
  name: 'LandingPage',
  component: LandingPage
};
if (subdomain === host) {
  if (has_token) {
    indexPage = {
      path: '/',
      name: 'SpaceIndex',
      component: SpaceMain
    }
  }
}
const router = new Router({
  routes: [
    indexPage,
      {
        path: "/signin",
        name: 'Login',
        component: Login,
      },
      {
        path: "/signup",
        name: 'Register',
        component: Register,
      },
      {
        path: "/spaces",
        name: 'Spaces',
        component: SpacesList,
      },
    {
      path: "/channel/:id",
      name: 'Channel',
      component: SpaceMain,
    },
    {
      path: "/new-channel",
      name: 'NewChannel',
      component: NewChannel,
    },

    ]
  },
);

export default router;

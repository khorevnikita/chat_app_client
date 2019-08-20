import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import LandingPage from "@/components/LandingPage";
import SpacesList from "@/components/Space/SpacesList";
import SpaceMain from "@/components/SpaceMain";
import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";
import NewChannel from "@/components/Space/Channel/NewChannel";
import NewSpace from "@/components/Space/NewSpace";
import Settings from "@/components/Space/Channel/Settings";
import Members from "@/components/Space/Channel/Members";
import InviteUser from "@/components/Space/InviteUser";
import VerifyEmail from "@/components/Auth/VerifyEmail";
import Logout from "@/components/Auth/Logout";

window.axios = require('axios');
Vue.use(Router);

window.Cookies = require("js-cookie");

/**
 * CHECK IS SUBDOMAIN
 */

let subdomain = window.location.host.split(".")[0];
let host = "chatclient";

let token = Cookies.get("user-token");
console.log(token)
if (token) {
  axios.defaults.headers.common['Authorization'] = token;
}
var indexPage = {
  path: '/',
  name: 'LandingPage',
  component: LandingPage
};
if (subdomain !== host) {
  if (token) {
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
      path: "/verify-email",
      name: 'VerifyEmail',
      component: VerifyEmail,
    },
    {
      path: "/logout",
      name: 'Logout',
      component: Logout,
    },

    {
      path: "/spaces",
      name: 'Spaces',
      component: SpacesList,
    },
    {
      path: "/new-space",
      name: 'NewSpaces',
      component: NewSpace,
    },
    {
      path: "/channel/:id/settings",
      name: 'ChannelSettings',
      component: Settings,
    },
    {
      path: "/channel/:id/members",
      name: 'ChannelMembers',
      component: Members,
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
    {
      path: "/invite-user",
      name: 'InviteUser',
      component: InviteUser,
    },
    ]
  },
);

export default router;

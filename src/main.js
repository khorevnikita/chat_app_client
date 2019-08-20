// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

window.swal = require('sweetalert2');
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(Vuetify);

require('jquery');
require('bootstrap');
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  vuetify: new Vuetify(),
});

document.addEventListener("DOMContentLoaded", function (event) {
  resize();
});
window.addEventListener('resize', function (event) {
  resize()
});

function resize() {
  let window_height = window.innerHeight;
  let body_height = document.getElementsByTagName('body')[0].clientHeight;
  if (window_height > body_height) {
    document.body.style.cssText = "height:" + window_height + "px !important"
  }
}

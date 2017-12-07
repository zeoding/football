// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";
import VueLazyload from "vue-lazyload";
import axios from "./http";
import api from "./api";

Vue.config.productionTip = false;
Vue.config.debug = true;
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "/src/assets/loading.gif",
  loading: "/src/assets/loading.gif"
});

new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});

if (window.sessionStorage && window.sessionStorage.navIndex) {
  store.dispatch("changeNavIndex", window.sessionStorage.navIndex);
}
if (window.sessionStorage && window.sessionStorage.indexTitle) {
  store.dispatch("changeIndexTitle", window.sessionStorage.indexTitle);
}

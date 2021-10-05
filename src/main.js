import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import router from "./router";
import contextMenuPlugin from "./context-menu-plugin";

Vue.use(contextMenuPlugin);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

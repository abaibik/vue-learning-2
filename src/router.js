import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "App",
    component: App,
  },

  {
    path: "/add/payment/:category",
    name: "Add",
    component: App,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;

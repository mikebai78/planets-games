import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import GameDetail from "../views/GameDetail";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/game",
    name: "game",
    component: GameDetail
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

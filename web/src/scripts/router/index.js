import Vue from "vue";
import VueRouter from "vue-router";
import LayOut from "../views/layout/index";
import Login from "../views/login/index";
import CreateMod from "../views/createMod/index";
import ModList from "../views/modList/index";

Vue.use(VueRouter);
/**
 * 积木系统模块开发前端路由配置
 */
const router = new VueRouter({
  mode: "hash",
  base: __dirname,
  routes: [
    {
      path: "/createmod",
      name: "createMod",
      component: CreateMod
    },
    {
      path: "/modlist",
      name: "modList",
      component: ModList
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(LayOut)
})
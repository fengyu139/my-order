import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import useLoginStore from "@/store/loginStore";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/home.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/order/order.vue"),
  },
  {
    path: "/manage",
    name: "manage",
    component: () => import("@/views/manage/manage.vue"),
  },
  {
    path: "/statistics",
    name: "statistics",
    component: () => import("@/views/statistics/statistics.vue"),
  },
  {
    path: "/orderDetail",
    name: "orderDetail",
    component: () => import("@/views/orderDetail/orderDetail.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/settlement",
    name: "settlement",
    component: () => import("@/views/settlement/settlement.vue"),
  },
  {
    path: "/myProfile",
    name: "myProfile",
    component: () => import("@/views/demo/demo.vue"),
  },
  {
    path: "/myChat",
    name: "myChat",
    component: () => import("@/views/chat/chat.vue"),
  },
];
const openRoutes = ["/login", "/orderDetail", "/settlement", "/myChat"];
const router = createRouter({
  history: createWebHashHistory("/"),
  routes,
});
router.beforeEach((to, from, next) => {
  const store = useLoginStore();
  const { isLogin } = store;
  if (!isLogin && !openRoutes.includes(to.path)) {
    next({ path: "/login" });
    return;
  }
  next();
});
export default router;

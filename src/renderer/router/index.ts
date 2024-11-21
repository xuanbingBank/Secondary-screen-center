import { createRouter, createWebHashHistory } from "vue-router";
import routeMap from "./router-map";

const router = createRouter({
  // 指定使用Hash路由
  history: createWebHashHistory(),
  // 路由规则数组，每一个路由规则都是一个对象
  routes: routeMap
});

// 添加路由守卫
router.beforeEach((to, from, next) => {
  // 如果路由不存在，重定向到默认路由
  if (!to.name) {
    next({ path: '/feature/download' });
  } else {
    next();
  }
});

export default router;

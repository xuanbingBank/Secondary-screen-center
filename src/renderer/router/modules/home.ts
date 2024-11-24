import { RouteRecordRaw } from "vue-router";
import { DashboardOutlined, HomeOutlined } from '@ant-design/icons-vue';

export const homeRoute: RouteRecordRaw = {
  path: "/home",
  name: "home",
  component: () => import("../../views/primary.vue"),
  meta: {
    title: "首页",
    icon: DashboardOutlined,
    primary: true
  },
  children: [
    {
      path: "",
      name: "home-index",
      component: () => import("../../views/home/index.vue"),
      meta: { 
        title: "首页",
        icon: HomeOutlined,
        closable: false
      }
    },
    {
      path: "software",
      name: "home-software",
      component: () => import("../../views/home/software.vue"),
      meta: {
        title: "软件库",
      }
    }
  ]
}; 
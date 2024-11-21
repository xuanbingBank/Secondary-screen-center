import { RouteRecordRaw } from "vue-router";
import {
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';

const routeMap: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/feature/download"
  },
  {
    path: "/feature",
    name: "feature",
    component: () => import("../views/primary.vue"),
    meta: {
      title: "功能",
      icon: AppstoreOutlined,
      primary: true
    },
    redirect: "/feature/download",
    children: [
      {
        path: "download",
        name: "download",
        component: () => import("../views/feature/download.vue"),
        meta: { title: "文件下载" }
      },
      {
        path: "request",
        name: "request",
        component: () => import("../views/feature/request.vue"),
        meta: { title: "网络请求" }
      }
    ]
  },
  {
    path: "/tools",
    name: "tools",
    component: () => import("../views/primary.vue"),
    meta: {
      title: "工具",
      icon: SettingOutlined,
      primary: true
    },
    redirect: "/tools/md5",
    children: [
      {
        path: "md5",
        name: "md5",
        component: () => import("../views/tools/md5.vue"),
        meta: { title: "文件MD5" }
      },
      {
        path: "debug",
        name: "debug",
        component: () => import("../views/tools/debug.vue"),
        meta: { title: "调试工具" }
      }
    ]
  }
];

export default routeMap;
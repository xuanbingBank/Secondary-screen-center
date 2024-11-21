import { RouteRecordRaw } from "vue-router";
import { AppstoreOutlined, DownloadOutlined, GlobalOutlined } from '@ant-design/icons-vue';

export const featureRoute: RouteRecordRaw = {
  path: "/feature",
  name: "feature",
  component: () => import("../../views/primary.vue"),
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
      component: () => import("../../views/feature/download.vue"),
      meta: { 
        title: "文件下载",
        icon: DownloadOutlined
      }
    },
    {
      path: "request",
      name: "request",
      component: () => import("../../views/feature/request.vue"),
      meta: { 
        title: "网络请求",
        icon: GlobalOutlined
      }
    }
  ]
}; 
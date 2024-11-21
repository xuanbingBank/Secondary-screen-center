import { RouteRecordRaw } from "vue-router";
import {
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ExperimentOutlined,
  DownloadOutlined,
  GlobalOutlined,
  FileSearchOutlined,
  BugOutlined,
  AppstoreAddOutlined
} from '@ant-design/icons-vue';
import { tourStepInfo } from "ant-design-vue/es/vc-tour";

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
        meta: { 
          title: "文件下载",
          icon: DownloadOutlined
        }
      },
      {
        path: "request",
        name: "request",
        component: () => import("../views/feature/request.vue"),
        meta: { 
          title: "网络请求",
          icon: GlobalOutlined
        }
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
      primary: true,
      isSettings: true
    },
    redirect: "/tools/md5",
    children: [
      {
        path: "/md5",
        name: "md5",
        component: () => import("../views/tools/md5.vue"),
        meta: { 
          title: "文件MD5",
          icon: FileSearchOutlined
        }
      },
      {
        path: "/debug",
        name: "debug",
        component: () => import("../views/tools/debug.vue"),
        meta: { 
          title: "调试工具",
          icon: BugOutlined
        }
      }
    ]
  },
  {
    path: "/example",
    name: "example",
    component: () => import("../views/primary.vue"),
    meta: {
      title: "示例",
      icon: ExperimentOutlined,
      primary: true
    },
    redirect: "/example/components-overview",
    children: [
      {
        path: "components-overview",
        name: "components-overview",
        meta: { 
          title: "组件总览",
          icon: AppstoreAddOutlined
        },
        component: () => import("../views/example/ant-design-vue/components-overview.vue"),
      }
    ]
  }
];

export default routeMap;
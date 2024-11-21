import { RouteRecordRaw } from "vue-router";
import { ToolOutlined, FileSearchOutlined, BugOutlined } from '@ant-design/icons-vue';

export const toolsRoute: RouteRecordRaw = {
  path: "/tools",
  name: "tools",
  component: () => import("../../views/primary.vue"),
  meta: {
    title: "工具",
    icon: ToolOutlined,
    primary: true
  },
  redirect: "/tools/md5",
  children: [
    {
      path: "md5",
      name: "md5",
      component: () => import("../../views/tools/md5.vue"),
      meta: { 
        title: "文件MD5",
        icon: FileSearchOutlined
      }
    },
    {
      path: "debug",
      name: "debug",
      component: () => import("../../views/tools/debug.vue"),
      meta: { 
        title: "调试工具",
        icon: BugOutlined
      }
    }
  ]
}; 
import { RouteRecordRaw } from "vue-router";
import { ControlOutlined, FileSearchOutlined } from '@ant-design/icons-vue';

export const settingRoute: RouteRecordRaw = {
  path: "/setting",
  name: "setting",
  component: () => import("../../views/primary.vue"),
  meta: {
    title: "设置",
    icon: ControlOutlined,
    primary: true,
    isSettings: true
  },
  redirect: "/setting/theme",
  children: [
    {
      path: "theme",
      name: "theme",
      component: () => import("../../views/setting/theme.vue"),
      meta: { 
        title: "主题设置",
        icon: FileSearchOutlined
      }
    }
  ]
}; 
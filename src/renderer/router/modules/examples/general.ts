import { RouteRecordRaw } from "vue-router";
import { 
  AppstoreOutlined,
  BorderOutlined,
  FontSizeOutlined
} from '@ant-design/icons-vue';

export const generalRoute: RouteRecordRaw = {
  path: "general",
  name: "general",
  meta: {
    title: "通用",
    icon: AppstoreOutlined,
    primary: true
  },
  children: [
    {
      path: "button",
      name: "examples-antdv-button",
      component: () => import("../../../views/examples/ant-design-vue/general/button.vue"),
      meta: {
        title: "Button 按钮",
        icon: BorderOutlined
      }
    },
    {
      path: "icon",
      name: "examples-antdv-icon",
      component: () => import("../../../views/examples/ant-design-vue/general/icon.vue"),
      meta: {
        title: "Icon 图标",
        icon: BorderOutlined
      }
    },
    {
      path: "typography",
      name: "examples-antdv-typography",
      component: () => import("../../../views/examples/ant-design-vue/general/typography.vue"),
      meta: {
        title: "Typography 排版",
        icon: FontSizeOutlined
      }
    }
  ]
}; 
import { RouteRecordRaw } from "vue-router";
import { 
  AppstoreAddOutlined,
  PushpinOutlined,
  GlobalOutlined,
  BgColorsOutlined,
  AppstoreOutlined
} from '@ant-design/icons-vue';

export const otherRoute: RouteRecordRaw = {
  path: "/other",
  name: "other",
  meta: {
    title: "其他",
    icon: AppstoreAddOutlined,
    primary: true
  },
  children: [
    {
      path: "affix",
      name: "examples-antdv-affix",
      component: () => import("../../../views/examples/ant-design-vue/other/affix.vue"),
      meta: {
        title: "Affix 固钉",
        icon: PushpinOutlined
      }
    },
    {
      path: "configprovider",
      name: "examples-antdv-configprovider",
      component: () => import("../../../views/examples/ant-design-vue/other/configprovider.vue"),
      meta: {
        title: "ConfigProvider 全局化配置",
        icon: GlobalOutlined
      }
    },
    {
      path: "watermark",
      name: "examples-antdv-watermark",
      component: () => import("../../../views/examples/ant-design-vue/other/watermark.vue"),
      meta: {
        title: "Watermark 水印",
        icon: BgColorsOutlined
      }
    },
    {
      path: "app",
      name: "examples-antdv-app",
      component: () => import("../../../views/examples/ant-design-vue/other/app.vue"),
      meta: {
        title: "App 包裹组件",
        icon: AppstoreOutlined
      }
    },
    {
      path: "floatbutton",
      name: "examples-antdv-floatbutton",
      component: () => import("../../../views/examples/ant-design-vue/other/floatbutton.vue"),
      meta: {
        title: "FloatButton 浮动按钮",
        icon: AppstoreOutlined
      }
    }
  ]
}; 
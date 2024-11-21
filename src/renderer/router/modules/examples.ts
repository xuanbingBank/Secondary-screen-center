import { RouteRecordRaw } from "vue-router";
import { 
  ExperimentOutlined,  // 实验/示例
  AppstoreAddOutlined, // 组件总览
  ReadOutlined,        // 文档
  LayoutOutlined,      // 页面布局
  FileTextOutlined,    // 通用页面
  ProfileOutlined,     // 示例总览
  BorderOutlined       // 添加按钮图标
} from '@ant-design/icons-vue';

export const examplesRoute: RouteRecordRaw = {
  path: "/examples",
  name: "examples",
  component: () => import("../../views/primary.vue"),
  meta: {
    title: "示例",
    icon: ExperimentOutlined,
    primary: true
  },
  children: [
    {
      path: "antdv",
      name: "examples-antdv",
      meta: { 
        title: "Ant Design Vue文档",
        icon: ReadOutlined,
        primary: true
      },
      children: [
        {
          path: "overview",
          name: "examples-antdv-overview",
          component: () => import("../../views/examples/antdesignvue/componentsoverview.vue"),
          meta: { 
            title: "组件总览",
            icon: ProfileOutlined
          }
        },
        {
          path: "button",
          name: "examples-antdv-button",
          component: () => import("../../views/examples/ant-design-vue/button.vue"),
          meta: {
            title: "按钮示例",
            icon: BorderOutlined
          }
        }
      ]
    },
    {
      path: "generalpage",
      name: "examples-generalpage",
      component: () => import("../../views/examples/pageexamples/generalpage.vue"),
      meta: {
        title: "通用页面示例",
        icon: LayoutOutlined,
        primary: true
      }
    }
  ]
}; 
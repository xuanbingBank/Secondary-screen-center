import { RouteRecordRaw } from "vue-router";
import { ExperimentOutlined, AppstoreAddOutlined } from '@ant-design/icons-vue';

export const examplesRoute: RouteRecordRaw = {
  path: "/examples",
  name: "examples",
  component: () => import("../../views/primary.vue"),
  meta: {
    title: "示例",
    icon: ExperimentOutlined,
    primary: true
  },
  redirect: "/examples/componentsoverview",
  children: [
    {
      path: "componentsoverview",
      name: "componentsoverview",
      component: () => import("../../views/examples/antdesignvue/componentsoverview.vue"),
      meta: { 
        title: "组件总览",
        icon: AppstoreAddOutlined
      }
    }
  ]
}; 
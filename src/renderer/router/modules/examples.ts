import { RouteRecordRaw } from "vue-router";
import { ExperimentOutlined, AppstoreAddOutlined } from '@ant-design/icons-vue';
import IframePage from "../../components/common/IframePage.vue";
import { h } from 'vue';

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
      path: "overview",
      name: "overview",
      meta: { 
        title: "Ant Design Vue文档",
        icon: AppstoreAddOutlined,
        primary: true
      },
      children: [
        {
          path: "overview",
          name: "overview",
          component: () => import("../../views/examples/ant-design-vue/overview.vue"),
          meta: {
            title: "示例总览"
          }
        }
      ]
    },
    {
      path: "generalpage",
      name: "generalpage",
      meta: {
        title: "页面示例"
      },
      children: [
        {
          path: "generalpage",
          name: "generalpage",
          component: () => import("../../views/examples/pageexamples/generalpage.vue"),
          meta: {
            title: "通用页面示例"
          }
        }
      ]
    }
  ]
}; 
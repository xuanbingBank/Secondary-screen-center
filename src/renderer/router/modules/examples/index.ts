import { RouteRecordRaw } from "vue-router";
import { 
  ExperimentOutlined,
  ReadOutlined,
  ProfileOutlined,
  LayoutOutlined
} from '@ant-design/icons-vue';

import { generalRoute } from './general';
import { layoutRoute } from './layout';
import { navigationRoute } from './navigation';
import { dataentryRoute } from './dataentry';
import { datadisplayRoute } from './datadisplay';
import { feedbackRoute } from './feedback';
import { otherRoute } from './other';

export const examplesRoute: RouteRecordRaw = {
  path: "/examples",
  name: "examples",
  component: () => import("../../../views/primary.vue"),
  meta: {
    title: "示例",
    icon: ExperimentOutlined,
    primary: true
  },
  children: [
    {
      path: "ant-design-vue",
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
          component: () => import("../../../views/examples/antdesignvue/componentsoverview.vue"),
          meta: { 
            title: "组件总览",
            icon: ProfileOutlined
          }
        },
        generalRoute,
        layoutRoute,
        navigationRoute,
        dataentryRoute,
        datadisplayRoute,
        feedbackRoute,
        otherRoute
      ]
    },
    {
      path: "generalpage",
      name: "examples-generalpage",
      component: () => import("../../../views/examples/pageexamples/generalpage.vue"),
      meta: {
        title: "通用页面示例",
        icon: LayoutOutlined,
        primary: true
      }
    }
  ]
}; 
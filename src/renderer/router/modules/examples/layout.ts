import { RouteRecordRaw } from "vue-router";
import { 
  LayoutOutlined,
  BorderOutlined
} from '@ant-design/icons-vue';

export const layoutRoute: RouteRecordRaw = {
  path: "/layout",
  name: "layout",
  meta: {
    title: "布局",
    icon: LayoutOutlined,
    primary: true
  },
  children: [
    {
      path: "divider",
      name: "examples-antdv-divider",
      component: () => import("../../../views/examples/ant-design-vue/layout/divider.vue"),
      meta: {
        title: "Divider 分割线",
        icon: BorderOutlined
      }
    },
    {
      path: "flex",
      name: "examples-antdv-flex",
      component: () => import("../../../views/examples/ant-design-vue/layout/flex.vue"),
      meta: {
        title: "Flex 弹性布局",
        icon: BorderOutlined
      }
    },
    {
      path: "grid",
      name: "examples-antdv-grid",
      component: () => import("../../../views/examples/ant-design-vue/layout/grid.vue"),
      meta: {
        title: "Grid 栅格",
        icon: BorderOutlined
      }
    },
    {
      path: "layout",
      name: "examples-antdv-layout",
      component: () => import("../../../views/examples/ant-design-vue/layout/layout.vue"),
      meta: {
        title: "Layout 布局",
        icon: BorderOutlined
      }
    },
    {
      path: "space",
      name: "examples-antdv-space",
      component: () => import("../../../views/examples/ant-design-vue/layout/space.vue"),
      meta: {
        title: "Space 间距",
        icon: BorderOutlined
      }
    }
  ]
}; 
import { RouteRecordRaw } from "vue-router";
import { 
  CompassOutlined,
  LinkOutlined,
  MenuOutlined,
  HomeOutlined,
  OrderedListOutlined,
  DownOutlined
} from '@ant-design/icons-vue';

export const navigationRoute: RouteRecordRaw = {
  path: "navigation",
  name: "navigation",
  meta: {
    title: "导航",
    icon: CompassOutlined,
    primary: true
  },
  children: [
    {
      path: "anchor",
      name: "examples-antdv-anchor",
      component: () => import("../../../views/examples/ant-design-vue/navigation/anchor.vue"),
      meta: {
        title: "Anchor 锚点",
        icon: LinkOutlined
      }
    },
    {
      path: "breadcrumb",
      name: "examples-antdv-breadcrumb",
      component: () => import("../../../views/examples/ant-design-vue/navigation/breadcrumb.vue"),
      meta: {
        title: "Breadcrumb 面包屑",
        icon: MenuOutlined
      }
    },
    {
      path: "dropdown",
      name: "examples-antdv-dropdown",
      component: () => import("../../../views/examples/ant-design-vue/navigation/dropdown.vue"),
      meta: {
        title: "Dropdown 下拉菜单",
        icon: DownOutlined
      }
    },
    {
      path: "menu",
      name: "examples-antdv-menu",
      component: () => import("../../../views/examples/ant-design-vue/navigation/menu.vue"),
      meta: {
        title: "Menu 导航菜单",
        icon: MenuOutlined
      }
    },
    {
      path: "pageheader",
      name: "examples-antdv-pageheader",
      component: () => import("../../../views/examples/ant-design-vue/navigation/pageheader.vue"),
      meta: {
        title: "PageHeader 页头",
        icon: HomeOutlined
      }
    },
    {
      path: "pagination",
      name: "examples-antdv-pagination",
      component: () => import("../../../views/examples/ant-design-vue/navigation/pagination.vue"),
      meta: {
        title: "Pagination 分页",
        icon: OrderedListOutlined
      }
    },
    {
      path: "steps",
      name: "examples-antdv-steps",
      component: () => import("../../../views/examples/ant-design-vue/navigation/steps.vue"),
      meta: {
        title: "Steps 步骤条",
        icon: OrderedListOutlined
      }
    }
  ]
}; 
import { RouteRecordRaw } from "vue-router";
import { 
  TableOutlined,
  UserOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  UnorderedListOutlined,
  TagsOutlined,
  ClockCircleOutlined,
  QuestionCircleOutlined,
  ApartmentOutlined,
  PictureOutlined
} from '@ant-design/icons-vue';

export const datadisplayRoute: RouteRecordRaw = {
  path: "datadisplay",
  name: "datadisplay",
  meta: {
    title: "数据展示",
    icon: TableOutlined,
    primary: true
  },
  children: [
    {
      path: "avatar",
      name: "examples-antdv-avatar",
      component: () => import("../../../views/examples/ant-design-vue/datadisplay/avatar.vue"),
      meta: {
        title: "Avatar 头像",
        icon: UserOutlined
      }
    },
    {
      path: "calendar",
      name: "examples-antdv-calendar",
      component: () => import("../../../views/examples/ant-design-vue/datadisplay/calendar.vue"),
      meta: {
        title: "Calendar 日历",
        icon: CalendarOutlined
      }
    },
    {
      path: "card",
      name: "examples-antdv-card",
      component: () => import("../../../views/examples/ant-design-vue/datadisplay/card.vue"),
      meta: {
        title: "Card 卡片",
        icon: CreditCardOutlined
      }
    },
    {
      path: "image",
      name: "examples-antdv-image",
      component: () => import("../../../views/examples/ant-design-vue/datadisplay/image.vue"),
      meta: {
        title: "Image 图片",
        icon: PictureOutlined
      }
    },
    {
      path: "list",
      name: "examples-antdv-list",
      component: () => import("../../../views/examples/ant-design-vue/datadisplay/list.vue"),
      meta: {
        title: "List 列表",
        icon: UnorderedListOutlined
      }
    },
    {
      path: "tag",
      name: "examples-antdv-tag",
      component: () => import("../../../views/examples/ant-design-vue/datadisplay/tag.vue"),
      meta: {
        title: "Tag 标签",
        icon: TagsOutlined
      }
    },
    {
      path: "timeline",
      name: "examples-antdv-timeline",
      component: () => import("../../../views/examples/ant-design-vue/datadisplay/timeline.vue"),
      meta: {
        title: "Timeline 时间轴",
        icon: ClockCircleOutlined
      }
    },
    {
      path: "tooltip",
      name: "examples-antdv-tooltip",
      component: () => import("../../../views/examples/ant-design-vue/datadisplay/tooltip.vue"),
      meta: {
        title: "Tooltip 文字提示",
        icon: QuestionCircleOutlined
      }
    },
    {
      path: "tree",
      name: "examples-antdv-tree",
      component: () => import("../../../views/examples/ant-design-vue/datadisplay/tree.vue"),
      meta: {
        title: "Tree 树形控件",
        icon: ApartmentOutlined
      }
    }
  ]
}; 
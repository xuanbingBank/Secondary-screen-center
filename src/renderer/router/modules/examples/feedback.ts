import { RouteRecordRaw } from "vue-router";
import { 
  AlertOutlined,
  MessageOutlined,
  NotificationOutlined,
  CheckCircleOutlined,
  QuestionCircleOutlined,
  DashboardOutlined
} from '@ant-design/icons-vue';

export const feedbackRoute: RouteRecordRaw = {
  path: "feedback",
  name: "feedback",
  meta: {
    title: "反馈",
    icon: AlertOutlined,
    primary: true
  },
  children: [
    {
      path: "alert",
      name: "examples-antdv-alert",
      component: () => import("../../../views/examples/ant-design-vue/feedback/alert.vue"),
      meta: {
        title: "Alert 警告提示",
        icon: AlertOutlined
      }
    },
    {
      path: "drawer",
      name: "examples-antdv-drawer",
      component: () => import("../../../views/examples/ant-design-vue/feedback/drawer.vue"),
      meta: {
        title: "Drawer 抽屉",
        icon: AlertOutlined
      }
    },
    {
      path: "message",
      name: "examples-antdv-message",
      component: () => import("../../../views/examples/ant-design-vue/feedback/message.vue"),
      meta: {
        title: "Message 全局提示",
        icon: MessageOutlined
      }
    },
    {
      path: "modal",
      name: "examples-antdv-modal",
      component: () => import("../../../views/examples/ant-design-vue/feedback/modal.vue"),
      meta: {
        title: "Modal 对话框",
        icon: AlertOutlined
      }
    },
    {
      path: "notification",
      name: "examples-antdv-notification",
      component: () => import("../../../views/examples/ant-design-vue/feedback/notification.vue"),
      meta: {
        title: "Notification 通知提醒框",
        icon: NotificationOutlined
      }
    },
    {
      path: "popconfirm",
      name: "examples-antdv-popconfirm",
      component: () => import("../../../views/examples/ant-design-vue/feedback/popconfirm.vue"),
      meta: {
        title: "Popconfirm 气泡确认框",
        icon: QuestionCircleOutlined
      }
    },
    {
      path: "progress",
      name: "examples-antdv-progress",
      component: () => import("../../../views/examples/ant-design-vue/feedback/progress.vue"),
      meta: {
        title: "Progress 进度条",
        icon: DashboardOutlined
      }
    },
    {
      path: "result",
      name: "examples-antdv-result",
      component: () => import("../../../views/examples/ant-design-vue/feedback/result.vue"),
      meta: {
        title: "Result 结果",
        icon: CheckCircleOutlined
      }
    }
  ]
}; 
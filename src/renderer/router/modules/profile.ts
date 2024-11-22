import { RouteRecordRaw } from 'vue-router';
import { 
  DatabaseOutlined, 
  DesktopOutlined,
  ReadOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  ToolOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons-vue';

export const profileRoutes: RouteRecordRaw = {
    path: '/profile',
    name: 'profile',
    component: () => import('../../views/primary.vue'),
    meta: {
      title: '资料库',
      icon: DatabaseOutlined,
      primary: true
    },
    redirect: '/profile/software',
    children: [
      {
        path: 'software',
        name: 'software',
        component: () => import('../../views/profile/software.vue'),
        meta: {
          title: '软件资料',
          icon: DesktopOutlined
        }
      }
    ]
};
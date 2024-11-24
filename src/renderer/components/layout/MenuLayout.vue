<template>
  <!-- 一级固定折叠菜单 -->
  <a-layout-sider
    width="48"
    class="primary-sider"
    :collapsed="true"
    :trigger="null"
    collapsible
  >
    <div class="logo">
      <img src="/electron.svg" alt="logo" />
    </div>
    <div class="primary-menu-container">
      <a-menu 
        theme="dark" 
        mode="inline" 
        v-model:selectedKeys="primarySelectedKeys"
        @select="handlePrimarySelect"
      >
        <a-menu-item 
          v-for="route in normalMenuItems" 
          :key="String(route.name)"
        >
          <template #icon>
            <component :is="route.meta?.icon" />
          </template>
        </a-menu-item>

        <template v-if="settingMenuItems.length">
          <a-menu-divider />
          <a-menu-divider />
          
          <a-menu-item 
            v-for="route in settingMenuItems" 
            :key="String(route.name)"
          >
            <template #icon>
              <component :is="route.meta?.icon" />
            </template>
          </a-menu-item>
        </template>
      </a-menu>
    </div>
  </a-layout-sider>

  <!-- 二级可折叠菜单 -->
  <a-layout-sider
    v-model:collapsed="collapsed"
    class="secondary-sider"
    :trigger="null"
    collapsible
    :collapsedWidth="48"
    width="200"
  >
    <div class="menu-wrapper">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        @select="handleMenuSelect"
      >
        <recursive-menu
          v-for="item in currentSubMenus"
          :key="String(item.name)"
          :menu-info="item"
        />
      </a-menu>
    </div>

    <div class="collapse-trigger" @click="handleCollapse">
      <component 
        :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"
        class="trigger-icon"
      />
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { MenuProps } from 'ant-design-vue';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons-vue';
import routeMap from '../../router/router-map';
import RecursiveMenu from '../menu/RecursiveMenu.vue';

// 状态管理
const route = useRoute();
const collapsed = ref(false);
const primarySelectedKeys = ref<string[]>(['feature']);
const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

// 计算属性
const normalMenuItems = computed(() => 
  routeMap.filter(route => route.meta?.primary && !route.meta?.isSettings)
);

const settingMenuItems = computed(() => 
  routeMap.filter(route => route.meta?.primary && route.meta?.isSettings)
);

const currentSubMenus = computed(() => {
  const currentPrimaryRoute = routeMap.find(r => r.name === primarySelectedKeys.value[0]);
  return currentPrimaryRoute?.children || [];
});

// 事件处理
const emit = defineEmits<{
  (e: 'menu-select', key: string): void;
}>();

const handlePrimarySelect: MenuProps['onSelect'] = (info) => {
  const route = routeMap.find(r => r.name === info.key.toString());
  if (route) {
    primarySelectedKeys.value = [route.name as string];
  }
};

const handleMenuSelect = (info: { key: string | number }) => {
  emit('menu-select', String(info.key));
};

const handleCollapse = () => {
  collapsed.value = !collapsed.value;
};

// 初始化
const initSelectedKeys = () => {
  const matched = route.matched;
  if (matched.length) {
    const primaryRoute = matched[0];
    primarySelectedKeys.value = [primaryRoute.name as string];
    
    if (matched.length > 1) {
      selectedKeys.value = [matched[matched.length - 1].name as string];
      openKeys.value = matched
        .slice(1, -1)
        .map(item => item.name as string);
    }
  }
};

onMounted(() => {
  initSelectedKeys();
});
</script>

<style scoped>
.primary-sider {
  overflow: hidden;
  flex: 0 0 48px !important;
  max-width: 48px !important;
  min-width: 48px !important;
  width: 48px !important;
}

.logo {
  height: 48px;
  padding: 8px;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.secondary-sider {
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #f0f0f0;
  height: 100vh;
}

.menu-wrapper {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.menu-wrapper::-webkit-scrollbar {
  width: 6px;
}

.menu-wrapper::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  transition: background-color 0.3s;
}

.menu-wrapper:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
}

.menu-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.collapse-trigger {
  position: absolute;
  right: -15px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s;
}

.secondary-sider:hover .collapse-trigger {
  opacity: 1;
}

.trigger-icon {
  color: #595959;
  font-size: 16px;
  transition: color 0.3s;
}

.trigger-icon:hover {
  color: #1890ff;
}

.primary-menu-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 48px);
}

:deep(.ant-menu-dark .ant-menu-item-divider) {
  margin: 4px 0;
  background-color: rgba(255, 255, 255, 0.1);
}

:deep(.ant-menu-dark.ant-menu-inline .ant-menu-item) {
  margin: 4px;
  width: calc(100% - 8px);
  border-radius: 4px;
}

:deep(.ant-menu-item) {
  height: 48px;
  line-height: 48px;
  margin: 4px;
}

:deep(.ant-menu-item-icon) {
  vertical-align: 0 !important;
}

:deep(.ant-layout-sider-children) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.primary-sider :deep(.ant-menu-inline) {
  border-right: none;
}

.primary-sider :deep(.ant-menu-item) {
  height: 40px;
  width: 40px;
  margin: 5px 4px;
}

* {
  user-select: none;
}

/* 修改二级菜单折叠状态的样式 */
:deep(.ant-menu-inline-collapsed) {
  width: 48px !important;
}

:deep(.ant-menu-inline-collapsed .ant-menu-item),
:deep(.ant-menu-inline-collapsed .ant-menu-submenu-title) {
  padding: auto;
  text-align: center;
}

/* 确保折叠状态下图标居中 */
:deep(.ant-menu-inline-collapsed .ant-menu-item .anticon),
:deep(.ant-menu-inline-collapsed .ant-menu-submenu-title .anticon) {
  margin: 0;
  font-size: 16px;
  line-height: 40px;
}
</style> 
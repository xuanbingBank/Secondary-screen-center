<template>
  <!-- 左侧一级菜单栏 -->
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
      <!-- 主要菜单 -->
      <a-menu 
        theme="dark" 
        mode="inline" 
        v-model:selectedKeys="primarySelectedKeys"
        @select="handlePrimarySelect"
      >
        <!-- 普通菜单项 -->
        <template v-for="route in normalMenuItems" :key="String(route.name)">
          <a-menu-item>
            <template #icon>
              <component :is="route.meta?.icon" />
            </template>
          </a-menu-item>
        </template>

        <!-- 分隔线 -->
        <a-menu-divider v-if="settingMenuItems.length" />
        <a-menu-divider v-if="settingMenuItems.length" />

        <!-- 设置菜单项 -->
        <template v-for="route in settingMenuItems" :key="String(route.name)">
          <a-menu-item>
            <template #icon>
              <component :is="route.meta?.icon" />
            </template>
          </a-menu-item>
        </template>
      </a-menu>
    </div>
  </a-layout-sider>

  <!-- 右侧二级菜单栏 -->
  <a-layout-sider
    v-model:collapsed="collapsed"
    class="secondary-sider"
    :trigger="null"
    collapsible
  >
    <div class="menu-wrapper">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="vertical"
        @select="handleMenuSelect"
      >
        <template v-for="item in currentSubMenus" :key="String(item.name)">
          <!-- 有子菜单的菜单项 -->
          <a-sub-menu 
            v-if="item.children?.length" 
            :key="String(item.name)"
            :popupClassName="collapsed ? 'persistent-submenu' : ''"
          >
            <template #icon>
              <component :is="item.meta?.icon" />
            </template>
            <template #title>{{ item.meta?.title }}</template>
            <a-menu-item 
              v-for="child in item.children"
              :key="String(child.name)"
            >
              {{ child.meta?.title }}
            </a-menu-item>
          </a-sub-menu>
          <!-- 无子菜单的菜单项 -->
          <a-menu-item 
            v-else 
            :key="`${String(item.name)}`"
          >
            <template #icon>
              <component :is="item.meta?.icon" />
            </template>
            <span>{{ item.meta?.title }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </div>

    <!-- 折叠按钮 -->
    <div class="collapse-trigger">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger-icon"
        @click="handleCollapse"
      />
      <menu-fold-outlined
        v-else
        class="trigger-icon"
        @click="handleCollapse"
      />
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { MenuProps } from 'ant-design-vue';
import routeMap from '../../router/router-map';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons-vue';

const route = useRoute();
const collapsed = ref(false);
const primarySelectedKeys = ref<string[]>(['feature']);
const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

// 计算一级菜单项
const primaryMenuItems = computed(() => {
  return routeMap.filter(route => route.meta?.primary);
});

// 计算当前二级菜单项
const currentSubMenus = computed(() => {
  const currentPrimaryRoute = routeMap.find(r => r.name === primarySelectedKeys.value[0]);
  return currentPrimaryRoute?.children || [];
});

// 计算普通菜单项（非设置项）
const normalMenuItems = computed(() => {
  return routeMap.filter(route => route.meta?.primary && !route.meta?.isSettings);
});

// 计算设置菜单项
const settingMenuItems = computed(() => {
  return routeMap.filter(route => route.meta?.primary && route.meta?.isSettings);
});

// 处理一级菜单选择
const handlePrimarySelect: MenuProps['onSelect'] = (info) => {
  const route = routeMap.find(r => r.name === info.key.toString());
  if (route) {
    primarySelectedKeys.value = [route.name as string];
  }
};

// 处理菜单选择
const handleMenuSelect = (info: { key: string | number }) => {
  emit('menu-select', String(info.key));
};

// 处理折叠按钮点击
const handleCollapse = () => {
  collapsed.value = !collapsed.value;
};

// 初始化选中状态
const initSelectedKeys = () => {
  const matched = route.matched;
  if (matched.length) {
    const primaryRoute = matched[0];
    primarySelectedKeys.value = [primaryRoute.name as string];
    
    if (matched.length > 1) {
      selectedKeys.value = [matched[matched.length - 1].name as string];
      openKeys.value = [matched[1].name as string];
    }
  }
};

// 定义事件
const emit = defineEmits<{
  (e: 'menu-select', key: string): void;
}>();

// 初始化
onMounted(() => {
  initSelectedKeys();
});
</script>

<style scoped>
/* 禁止文本选择 */
* {
    user-select: none;
}

/* 一级菜单侧边栏样式 */
.primary-sider {
  overflow: hidden;
  flex: 0 0 48px !important;
  max-width: 48px !important;
  min-width: 48px !important;
  width: 48px !important;
}

/* Logo 样式 */
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

/* 二级菜单侧边栏样式 */
.secondary-sider {
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #f0f0f0;
  height: 100vh;
}

.ant-menu-item-selected {
    margin-left: 10px;
}

/* 菜单内容区域样式 */
.menu-wrapper {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

/* 中间折叠按钮样式 */
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

/* 鼠标悬停时显示折叠按钮 */
.secondary-sider:hover .collapse-trigger {
  opacity: 1;
}

/* 折叠按钮图标样式 */
.trigger-icon {
  color: #595959;
  font-size: 16px;
  transition: color 0.3s;
}

.trigger-icon:hover {
  color: #1890ff;
}

/* 底部折叠按钮样式 */
.bottom-trigger {
  border-top: 1px solid #f0f0f0;
}

.bottom-trigger :deep(.ant-btn) {
  height: 48px;
  border-radius: 0;
}

.bottom-trigger :deep(.ant-btn:hover) {
  color: #1890ff;
  background: #e6f7ff;
}

/* 菜单项样式调整 */
:deep(.ant-menu-item) {
  height: 48px;
  line-height: 48px;
  margin: 0;
}

/* 菜单容器样式 */
:deep(.ant-layout-sider-children) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 一级菜单特殊样式 */
.primary-sider :deep(.ant-menu-inline) {
  border-right: none;
}

.primary-sider :deep(.ant-menu-item) {
  height: 40px;
  width: 40px;
  margin: 5px 4px;
}

/* 菜单图标对齐调整 */
.ant-menu-item-icon {
  vertical-align: 0px !important;
}

/* 主菜单容器布局 */
.primary-menu-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  height: calc(100% - 48px); /* 减去 logo 高度 */
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


</style> 
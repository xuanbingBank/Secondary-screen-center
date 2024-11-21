<template>
  <!-- 左侧菜单栏 -->
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
    <a-menu 
      theme="dark" 
      mode="inline" 
      v-model:selectedKeys="primarySelectedKeys"
      @select="handlePrimarySelect"
    >
      <a-menu-item 
        v-for="route in primaryMenuItems" 
        :key="String(route.name)"
      >
        <template #icon>
          <component :is="route.meta?.icon" />
        </template>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>

  <!-- 二级菜单栏 -->
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
        mode="inline"
        @select="handleMenuSelect"
      >
        <template v-if="currentSubMenus.length">
          <template v-for="item in currentSubMenus" :key="String(item.name)">
            <!-- 有子菜单 -->
            <a-sub-menu 
              v-if="item.children?.length" 
              :key="String(item.name)"
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
            <!-- 无子菜单 -->
            <a-menu-item 
              v-else 
              :key="String(item.name)"
            >
              <template #icon>
                <component :is="item.meta?.icon" />
              </template>
              <span>{{ item.meta?.title }}</span>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </div>

    <!-- 折叠按钮 -->
    <div class="collapse-trigger">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger-icon"
        @click="() => (collapsed = !collapsed)"
      />
      <menu-fold-outlined
        v-else
        class="trigger-icon"
        @click="() => (collapsed = !collapsed)"
      />
    </div>

    <div class="bottom-trigger">
      <a-button 
        type="text"
        block
        @click="() => (collapsed = !collapsed)"
      >
        <template #icon>
          <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
        </template>
        <span>{{ collapsed ? '展开' : '收起' }}</span>
      </a-button>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { MenuProps } from 'ant-design-vue';
import routeMap from '../../router/router-map';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();

// 状态
const collapsed = ref(false);
const primarySelectedKeys = ref<string[]>(['feature']);
const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

// 定义事件
const emit = defineEmits<{
  (e: 'menu-select', routeName: string): void;
}>();

// 计算一级菜单项
const primaryMenuItems = computed(() => {
  return routeMap.filter(route => route.meta?.primary);
});

// 计算当前二级菜单项
const currentSubMenus = computed(() => {
  const currentPrimaryRoute = routeMap.find(r => r.name === primarySelectedKeys.value[0]);
  if (!currentPrimaryRoute) return [];
  return currentPrimaryRoute.children || [currentPrimaryRoute];
});

// 处理一级菜单选择
const handlePrimarySelect: MenuProps['onSelect'] = (info) => {
  const route = routeMap.find(r => r.name === info.key.toString());
  if (route) {
    if (route.children?.length) {
      emit('menu-select', route.children[0].name as string);
    } else {
      emit('menu-select', route.name as string);
    }
  }
};

// 处理二级菜单选择
const handleMenuSelect: MenuProps['onSelect'] = (info) => {
  emit('menu-select', info.key.toString());
};

// 初始化选中状态
const initSelectedKeys = () => {
  const matched = route.matched;
  if (matched.length) {
    const primaryRoute = matched[0];
    primarySelectedKeys.value = [primaryRoute.name as string];
    selectedKeys.value = [matched[matched.length - 1].name as string];
    
    if (matched.length > 1) {
      openKeys.value = [matched[1].name as string];
    }
  }
};

// 监听路由变化
router.afterEach(() => {
  initSelectedKeys();
});

// 初始化
initSelectedKeys();
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

/* 头部样式 */
.header {
  background: #fff;
  padding: 0 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 9;
}

.content {
  margin: 24px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
}

/* 菜单项样式调整 */
:deep(.ant-menu-item) {
  height: 48px;
  line-height: 48px;
  margin: 0;
}

:deep(.ant-layout-sider-children) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 一级菜单样式调整 */
.primary-sider :deep(.ant-menu-inline) {
  border-right: none;
}

.primary-sider :deep(.ant-menu-item) {
  height: 48px;
  padding: 0 !important;
  margin: 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.primary-sider :deep(.ant-menu-item .anticon) {
  font-size: 18px;
  line-height: 1;
  margin-right: 0;
}

/* 移除一级菜单项的选中背景 */
.primary-sider :deep(.ant-menu-item::after) {
  display: none;
}

.primary-sider :deep(.ant-menu-item.ant-menu-item-selected) {
  background-color: transparent;
}
</style> 
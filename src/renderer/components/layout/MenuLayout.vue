<template>
  <!-- 左侧一级菜单栏 -->
  <a-layout-sider
    width="48"
    class="primary-sider"
    :collapsed="true"
    :trigger="null"
    collapsible
  >
    <!-- Logo区域 -->
    <div class="logo">
      <img src="/electron.svg" alt="logo" />
    </div>
    <!-- 主要菜单容器 -->
    <div class="primary-menu-container">
      <!-- 主要功能菜单 -->
      <a-menu 
        theme="dark" 
        mode="inline" 
        v-model:selectedKeys="primarySelectedKeys"
        @select="handlePrimarySelect"
      >
        <!-- 遍历生成主要菜单项 -->
        <a-menu-item 
          v-for="route in mainMenuItems" 
          :key="String(route.name)"
        >
          <template #icon>
            <component :is="route.meta?.icon" />
          </template>
        </a-menu-item>
      </a-menu>

      <!-- 设置类菜单（底部） -->
      <a-menu 
        theme="dark" 
        mode="inline" 
        class="setting-menu"
        v-model:selectedKeys="primarySelectedKeys"
        @select="handlePrimarySelect"
      >
        <!-- 遍历生成设置菜单项 -->
        <a-menu-item 
          v-for="route in settingMenuItems" 
          :key="String(route.name)"
        >
          <template #icon>
            <component :is="route.meta?.icon" />
          </template>
        </a-menu-item>
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
    <!-- 菜单内容区域 -->
    <div class="menu-wrapper">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        @select="handleMenuSelect"
      >
        <!-- 二级菜单列表 -->
        <template v-if="currentSubMenus.length">
          <template v-for="item in currentSubMenus" :key="String(item.name)">
            <!-- 有子菜单的菜单项 -->
            <a-sub-menu 
              v-if="item.children?.length" 
              :key="String(item.name)"
            >
              <template #icon>
                <component :is="item.meta?.icon" />
              </template>
              <template #title>{{ item.meta?.title }}</template>
              <!-- 子菜单项列表 -->
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
        </template>
      </a-menu>
    </div>

    <!-- 中间折叠按钮 -->
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

    <!-- 底部折叠按钮 -->
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
// 导入所需的组件和工具
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { MenuProps } from 'ant-design-vue';
import routeMap from '../../router/router-map';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';

// 获取路由实例
const router = useRouter();
const route = useRoute();

// 菜单状态管理
const collapsed = ref(false);                        // 二级菜单折叠状态
const primarySelectedKeys = ref<string[]>(['home']); // 一级菜单选中项
const selectedKeys = ref<string[]>([]);              // 二级菜单选中项
const openKeys = ref<string[]>([]);                  // 展开的子菜单

// 定义组件事件
const emit = defineEmits<{
  (e: 'menu-select', routeName: string): void;      // 菜单选择事件
}>();

// 计算主要菜单项（非设置类）
const mainMenuItems = computed(() => {
  return routeMap.filter(route => route.meta?.primary && !route.meta?.isSettings);
});

// 计算设置菜单项
const settingMenuItems = computed(() => {
  return routeMap.filter(route => route.meta?.primary && route.meta?.isSettings);
});

// 计算一级菜单项（所有）
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
    // 更新一级菜单选中状态
    primarySelectedKeys.value = [route.name as string];
    // 清空二级菜单选中状态
    selectedKeys.value = [];
    // 如果有子菜单，展开它
    if (route.children?.length) {
      openKeys.value = [route.name as string];
    }
  }
};

// 处理二级菜单选择
const handleMenuSelect: MenuProps['onSelect'] = (info) => {
  // 触发路由跳转事件
  emit('menu-select', info.key.toString());
};

// 初始化菜单选中状态
const initSelectedKeys = () => {
  const matched = route.matched;
  if (matched.length) {
    // 设置一级菜单选中状态
    const primaryRoute = matched[0];
    primarySelectedKeys.value = [primaryRoute.name as string];
    
    // 只有当前路由匹配时才设置二级菜单选中状态
    if (matched.length > 1) {
      selectedKeys.value = [matched[matched.length - 1].name as string];
      openKeys.value = [matched[1].name as string];
    } else {
      selectedKeys.value = [];
    }
  }
};

// 监听路由变化，更新菜单状态
router.afterEach(() => {
  initSelectedKeys();
});

// 初始化
initSelectedKeys();
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
  height: calc(100% - 48px); /* 减去 logo 高度 */
  justify-content: space-between;
}

/* 设置菜单底部间距 */
.setting-menu {
  margin-bottom: 8px;
}
</style> 
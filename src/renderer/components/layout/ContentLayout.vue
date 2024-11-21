<template>
  <a-layout class="main-container">
    <header-layout 
      :title="currentPageTitle"
      :tabs="visitedTabs"
      :activeTab="activeTab"
      :is-fullscreen="isFullscreen"
      @tab-change="handleTabChange"
      @tab-remove="handleTabRemove"
      @minimize="$emit('minimize')"
      @exit="$emit('exit')"
      @fullscreen="toggleFullscreen"
      @tab-reload="handleTabReload"
      @close-left="handleCloseLeft"
      @close-right="handleCloseRight"
      @close-other="handleCloseOther"
      @close-all="handleCloseAll"
    />

    <a-layout-content :class="['content', { 'content-fullscreen': isFullscreen }]">
      <div v-show="isFullscreen" class="float-fullscreen-btn">
        <a-button 
          type="primary"
          shape="circle"
          @click="toggleFullscreen"
        >
          <template #icon>
            <fullscreen-exit-outlined />
          </template>
        </a-button>
      </div>

      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { FullscreenExitOutlined } from '@ant-design/icons-vue';
import HeaderLayout from './HeaderLayout.vue';
import { visitedTabs, activeTab, addTab, removeTab } from '../../store/tabs';

const route = useRoute();
const router = useRouter();

// 计算当前页面标题
const currentPageTitle = computed(() => {
  return route.meta?.title as string || '首页';
});

// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    activeTab.value = newPath;
    addTab(route);
  },
  { immediate: true }
);

// 处理标签页切换
const handleTabChange = (path: string) => {
  router.push(path);
};

// 处理标签页关闭
const handleTabRemove = (path: string) => {
  const targetIndex = removeTab(path);
};

// 全屏状态
const isFullscreen = ref(false);

// 切换全屏
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

// 重新加载当前页面
const handleTabReload = () => {
  router.go(0);
};

// 关闭左侧标签
const handleCloseLeft = (path: string) => {
  const targetIndex = visitedTabs.value.findIndex(tab => tab.path === path);
  if (targetIndex > 0) {
    visitedTabs.value = visitedTabs.value.filter((tab, index) => {
      return index >= targetIndex || !tab.closable;
    });
    // 如果关闭的包含当前活动标签，切换到目标标签
    if (activeTab.value !== path) {
      router.push(path);
    }
  }
};

// 关闭右侧标签
const handleCloseRight = (path: string) => {
  const targetIndex = visitedTabs.value.findIndex(tab => tab.path === path);
  if (targetIndex < visitedTabs.value.length - 1) {
    visitedTabs.value = visitedTabs.value.filter((tab, index) => {
      return index <= targetIndex || !tab.closable;
    });
    // 如果关闭的包含当前活动标签，切换到目标标签
    if (!visitedTabs.value.find(tab => tab.path === activeTab.value)) {
      router.push(path);
    }
  }
};

// 关闭其他标签
const handleCloseOther = (path: string) => {
  visitedTabs.value = visitedTabs.value.filter(tab => {
    return tab.path === path || !tab.closable;
  });
  // 如果当前活动标签被关闭，切换到保留的标签
  if (activeTab.value !== path) {
    router.push(path);
  }
};

// 关闭全部标签
const handleCloseAll = () => {
  visitedTabs.value = visitedTabs.value.filter(tab => !tab.closable);
  // 如果有首页标签，切换到首页，否则切换到第一个标签
  const firstTab = visitedTabs.value[0];
  if (firstTab) {
    router.push(firstTab.path);
  }
};

defineEmits(['minimize', 'exit']);
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content {
  flex: 1;
  padding: 24px;
  background: #f0f2f5;
  overflow-y: auto;
  transition: all 0.3s;
  position: relative;
}

.content-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  padding: 24px;
  margin: 0;
  background: #fff;
}

/* 悬浮按钮样式 */
.float-fullscreen-btn {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1001;
  transition: opacity 0.3s;
}

.float-fullscreen-btn:hover {
  opacity: 1;
}

.float-fullscreen-btn .ant-btn {
  width: 40px;
  height: 40px;
  font-size: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  opacity: 0.8;
}

.float-fullscreen-btn .ant-btn:hover {
  opacity: 1;
  transform: scale(1.1);
  transition: all 0.3s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 
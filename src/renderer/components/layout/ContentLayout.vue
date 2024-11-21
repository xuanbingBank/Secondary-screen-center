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
      @go-home="goHome"
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
  
  // 如果关闭的是当前标签，且没有其他标签了，才返回首页
  if (path === route.path && visitedTabs.value.length === 0) {
    goHome();
  }
  // 移除自动跳转到其他标签的逻辑
};

// 全屏状态
const isFullscreen = ref(false);

// 切换全屏
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

// 返回首页
const goHome = () => {
  // 添加首页标签
  addTab({
    name: 'home',
    path: '/home',
    meta: { 
      title: '首页',
      closable: false
    }
  });
  // 跳转到首页
  router.push('/home');
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
<template>
  <a-layout class="main-container">
    <!-- 顶栏 -->
    <header-layout 
      :title="currentPageTitle"
      :tabs="visitedTabs"
      :activeTab="activeTab"
      @tab-change="handleTabChange"
      @tab-remove="handleTabRemove"
      @minimize="$emit('minimize')"
      @exit="$emit('exit')"
    />

    <!-- 主页面内容区 -->
    <a-layout-content class="content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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
  
  // 如果关闭的是当前标签，跳转到前一个标签
  if (path === route.path && targetIndex !== undefined) {
    const nextTab = visitedTabs.value[targetIndex - 1] || visitedTabs.value[0];
    if (nextTab) {
      router.push(nextTab.path);
    }
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
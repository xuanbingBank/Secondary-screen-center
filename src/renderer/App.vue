<template>
  <router-view></router-view>
</template>

<style>
#app {
  height: 100vh;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { tabDB } from './utils/db';

const router = useRouter();
const route = useRoute();

// 恢复保存的标签页
const restoreTabs = async () => {
  try {
    const savedTabs = await tabDB.getTabs();
    if (savedTabs.length > 0) {
      // 验证所有标签页的路由是否有效
      const validTabs = savedTabs.filter(tab => {
        try {
          router.resolve(tab.path);
          return true;
        } catch {
          return false;
        }
      });

      if (validTabs.length > 0) {
        // 找到上次激活的标签页
        const activeTab = validTabs.find(tab => tab.active) || validTabs[validTabs.length - 1];
        
        // 如果当前路由不在已保存的标签页中，则导航到上次激活的标签页
        const currentPath = route.path;
        const isCurrentPathValid = validTabs.some(tab => tab.path === currentPath);
        
        if (!isCurrentPathValid) {
          await router.push(activeTab.path);
        }

        // 触发恢复标签页事件
        window.dispatchEvent(new CustomEvent('restore-tabs', {
          detail: {
            tabs: validTabs,
            activeTab: activeTab.path
          }
        }));
      }
    }
  } catch (error) {
    console.error('Failed to restore tabs:', error);
  }
};

onMounted(() => {
  // 延迟执行以确保组件都已加载
  setTimeout(() => {
    restoreTabs();
  }, 100);
});
</script>

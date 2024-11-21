<template>
  <a-layout class="main-container">
    <!-- 顶栏 -->
    <header-layout 
      :title="title"
      @minimize="$emit('minimize')"
      @exit="$emit('exit')"
    />

    <!-- 主页面内容区 -->
    <a-layout-content class="content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import HeaderLayout from './HeaderLayout.vue';

defineProps<{
  title: string;
}>();

defineEmits<{
  (e: 'minimize'): void;
  (e: 'exit'): void;
}>();
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
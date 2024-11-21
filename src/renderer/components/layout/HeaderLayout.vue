<template>
  <a-layout-header class="header">
    <div class="header-left">
      <h2>{{ title }}</h2>
    </div>
    <div class="header-right">
      <a-space>
        <a-button type="text" @click="$emit('minimize')">
          <template #icon><minus-outlined /></template>
        </a-button>
        <a-button type="text" @click="$emit('exit')">
          <template #icon><poweroff-outlined /></template>
        </a-button>
      </a-space>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { MinusOutlined, PoweroffOutlined } from '@ant-design/icons-vue';

interface Props {
  title: string;
}

defineProps<Props>();

defineEmits<{
  (e: 'minimize'): void;
  (e: 'exit'): void;
}>();
</script>

<style scoped>
.header {
  height: 64px;
  padding: 0 24px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 10;
}

.header-left h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
</style> 
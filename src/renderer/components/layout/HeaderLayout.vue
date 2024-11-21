<template>
  <div class="header-container">
    <!-- 顶部标题栏 -->
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

    <!-- 标签页 -->
    <div class="tabs-container">
      <a-tabs
        v-model:activeKey="activeKey"
        type="editable-card"
        hide-add
        size="small"
        @edit="onTabEdit"
        @change="onTabChange"
      >
        <a-tab-pane
          v-for="tab in tabs"
          :key="tab.path"
          :tab="tab.title"
          :closable="tab.closable"
        />
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { MinusOutlined, PoweroffOutlined } from '@ant-design/icons-vue';
import type { TabItem } from '../../store/tabs';
import type { TabsProps } from 'ant-design-vue';
import type { Key } from 'ant-design-vue/es/vc-table/interface';

interface Props {
  title: string;
  tabs: TabItem[];
  activeTab: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'minimize'): void;
  (e: 'exit'): void;
  (e: 'tab-change', path: string): void;
  (e: 'tab-remove', path: string): void;
}>();

const activeKey = computed({
  get: () => props.activeTab,
  set: (value: Key) => emit('tab-change', value.toString())
});

// 标签页切换
const onTabChange: TabsProps['onChange'] = (key: Key) => {
  emit('tab-change', key.toString());
};

// 标签页编辑（关闭）
const onTabEdit: TabsProps['onEdit'] = (targetKey, action) => {
  if (action === 'remove' && targetKey !== undefined) {
    // 确保 targetKey 转换为字符串
    emit('tab-remove', targetKey.toString());
  }
};
</script>

<style scoped>
.header-container {
  background: #fff;
}

.header {
  height: 48px;
  line-height: 48px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.header-left h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}

.tabs-container {
  padding: 0 8px;
  background: #fff;
  height: 36px;
  display: flex;
  align-items: flex-end;
}

:deep(.ant-tabs) {
  background: #fff;
  width: 100%;
}

:deep(.ant-tabs-nav) {
  margin: 0;
  background: #fff;
  height: 32px;
  line-height: 32px;
  margin-bottom: -1px;
}

:deep(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab) {
  background: transparent;
  border-color: #f0f0f0;
  padding: 0 12px;
  height: 28px;
  line-height: 26px;
  font-size: 13px;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
}

:deep(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active) {
  background: #fff;
  border-bottom-color: #fff;
}

:deep(.ant-tabs-tab + .ant-tabs-tab) {
  margin-left: 3px;
}

:deep(.ant-tabs-nav::before) {
  border-bottom: none;
}

:deep(.ant-tabs-tab-remove) {
  margin-left: 6px;
  font-size: 12px;
}

:deep(.ant-btn) {
  height: 28px;
  width: 28px;
  padding: 0;
}

:deep(.anticon) {
  font-size: 14px;
}
</style> 
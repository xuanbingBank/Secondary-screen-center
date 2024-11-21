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
      <div class="tabs-wrapper">
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
        
        <!-- 全屏按钮 -->
        <div class="tabs-extra">
          <a-button 
            type="text" 
            class="fullscreen-btn"
            @click="$emit('fullscreen')"
          >
            <template #icon>
              <fullscreen-outlined v-if="!isFullscreen" />
              <fullscreen-exit-outlined v-else />
            </template>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { 
  MinusOutlined, 
  PoweroffOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons-vue';
import type { TabItem } from '../../store/tabs';
import type { TabsProps } from 'ant-design-vue';
import type { Key } from 'ant-design-vue/es/vc-table/interface';

interface Props {
  title: string;
  tabs: TabItem[];
  activeTab: string;
  isFullscreen?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'minimize'): void;
  (e: 'exit'): void;
  (e: 'fullscreen'): void;
  (e: 'tab-change', path: string): void;
  (e: 'tab-remove', path: string): void;
  (e: 'go-home'): void;
}>();

const activeKey = computed({
  get: () => props.activeTab,
  set: (value: Key) => emit('tab-change', value.toString())
});

// 监听标签页数量
watch(
  () => props.tabs.length,
  (newLength) => {
    // 当标签页数量为0时，触发返回首页事件
    if (newLength === 0) {
      emit('go-home');
    }
  }
);

// 标签页切换
const onTabChange: TabsProps['onChange'] = (key: Key) => {
  emit('tab-change', key.toString());
};

// 标签页编辑（关闭）
const onTabEdit: TabsProps['onEdit'] = (targetKey, action) => {
  if (action === 'remove' && targetKey !== undefined) {
    // 如果当前只剩一个标签页且要关闭它，则触发返回首页
    if (props.tabs.length === 1) {
      emit('go-home');
    } else {
      emit('tab-remove', targetKey.toString());
    }
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
  padding: 2px 8px 0;
  background: #fff;
  height: 34px;
  border-bottom: 1px solid #f0f0f0;
}

.tabs-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  height: calc(100% - 2px);
}

.tabs-wrapper :deep(.ant-tabs) {
  flex: 1;
}

.tabs-wrapper :deep(.ant-tabs-nav) {
  margin: 0;
  height: 30px;
  line-height: 30px;
}

.tabs-wrapper :deep(.ant-tabs-tab) {
  height: 30px;
  line-height: 28px;
  padding: 0 12px !important;
  background: transparent;
  border: 1px solid #f0f0f0;
  transition: all 0.3s;
}

.tabs-wrapper :deep(.ant-tabs-tab-active) {
  background: #fff;
  border-bottom-color: #fff;
}

.tabs-wrapper :deep(.ant-tabs-nav-wrap) {
  padding: 0;
}

.tabs-extra {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding-right: 8px;
  background: #fff;
}

.fullscreen-btn {
  height: 28px;
  width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.45);
  transition: all 0.3s;
}

.fullscreen-btn:hover {
  color: rgba(0, 0, 0, 0.85);
  background: rgba(0, 0, 0, 0.025);
}

/* 全屏时隐藏其他元素 */
:deep(.content-fullscreen) .header,
:deep(.content-fullscreen) .tabs-container {
  display: none;
}
</style> 
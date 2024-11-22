<template>
  <div class="software-container">
    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <a-card :bordered="false">
          <template #title>
            <span class="card-title">
              <desktop-outlined /> 软件资料
            </span>
          </template>
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="overview" tab="概览">
              <a-descriptions :column="2">
                <a-descriptions-item label="软件名称">Secondary Screen Center</a-descriptions-item>
                <a-descriptions-item label="当前版本">1.0.0</a-descriptions-item>
                <a-descriptions-item label="开发框架">Electron + Vue 3</a-descriptions-item>
                <a-descriptions-item label="UI 框架">Ant Design Vue</a-descriptions-item>
              </a-descriptions>
            </a-tab-pane>
            <a-tab-pane key="features" tab="功能特性">
              <a-list :split="false">
                <a-list-item>
                  <template #actions>
                    <a-tag color="blue">已实现</a-tag>
                  </template>
                  <a-list-item-meta title="多屏幕管理">
                    <template #description>支持多个副屏的管理和控制</template>
                  </a-list-item-meta>
                </a-list-item>
                <a-list-item>
                  <template #actions>
                    <a-tag color="blue">已实现</a-tag>
                  </template>
                  <a-list-item-meta title="窗口管理">
                    <template #description>支持窗口的拖拽、缩放和全屏</template>
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DesktopOutlined } from '@ant-design/icons-vue';

const activeKey = ref('overview');
</script>

<style scoped>
.software-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: 100%;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
}

:deep(.ant-descriptions-item-label) {
  font-weight: 500;
}

:deep(.ant-list-item) {
  padding: 12px 0;
}

:deep(.ant-list-item-meta-title) {
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
}

:deep(.ant-list-item-meta-description) {
  font-size: 13px;
}
</style>

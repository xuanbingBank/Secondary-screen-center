<template>
  <div class="overview-page">
    <h2>Ant Design Vue 组件示例</h2>
    <div class="content">
      <a-row :gutter="[16, 16]">
        <a-col :span="8">
          <a-card hoverable>
            <template #cover>
              <div class="card-icon">
                <layout-outlined />
              </div>
            </template>
            <a-card-meta title="布局组件" description="包含 Layout、Grid、Space 等布局组件" />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card hoverable>
            <template #cover>
              <div class="card-icon">
                <form-outlined />
              </div>
            </template>
            <a-card-meta title="表单组件" description="包含 Input、Select、Radio 等表单组件" />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card hoverable>
            <template #cover>
              <div class="card-icon">
                <table-outlined />
              </div>
            </template>
            <a-card-meta title="数据展示" description="包含 Table、List、Card 等数据展示组件" />
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LayoutOutlined, FormOutlined, TableOutlined } from '@ant-design/icons-vue';
</script>

<style scoped>
.overview-page {
  padding: 24px;
}

.content {
  margin-top: 24px;
}

.card-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  background: #fafafa;
  font-size: 48px;
  color: #1890ff;
}
</style> 
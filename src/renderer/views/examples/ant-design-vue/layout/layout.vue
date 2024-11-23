<template>
  <div class="layout-demo">
    <a-typography-title :level="2">Layout 布局</a-typography-title>
    
    <a-typography-paragraph>
      协助进行页面级整体布局。
    </a-typography-paragraph>

    <a-divider orientation="left">基础布局</a-divider>
    <div class="demo-section">
      <a-layout>
        <a-layout-header>Header</a-layout-header>
        <a-layout-content>Content</a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </div>

    <a-divider orientation="left">侧边布局</a-divider>
    <div class="demo-section">
      <a-layout>
        <a-layout-sider>Sider</a-layout-sider>
        <a-layout>
          <a-layout-header>Header</a-layout-header>
          <a-layout-content>Content</a-layout-content>
          <a-layout-footer>Footer</a-layout-footer>
        </a-layout>
      </a-layout>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Layout component logic here
</script>

<style scoped>
.layout-demo {
  padding: 24px;

  .ant-layout {
    text-align: center;
    color: #fff;
    margin-bottom: 16px;
    
    .ant-layout-header {
      background: #7dbcea;
      height: 64px;
      line-height: 64px;
    }
    
    .ant-layout-content {
      background: #108ee9;
      min-height: 120px;
      line-height: 120px;
    }
    
    .ant-layout-footer {
      background: #7dbcea;
      line-height: 48px;
    }
    
    .ant-layout-sider {
      background: #3ba0e9;
      line-height: 120px;
    }
  }
}
</style> 
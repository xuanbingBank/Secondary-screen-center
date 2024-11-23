<template>
  <div class="breadcrumb-demo">
    <a-typography-title :level="2">Breadcrumb 面包屑</a-typography-title>
    
    <a-typography-paragraph>
      显示当前页面在系统层级结构中的位置，并能向上返回。
    </a-typography-paragraph>

    <a-divider orientation="left">基础用法</a-divider>
    <div class="demo-section">
      <a-breadcrumb>
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>Application Center</a-breadcrumb-item>
        <a-breadcrumb-item>Application List</a-breadcrumb-item>
        <a-breadcrumb-item>An Application</a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <a-divider orientation="left">带图标的面包屑</a-divider>
    <div class="demo-section">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <home-outlined />
          <span>Home</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <user-outlined />
          <span>Application List</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { HomeOutlined, UserOutlined } from '@ant-design/icons-vue';
</script>

<style scoped>
.breadcrumb-demo {
  padding: 24px;

  .demo-section {
    margin: 16px 0;
    padding: 24px;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
  }
}
</style> 
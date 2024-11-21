<template>
  <div class="components-overview">
    <h2 class="title">组件总览</h2>
    <div class="components-list">
      <!-- 通用 -->
      <section class="components-section">
        <h3>通用</h3>
        <div class="component-items">
          <a-card v-for="item in commonComponents" :key="item.title" class="component-item">
            <template #title>{{ item.title }}</template>
            {{ item.description }}
          </a-card>
        </div>
      </section>

      <!-- 布局 -->
      <section class="components-section">
        <h3>布局</h3>
        <div class="component-items">
          <a-card v-for="item in layoutComponents" :key="item.title" class="component-item">
            <template #title>{{ item.title }}</template>
            {{ item.description }}
          </a-card>
        </div>
      </section>

      <!-- 导航 -->
      <section class="components-section">
        <h3>导航</h3>
        <div class="component-items">
          <a-card v-for="item in navigationComponents" :key="item.title" class="component-item">
            <template #title>{{ item.title }}</template>
            {{ item.description }}
          </a-card>
        </div>
      </section>

      <!-- 数据录入 -->
      <section class="components-section">
        <h3>数据录入</h3>
        <div class="component-items">
          <a-card v-for="item in dataInputComponents" :key="item.title" class="component-item">
            <template #title>{{ item.title }}</template>
            {{ item.description }}
          </a-card>
        </div>
      </section>

      <!-- 数据展示 -->
      <section class="components-section">
        <h3>数据展示</h3>
        <div class="component-items">
          <a-card v-for="item in dataDisplayComponents" :key="item.title" class="component-item">
            <template #title>{{ item.title }}</template>
            {{ item.description }}
          </a-card>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// 通用组件
const commonComponents = [
  { title: 'Button 按钮', description: '常用的操作按钮' },
  { title: 'Icon 图标', description: '语义化的矢量图形' },
  { title: 'Typography 排版', description: '文本的基本格式' }
];

// 布局组件
const layoutComponents = [
  { title: 'Divider 分割线', description: '区隔内容的分割线' },
  { title: 'Grid 栅格', description: '24 栅格系统' },
  { title: 'Layout 布局', description: '协助进行页面级整体布局' },
  { title: 'Space 间距', description: '设置组件之间的间距' }
];

// 导航组件
const navigationComponents = [
  { title: 'Breadcrumb 面包屑', description: '显示当前页面在系统层级结构中的位置' },
  { title: 'Dropdown 下拉菜单', description: '向下弹出的列表' },
  { title: 'Menu 导航菜单', description: '为页面和功能提供导航的菜单列表' },
  { title: 'Pagination 分页', description: '采用分页的形式分隔长列表' }
];

// 数据录入组件
const dataInputComponents = [
  { title: 'Form 表单', description: '具有数据收集、校验和提交功能的表单' },
  { title: 'Input 输入框', description: '通过鼠标或键盘输入内容' },
  { title: 'Select 选择器', description: '下拉选择器' },
  { title: 'Switch 开关', description: '开关选择器' }
];

// 数据展示组件
const dataDisplayComponents = [
  { title: 'Table 表格', description: '展示行列数据' },
  { title: 'Tabs 标签页', description: '选项卡切换组件' },
  { title: 'Tree 树形控件', description: '文件夹、组织架构、生物分类、国家地区等等' },
  { title: 'List 列表', description: '最基础的列表展示' }
];
</script>

<style scoped>
.components-overview {
  padding: 24px;
}

.title {
  margin-bottom: 24px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}

.components-section {
  margin-bottom: 32px;
}

.components-section h3 {
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}

.component-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.component-item {
  height: 100%;
  cursor: pointer;
  transition: all 0.3s;
}

.component-item:hover {
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 
              0 3px 6px 0 rgba(0, 0, 0, 0.12), 
              0 5px 12px 4px rgba(0, 0, 0, 0.09);
}

:deep(.ant-card-head-title) {
  font-weight: 500;
}
</style> 
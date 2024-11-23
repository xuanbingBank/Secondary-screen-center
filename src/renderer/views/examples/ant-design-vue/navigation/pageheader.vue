<template>
  <div class="pageheader-demo">
    <a-typography-title :level="2">PageHeader 页头</a-typography-title>
    
    <a-typography-paragraph>
      页面的标题、操作等。
    </a-typography-paragraph>

    <a-divider orientation="left">基本用法</a-divider>
    <div class="demo-section">
      <a-page-header
        title="Title"
        sub-title="This is a subtitle"
        @back="() => $router.go(-1)"
      >
        <template #extra>
          <a-button key="3">Operation</a-button>
          <a-button key="2">Operation</a-button>
          <a-button key="1" type="primary">Primary</a-button>
        </template>
        <div>Content</div>
      </a-page-header>
    </div>
  </div>
</template>

<script lang="ts" setup>
// PageHeader component logic here
</script>

<style scoped>
.pageheader-demo {
  padding: 24px;

  .demo-section {
    margin: 16px 0;
    padding: 24px;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
  }
}
</style> 
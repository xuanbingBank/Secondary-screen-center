<template>
  <div class="space-demo">
    <a-typography-title :level="2">Space 间距</a-typography-title>
    
    <a-typography-paragraph>
      设置组件之间的间距。
    </a-typography-paragraph>

    <a-divider orientation="left">基础用法</a-divider>
    <div class="demo-section">
      <a-space>
        <a-button type="primary">Button 1</a-button>
        <a-button>Button 2</a-button>
        <a-button>Button 3</a-button>
      </a-space>
    </div>

    <a-divider orientation="left">垂直间距</a-divider>
    <div class="demo-section">
      <a-space direction="vertical">
        <a-card title="Card" style="width: 300px">
          <p>Card content</p>
        </a-card>
        <a-card title="Card" style="width: 300px">
          <p>Card content</p>
        </a-card>
      </a-space>
    </div>

    <a-divider orientation="left">自定义尺寸</a-divider>
    <div class="demo-section">
      <a-space :size="24">
        <a-button type="primary">Large Space</a-button>
        <a-button>Button</a-button>
        <a-button>Button</a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Space component logic here
</script>

<style scoped>
.space-demo {
  padding: 24px;

  .demo-section {
    margin: 16px 0;
    border: 1px solid #f0f0f0;
    padding: 24px;
    border-radius: 2px;
  }
}
</style> 
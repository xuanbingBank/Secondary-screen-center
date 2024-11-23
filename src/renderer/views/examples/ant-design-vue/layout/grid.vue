<template>
  <div class="grid-demo">
    <a-typography-title :level="2">Grid 栅格</a-typography-title>
    
    <a-typography-paragraph>
      24 栅格系统。
    </a-typography-paragraph>

    <a-divider orientation="left">基础栅格</a-divider>
    <div class="demo-section">
      <a-row>
        <a-col :span="12"><div class="grid-content bg-purple">col-12</div></a-col>
        <a-col :span="12"><div class="grid-content bg-purple-light">col-12</div></a-col>
      </a-row>
      <a-row>
        <a-col :span="8"><div class="grid-content bg-purple">col-8</div></a-col>
        <a-col :span="8"><div class="grid-content bg-purple-light">col-8</div></a-col>
        <a-col :span="8"><div class="grid-content bg-purple">col-8</div></a-col>
      </a-row>
    </div>

    <a-divider orientation="left">区块间隔</a-divider>
    <div class="demo-section">
      <a-row :gutter="16">
        <a-col :span="6"><div class="grid-content bg-purple">col-6</div></a-col>
        <a-col :span="6"><div class="grid-content bg-purple-light">col-6</div></a-col>
        <a-col :span="6"><div class="grid-content bg-purple">col-6</div></a-col>
        <a-col :span="6"><div class="grid-content bg-purple-light">col-6</div></a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Grid component logic here
</script>

<style scoped>
.grid-demo {
  padding: 24px;

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    margin: 4px 0;
    padding: 8px;
    text-align: center;
  }

  .bg-purple {
    background: #d3adf7;
  }

  .bg-purple-light {
    background: #efdbff;
  }
}
</style> 
<template>
    <div class="divider-demo">
      <a-typography-title :level="2">Divider 分割线</a-typography-title>
      
      <a-typography-paragraph>
        区隔内容的分割线。
      </a-typography-paragraph>
  
      <a-divider orientation="left">水平分割线</a-divider>
      <p>上部分内容</p>
      <a-divider />
      <p>下部分内容</p>
  
      <a-divider orientation="left">带文字的分割线</a-divider>
      <p>这是一段文字</p>
      <a-divider>With Text</a-divider>
      <p>这是另一段文字</p>
  
      <a-divider orientation="left">垂直分割线</a-divider>
      <div>
        Text
        <a-divider type="vertical" />
        <a href="#">Link</a>
        <a-divider type="vertical" />
        <a href="#">Another Link</a>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  // Divider component logic here
  </script>
  
  <style scoped>
  .divider-demo {
    padding: 24px;
  }
  </style>
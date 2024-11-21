<template>
  <div class="button-demo">
    <h2>按钮示例</h2>
    
    <!-- 按钮类型 -->
    <a-card title="按钮类型" class="demo-card">
      <a-space>
        <a-button type="primary">Primary Button</a-button>
        <a-button>Default Button</a-button>
        <a-button type="dashed">Dashed Button</a-button>
        <a-button type="text">Text Button</a-button>
        <a-button type="link">Link Button</a-button>
      </a-space>
    </a-card>

    <!-- 图标按钮 -->
    <a-card title="图标按钮" class="demo-card">
      <a-space>
        <a-button type="primary" shape="circle">
          <template #icon><search-outlined /></template>
        </a-button>
        <a-button type="primary">
          <template #icon><search-outlined /></template>
          Search
        </a-button>
        <a-button shape="circle">
          <template #icon><download-outlined /></template>
        </a-button>
        <a-button>
          <template #icon><download-outlined /></template>
          Download
        </a-button>
      </a-space>
    </a-card>

    <!-- 按钮尺寸 -->
    <a-card title="按钮尺寸" class="demo-card">
      <a-radio-group v-model:value="size">
        <a-radio-button value="large">Large</a-radio-button>
        <a-radio-button value="default">Default</a-radio-button>
        <a-radio-button value="small">Small</a-radio-button>
      </a-radio-group>
      <br />
      <br />
      <a-space>
        <a-button type="primary" :size="size">Primary</a-button>
        <a-button :size="size">Default</a-button>
        <a-button type="dashed" :size="size">Dashed</a-button>
      </a-space>
    </a-card>

    <!-- 加载状态 -->
    <a-card title="加载状态" class="demo-card">
      <a-space>
        <a-button type="primary" loading>Loading</a-button>
        <a-button type="primary" :loading="loading" @click="enterLoading">
          Click me!
        </a-button>
        <a-button type="primary" loading shape="circle" />
      </a-space>
    </a-card>

    <!-- 按钮组 -->
    <a-card title="按钮组" class="demo-card">
      <a-button-group>
        <a-button type="primary">
          <template #icon><left-outlined /></template>
          Go back
        </a-button>
        <a-button type="primary">
          Go forward
          <template #icon><right-outlined /></template>
        </a-button>
      </a-button-group>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from 'ant-design-vue';
import {
  SearchOutlined,
  DownloadOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons-vue';

const size = ref<ButtonProps['size']>('large');
const loading = ref(false);

const enterLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<style scoped>
.button-demo {
  padding: 24px;
}

.demo-card {
  margin-bottom: 24px;
}

.demo-card :deep(.ant-card-head) {
  min-height: 48px;
}

.demo-card :deep(.ant-card-head-title) {
  padding: 8px 0;
}

.ant-space {
  flex-wrap: wrap;
}
</style> 
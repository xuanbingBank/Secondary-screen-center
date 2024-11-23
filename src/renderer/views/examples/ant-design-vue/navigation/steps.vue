<template>
  <div class="steps-demo">
    <a-typography-title :level="2">Steps 步骤条</a-typography-title>
    
    <a-typography-paragraph>
      引导用户按照流程完成任务的导航条。
    </a-typography-paragraph>

    <a-divider orientation="left">基础步骤条</a-divider>
    <div class="demo-section">
      <a-steps v-model:current="current">
        <a-step title="Finished" description="This is a description." />
        <a-step title="In Progress" sub-title="Left 00:00:08" description="This is a description." />
        <a-step title="Waiting" description="This is a description." />
      </a-steps>
    </div>

    <div style="margin-top: 24px">
      <a-button @click="prev" v-if="current > 0">Previous</a-button>
      <a-button @click="next" v-if="current < 2">Next</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const current = ref(0);

const next = () => {
  current.value++;
};

const prev = () => {
  current.value--;
};
</script>

<style scoped>
.steps-demo {
  padding: 24px;

  .demo-section {
    margin: 16px 0;
    padding: 24px;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
  }
}
</style> 
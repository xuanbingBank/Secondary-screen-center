<template>
  <template v-if="menuInfo.children?.length">
    <a-sub-menu :key="menuInfo.name?.toString()">
      <template #icon>
        <component 
          :is="menuInfo.meta?.icon" 
          v-if="menuInfo.meta?.icon" 
        />
      </template>
      <template #title>{{ menuInfo.meta?.title }}</template>
      <template v-for="child in menuInfo.children" :key="child.name?.toString()">
        <recursive-menu :menu-info="child" />
      </template>
    </a-sub-menu>
  </template>

  <template v-else>
    <a-menu-item :key="menuInfo.name?.toString()">
      <template #icon>
        <component 
          :is="menuInfo.meta?.icon" 
          v-if="menuInfo.meta?.icon" 
        />
      </template>
      {{ menuInfo.meta?.title }}
    </a-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router';

defineProps<{
  menuInfo: RouteRecordRaw
}>();
</script>

<style scoped>
</style>
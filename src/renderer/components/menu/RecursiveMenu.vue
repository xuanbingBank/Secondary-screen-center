<template>
  <template v-if="menuInfo.children?.length">
    <a-sub-menu :key="String(menuInfo.name)">
      <template #icon>
        <component :is="menuInfo.meta?.icon" v-if="menuInfo.meta?.icon" />
      </template>
      <template #title>{{ menuInfo.meta?.title }}</template>
      <recursive-menu
        v-for="child in menuInfo.children"
        :key="String(child.name)"
        :menu-info="child"
      />
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="String(menuInfo.name)">
      <template #icon>
        <component :is="menuInfo.meta?.icon" v-if="menuInfo.meta?.icon" />
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
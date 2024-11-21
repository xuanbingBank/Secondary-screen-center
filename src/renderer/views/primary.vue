<template>
  <a-layout class="app-container">
    <!-- 左侧菜单栏 -->
    <menu-layout @menu-select="handleMenuSelect" />

    <!-- 右侧内容区 -->
    <content-layout
      :title="currentPageTitle"
      @minimize="onMinPrimaryWinToTray"
      @exit="showExitAppMsgbox = true"
    />
  </a-layout>

  <!-- 退出确认对话框 -->
  <a-modal
    :open="showExitAppMsgbox"
    :confirm-loading="isExitingApp"
    :cancel-button-props="{ disabled: isExitingApp }"
    :closable="!isExitingApp"
    ok-text="确定"
    cancel-text="取消"
    @ok="onExitApp"
    @cancel="showExitAppMsgbox = false"
  >
    <div class="exit-msg-title">
      <warning-outlined style="color: #ff0000" />
      <span style="margin-left: 8px">警告</span>
    </div>
    <p>{{ isExitingApp ? "正在退出客户端......" : "您确定要退出客户端软件吗？" }}</p>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { WarningOutlined } from '@ant-design/icons-vue';
import MenuLayout from '../components/layout/MenuLayout.vue';
import ContentLayout from '../components/layout/ContentLayout.vue';

const route = useRoute();
const router = useRouter();
const showExitAppMsgbox = ref<boolean>(false);
const isExitingApp = ref<boolean>(false);

// 计算当前页面标题
const currentPageTitle = computed<string>(() => {
  return (route.meta?.title as string) || '首页';
});

// 处理菜单选择
const handleMenuSelect = (routeName: string) => {
  if (routeName.includes('submenu-') || routeName.includes('item-')) {
    return;
  }
  router.push({ name: routeName }).catch((err) => {
    console.error('Navigation error:', err);
  });
};

function getElectronApi() {
  return (window as any).primaryWindowAPI;
}

async function onExitApp() {
  isExitingApp.value = true;
  await getElectronApi().asyncExitApp();
  isExitingApp.value = false;
  showExitAppMsgbox.value = false;
}

function onMinPrimaryWinToTray() {
  getElectronApi().minToTray();
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
}

.exit-msg-title {
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
}
</style>

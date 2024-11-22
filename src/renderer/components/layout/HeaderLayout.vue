<template>
  <div class="header-container">
    <!-- 顶部标题栏 -->
    <a-layout-header class="header" app-region="drag">
      <div class="header-left" app-region="drag">
        <h2>{{ title }}</h2>
      </div>
      <div class="header-right" app-region="no-drag">
        <a-space>
          <a-button type="text" @click="$emit('minimize')">
            <template #icon><minus-outlined /></template>
          </a-button>
          <a-button type="text" @click="$emit('exit')">
            <template #icon><poweroff-outlined /></template>
          </a-button>
        </a-space>
      </div>
    </a-layout-header>

    <!-- 标签页 -->
    <div class="tabs-container" app-region="no-drag">
      <div class="tabs-wrapper">
        <a-tabs
          v-model:activeKey="activeKey"
          type="editable-card"
          hide-add
          size="small"
          @edit="onTabEdit"
          @change="onTabChange"
        >
          <a-tab-pane
            v-for="tab in tabs"
            :key="tab.path"
            :closable="tab.closable"
          >
            <template #tab>
              <a-dropdown 
                :trigger="['contextmenu']"
                @contextmenu.prevent
              >
                <span>{{ tab.title }}</span>
                <template #overlay>
                  <a-menu @click="({ key: menuKey }) => handleContextMenu(menuKey as string, tab.path)">
                    <a-menu-item key="reload">重新加载</a-menu-item>
                    <a-menu-divider />
                    <a-menu-item 
                      key="closeLeft"
                      :disabled="isFirstTab(tab.path)"
                    >关闭左侧标签</a-menu-item>
                    <a-menu-item 
                      key="closeRight"
                      :disabled="isLastTab(tab.path)"
                    >关闭右侧标签</a-menu-item>
                    <a-menu-item 
                      key="closeOther"
                      :disabled="tabs.length <= 1"
                    >关闭其他标签</a-menu-item>
                    <a-menu-divider />
                    <a-menu-item 
                      key="closeAll"
                      :disabled="!tab.closable"
                    >关闭全部标签</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </template>
          </a-tab-pane>
        </a-tabs>
        
        <!-- 全屏按钮 -->
        <div class="tabs-extra">
          <a-button 
            type="text" 
            class="fullscreen-btn"
            @click="$emit('fullscreen')"
          >
            <template #icon>
              <fullscreen-outlined v-if="!isFullscreen" />
              <fullscreen-exit-outlined v-else />
            </template>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { 
  MinusOutlined, 
  PoweroffOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons-vue';
import type { TabsProps } from 'ant-design-vue';
import type { Key } from 'ant-design-vue/es/vc-table/interface';
import { tabDB, type TabInfo } from '../../utils/indexedDB';

interface Props {
  title: string;
  tabs: Array<{
    title: string;
    path: string;
    closable?: boolean;
  }>;
  activeTab: string;
  isFullscreen?: boolean;
}

const props = defineProps<Props>();

// 扩展 emit 类型定义
const emit = defineEmits<{
  (e: 'minimize'): void;
  (e: 'exit'): void;
  (e: 'fullscreen'): void;
  (e: 'tab-change', path: string): void;
  (e: 'tab-remove', path: string): void;
  (e: 'go-home'): void;
  (e: 'tab-reload'): void;
  (e: 'close-left', path: string): void;
  (e: 'close-right', path: string): void;
  (e: 'close-other', path: string): void;
  (e: 'close-all'): void;
}>();

const activeKey = computed({
  get: () => props.activeTab,
  set: (value: Key) => emit('tab-change', value.toString())
});

// 判断是否为第一个标签
const isFirstTab = (path: string) => {
  return props.tabs[0]?.path === path;
};

// 判断是否为最后一个标签
const isLastTab = (path: string) => {
  return props.tabs[props.tabs.length - 1]?.path === path;
};

// 处理右键菜单点击
const handleContextMenu = (menuKey: string, path: string) => {
  switch (menuKey) {
    case 'reload':
      emit('tab-reload');
      break;
    case 'closeLeft':
      emit('close-left', path);
      break;
    case 'closeRight':
      emit('close-right', path);
      break;
    case 'closeOther':
      emit('close-other', path);
      break;
    case 'closeAll':
      emit('close-all');
      break;
  }
};

// 标签页切换
const onTabChange: TabsProps['onChange'] = (key: Key) => {
  emit('tab-change', key.toString());
};

// 标签页编辑（关闭）
const onTabEdit: TabsProps['onEdit'] = (targetKey, action) => {
  if (action === 'remove' && targetKey !== undefined) {
    const currentKey = targetKey.toString();
    const targetIndex = props.tabs.findIndex(tab => tab.path === currentKey);
    
    if (currentKey === props.activeTab) {
      if (props.tabs.length > 1) {
        const newActiveKey = targetIndex === 0 
          ? props.tabs[1].path 
          : props.tabs[targetIndex - 1].path;
        emit('tab-change', newActiveKey);
      } else {
        emit('go-home');
      }
    }
    
    emit('tab-remove', currentKey);
  }
};

// 添加一个状态来跟踪初始化
const isInitialized = ref(false);

// 监听标签页变化并保存
watch(() => props.tabs, async (newTabs) => {
  // 只有在初始化完成后才进行保存操作
  if (!isInitialized.value) {
    return;
  }

  try {
    if (newTabs.length > 0) {
      // 保存标签页时同时保存当前活动的标签页
      await tabDB.saveTabs(newTabs.map(tab => ({
        ...tab,
        active: tab.path === props.activeTab
      })));
    } else {
      await tabDB.clearTabs();
    }
  } catch (error) {
    console.error('Failed to save tabs:', error);
    // 只在非初始化阶段显示错误提示
    if (isInitialized.value) {
      message.error('保存标签页失败');
    }
  }
}, { deep: true });

const router = useRouter();

// 组件挂载时加载保存的标签页
onMounted(async () => {
  try {
    const savedTabs = await tabDB.getTabs();
    if (savedTabs && savedTabs.length > 0) {
      // 确保所有标签页的路由都存在
      const validTabs = savedTabs.filter(tab => {
        try {
          router.resolve(tab.path);
          return true;
        } catch {
          return false;
        }
      });
      
      // 先清空现有标签页
      emit('close-all');
      
      // 按顺序恢复所有标签页
      for (const tab of validTabs) {
        await router.push(tab.path);
        emit('tab-change', tab.path);
      }
      
      // 设置最后一个标签页为活动标签页
      if (validTabs.length > 0) {
        emit('tab-change', validTabs[validTabs.length - 1].path);
      }
    }
  } catch (error) {
    console.error('Failed to load saved tabs:', error);
    message.error('加载已保存的标签页失败');
  } finally {
    // 标记初始化完成
    isInitialized.value = true;
  }
});
</script>

<style scoped>
.header-container {
  background: #fff;
  -webkit-app-region: drag;
}

.header {
  height: 32px;
  line-height: 32px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  -webkit-app-region: drag;
}

.header-left h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  user-select: none;
  -webkit-user-select: none;
}

.tabs-container {
  padding: 2px 8px 0;
  background: #fff;
  height: 32px;
  border-bottom: 1px solid #f0f0f0;
  -webkit-app-region: no-drag;
}

.tabs-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  height: calc(100% - 2px);
}

.tabs-wrapper :deep(.ant-tabs) {
  flex: 1;
}

.tabs-wrapper :deep(.ant-tabs-nav) {
  margin: 0;
  height: 30px;
  line-height: 30px;
}

.tabs-wrapper :deep(.ant-tabs-tab) {
  height: 30px;
  line-height: 28px;
  padding: 0 12px !important;
  background: transparent;
  border: 1px solid #f0f0f0;
  transition: all 0.3s;
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
}

.tabs-wrapper :deep(.ant-tabs-tab-active) {
  background: #fff;
  border-bottom-color: #fff;
}

.tabs-wrapper :deep(.ant-tabs-nav-wrap) {
  padding: 0;
}

.tabs-extra {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding-right: 8px;
  background: #fff;
}

.fullscreen-btn {
  height: 28px;
  width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.45);
  transition: all 0.3s;
}

.fullscreen-btn:hover {
  color: rgba(0, 0, 0, 0.85);
  background: rgba(0, 0, 0, 0.025);
}

/* 全屏时隐藏其他元素 */
:deep(.content-fullscreen) .header,
:deep(.content-fullscreen) .tabs-container {
  display: none;
}

/* 确保按钮和交互区域不可拖动 */
:deep(.ant-btn),
:deep(.ant-tabs-tab),
.tabs-extra {
  -webkit-app-region: no-drag;
}

/* 确保所有文本内容不可选中 */
.tabs-container,
.tabs-wrapper :deep(.ant-tabs-nav),
.tabs-wrapper :deep(.ant-tabs-tab-btn) {
  user-select: none;
  -webkit-user-select: none;
}

/* 右键菜单样式 */
:deep(.ant-dropdown-menu) {
  min-width: 120px;
}

:deep(.ant-dropdown-menu-item) {
  padding: 5px 12px;
  font-size: 12px;
}

:deep(.ant-dropdown-menu-item:hover) {
  background: #e6f7ff;
}

:deep(.ant-dropdown-menu-item-disabled) {
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
}

/* 标签页文字居中 */
:deep(.ant-tabs-tab-btn) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style> 
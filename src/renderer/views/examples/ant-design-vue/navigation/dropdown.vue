<template>
  <div class="dropdown-demo">
    <a-typography-title :level="2">Dropdown 下拉菜单</a-typography-title>
    
    <a-typography-paragraph>
      向下弹出的列表。
    </a-typography-paragraph>

    <a-divider orientation="left">基础下拉菜单</a-divider>
    <div class="demo-section">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          Hover me <down-outlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">1st menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">2nd menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">3rd menu item</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

    <a-divider orientation="left">带分割线的菜单</a-divider>
    <div class="demo-section">
      <a-dropdown>
        <a-button>
          Button <down-outlined />
        </a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item>1st menu item</a-menu-item>
            <a-menu-item>2nd menu item</a-menu-item>
            <a-menu-divider />
            <a-menu-item>3rd menu item</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DownOutlined } from '@ant-design/icons-vue';
</script>

<style scoped>
.dropdown-demo {
  padding: 24px;

  .demo-section {
    margin: 16px 0;
    padding: 24px;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
  }
}
</style> 
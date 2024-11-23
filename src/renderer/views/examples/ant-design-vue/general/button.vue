<template>
  <div class="button-demo">
    <a-page-header
      class="demo-page-header"
      style="border: 1px solid rgb(235, 237, 240)"
      title="button 按钮"
      sub-title="代码位置:views/examples/ant-design-vue/general/button.vue"
      :ghost="false"
    />

    <!-- 按钮类型 -->
    <a-space direction="vertical" align="center">
      <a-card class="description" title="按钮类型" :bordered="false">
        <p>
          标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
        </p>
        <ul>
          <li>主按钮：用于主行动点，一个操作区域只能有一个主按钮。</li>
          <li>次按钮：用于主按钮之外的其他行动点。</li>
          <li>虚线按钮：常用于添加操作。</li>
          <li>文本按钮：一般用于最次级的行动点。</li>
          <li>链接按钮：常用于次级行动点。</li>
        </ul>
        <p>以及四种状态属性与上面配合使用。</p>
        <ul>
          <li>危险：删除/移动/修改等危险操作，一般需要二次确认。</li>
          <li>幽灵：常用于一个（或一组）并列按钮。</li>
          <li>禁用：行动点不可用时，一般需要文案解释。</li>
          <li>加载中：点击后，禁用按钮，文案变为“加载中...”。</li>
        </ul>
      </a-card>
      <a-card class="demo-card" title="按钮类型" :bordered="false">
        <a-space wrap>
          <a-button type="primary">Primary Button</a-button>
          <a-button>Default Button</a-button>
          <a-button type="dashed">Dashed Button</a-button>
          <a-button type="text">Text Button</a-button>
          <a-button type="link">Link Button</a-button>
        </a-space>
      </a-card>
      <a-card class="demo-card" title="按钮类型" :bordered="false">
        <a-space wrap>
          <a-button type="primary" danger>Primary Button</a-button>
          <a-button type="primary" ghost>Primary Button</a-button>
          <a-button type="primary" disabled>Primary Button</a-button>
          <a-button type="primary" loading>Primary Button</a-button>
        </a-space>
      </a-card>
    </a-space>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.description {
  background: #ffffff;
  width: 100%;
  /* margin: 20px; */
}
.demo-card {
  background: #ffffff;
  padding: 30px;
  width: 50%;
  margin: 20px;
}
</style>

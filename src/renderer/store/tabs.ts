import { ref } from 'vue';

export interface TabItem {
  title: string;
  key: string;
  path: string;
  closable?: boolean;
}

// 访问过的标签页
export const visitedTabs = ref<TabItem[]>([
  {
    title: '首页',
    key: '/home',
    path: '/home',
    closable: false
  }
]);

// 当前激活的标签页
export const activeTab = ref<string>('/home');

// 添加标签页
export const addTab = (route: any) => {
  const { name, path, meta } = route;
  if (visitedTabs.value.some(tab => tab.path === path)) return;
  
  visitedTabs.value.push({
    title: meta?.title || name,
    key: path,
    path: path,
    closable: true
  });
};

// 移除标签页
export const removeTab = (targetPath: string) => {
  const tabs = visitedTabs.value;
  const targetIndex = tabs.findIndex(tab => tab.path === targetPath);
  
  if (targetIndex === -1 || !tabs[targetIndex].closable) return;
  
  visitedTabs.value = tabs.filter(tab => tab.path !== targetPath);
  
  // 返回被删除标签的索引，方便外部处理
  return targetIndex;
};
 
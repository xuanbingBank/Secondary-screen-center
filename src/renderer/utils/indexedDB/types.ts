// 定义基础接口
export interface DBStore {
  name: string;
  keyPath: string;
  indexes?: Array<{
    name: string;
    keyPath: string;
    options?: IDBIndexParameters;
  }>;
}

// 定义数据库配置接口
export interface DBConfig {
  name: string;
  version: number;
  stores: DBStore[];
}

// Tab 相关类型定义
export interface TabInfo {
  path: string;
  title: string;
  closable?: boolean;
  active?: boolean;
} 
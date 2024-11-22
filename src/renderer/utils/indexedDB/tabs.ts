import { Database } from './core';
import type { TabInfo } from './types';

class TabStore extends Database {
  private readonly STORE_NAME = 'tabs';

  constructor() {
    super({
      name: 'appDB',
      version: 1,
      stores: [
        {
          name: 'tabs',
          keyPath: 'path',
          indexes: [
            {
              name: 'active',
              keyPath: 'active'
            }
          ]
        }
      ]
    });
  }

  async saveTabs(tabs: TabInfo[]): Promise<void> {
    try {
      await this.clear(this.STORE_NAME);
      for (const tab of tabs) {
        await this.add(this.STORE_NAME, tab);
      }
    } catch (error) {
      console.error('Save tabs error:', error);
      return Promise.reject(error);
    }
  }

  async getTabs(): Promise<TabInfo[]> {
    try {
      return await this.getAll<TabInfo>(this.STORE_NAME);
    } catch (error) {
      console.error('Get tabs error:', error);
      return Promise.reject(error);
    }
  }

  async clearTabs(): Promise<void> {
    try {
      await this.clear(this.STORE_NAME);
    } catch (error) {
      console.error('Clear tabs error:', error);
      return Promise.reject(error);
    }
  }
}

export const tabDB = new TabStore(); 
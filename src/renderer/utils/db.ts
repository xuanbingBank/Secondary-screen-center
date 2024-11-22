export interface TabInfo {
  path: string;
  title: string;
  closable?: boolean;
  active?: boolean;
}

class TabDB {
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = 'tabsDB';
  private readonly STORE_NAME = 'tabs';
  private readonly VERSION = 1;
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.initPromise = this.initDB();
  }

  private initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.VERSION);

      request.onerror = () => {
        console.error('Failed to open database');
        reject(new Error('Failed to open database'));
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        
        // 添加错误处理
        this.db.onerror = (event) => {
          console.error('Database error:', event);
        };

        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME, { keyPath: 'path' });
        }
      };
    });
  }

  private async ensureDB(): Promise<IDBDatabase> {
    if (!this.db) {
      await this.initPromise;
    }
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db;
  }

  async saveTabs(tabs: TabInfo[]): Promise<void> {
    try {
      const db = await this.ensureDB();
      
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.STORE_NAME], 'readwrite');
        const store = transaction.objectStore(this.STORE_NAME);

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(new Error('Failed to save tabs'));

        // 先清除所有数据
        const clearRequest = store.clear();
        clearRequest.onsuccess = () => {
          // 清除成功后添加新数据
          tabs.forEach(tab => {
            try {
              store.add({
                path: tab.path,
                title: tab.title,
                closable: tab.closable
              });
            } catch (error) {
              console.error('Error adding tab:', error);
            }
          });
        };
      });
    } catch (error) {
      console.error('Save tabs error:', error);
      return Promise.reject(error);
    }
  }

  async getTabs(): Promise<TabInfo[]> {
    try {
      const db = await this.ensureDB();

      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.STORE_NAME], 'readonly');
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
          resolve(request.result || []);
        };

        request.onerror = () => {
          console.error('Failed to get tabs');
          reject(new Error('Failed to get tabs'));
        };
      });
    } catch (error) {
      console.error('Get tabs error:', error);
      return Promise.reject(error);
    }
  }

  // 添加清理方法
  async clearTabs(): Promise<void> {
    try {
      const db = await this.ensureDB();
      
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.STORE_NAME], 'readwrite');
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error('Failed to clear tabs'));
      });
    } catch (error) {
      console.error('Clear tabs error:', error);
      return Promise.reject(error);
    }
  }
}

export const tabDB = new TabDB(); 
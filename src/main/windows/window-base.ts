import { app, BrowserWindow, IpcMainEvent, IpcMainInvokeEvent, BrowserWindowConstructorOptions } from "electron";

/**
 * 窗口基类，所有的窗口都继承自该类，如 PrimaryWindow、FramelessWindow
 * @class
 */
abstract class WindowBase{
  constructor(options?: BrowserWindowConstructorOptions){
    const defaultOptions: BrowserWindowConstructorOptions = {
      frame: false, // 无边框
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        webSecurity: false, // 允许跨域
        allowRunningInsecureContent: true // 允许运行不安全内容
      }
    };

    // 合并默认选项和传入的选项
    const mergedOptions = { ...defaultOptions, ...options };
    
    this._browserWindow = new BrowserWindow(mergedOptions);

    if(this._browserWindow){
      // 在开发环境下自动打开开发者工具
      if(!app.isPackaged)
        this._browserWindow.webContents.openDevTools();

      // 设置内容安全策略
      this._browserWindow.webContents.session.webRequest.onHeadersReceived(
        (details, callback) => {
          callback({
            responseHeaders: {
              ...details.responseHeaders,
              'Content-Security-Policy': ["default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: ws:"]
            }
          });
        }
      );

      // After received closed event, remove the reference to the window and avoid using it any more.
      this._browserWindow.on("closed", () => {
        this._browserWindow = null;
      });
    }

    this.registerIpcMainHandler();
  }

  public openRouter(routerPath : string){
    let url = "";
    if(app.isPackaged){
      url = `file://${app.getAppPath()}/build/renderer/index.html#${routerPath}`;
    }else{
      const rendererPort = process.argv[2];
      url = `http://localhost:${rendererPort}/#${routerPath}`;
    }

    console.log(`Load URL: ${url}`);

    if(this._browserWindow){
      this._browserWindow.loadURL(url);
    }
  }

  public get valid(){
    return this.browserWindow != null;
  }

  public get browserWindow(){
    return this._browserWindow;
  }

  protected abstract registerIpcMainHandler() : void;

  protected _browserWindow : BrowserWindow | null = null;

  public isIpcMainEventBelongMe(event : IpcMainEvent | IpcMainInvokeEvent) : boolean{
    if(!this._browserWindow)
      return false;
    return (event.sender.id == this.browserWindow?.webContents.id);
  }
}

export default WindowBase;
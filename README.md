<h1 src="https://github.com/xuanbingBank/Secondary-screen-center" >副屏中心</h1>

# 1. 软件说明

这款软件纯粹是个人兴趣爱好，开发出来用于自己使用，所以不会做得很复杂，也不会做得很强大，功能只会使我要啥，想做啥就做啥。

# 2. 快速开始

推荐使用 `Visual Studio Code` 开发,并安装如下插件

- ESLint
- Vue - Official
  
## 2.1 安装依赖

```bash
yarn install
```

## 2.2 开发

```bash
yarn run dev # 以开发环境启动应用并支持热加载
yarn run test # 以测试环境启动应用并支持热加载
yarn run production # 以生产环境启动应用并支持热加载
```

## 2.3 其他命令

```bash
yarn run build # 构建应用，可发布的包位于"out\make"目录

# 或者
yarn run build:win32 # 构建Windows平台 32位应用
yarn run build:win64 # 构建Windows平台 64位应用
yarn run build:mac # 构建macOS平台应用
yarn run build:linux # 构建Linux平台应用

yarn run new:page  # 创建新的Vue页面
yarn run new:window # 创建新的Electron窗口
```

## 2.4 NSIS安装包

首先需要将`setup\NSIS\nsis-3.08.zip`文件解压到当前目录，即将文件释放到 `nsis-3.08` 目录

运行如下命令构建win32安装包

```bash
yarn run build:nsis-win32
```
运行如下命令构建win64安装包

```bash
yarn run build:nsis-win64
```

生成的安装包位于`setup\NSIS\目录

## 项目感谢

- [electron-vue3-boilerplate](https://github.com/winsoft666/electron-vue3-boilerplate)
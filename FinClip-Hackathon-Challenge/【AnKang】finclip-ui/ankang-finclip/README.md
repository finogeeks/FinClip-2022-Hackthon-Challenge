
## 概述
finclip-ui是一款小程序结合了element视觉规范，根据自定义组件开发的ui库。

## 预览
1. 在 finclip-ui 根目录下运行
``` bash
# 安装项目依赖
npm install
# 执行组件编译
npm run dev
```
2. 打开finclip-ide，把 finclip ui的example 目录添加进去就可以预览示例demo了。

## 使用
1. 在 finclip-ui 根目录下运行 npm run build 将会在根目录下打包生成一个dist文件夹，将此文件夹拖入到你的小程序项目之中，采用自定义组件usingComponents的方式去引入即可，如引用button

"usingComponents": {
    "finclip-button":"/dist/btn/index"
}
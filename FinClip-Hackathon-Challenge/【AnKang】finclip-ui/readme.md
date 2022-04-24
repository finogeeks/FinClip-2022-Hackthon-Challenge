## 概述

小程序作为当前主流的轻应用技术，并且因其“用完即走”、“触手可及”等理念在当前市场上可谓是十分活跃，开发者众多。finclip 小程序更是如此，吸引了一大批开发者。基于此，为 finclip 小程序量身打造的 finclip-ui 孕育而生。

finclip-ui 是一款结合了 element 视觉规范，根据自定义组件开发的小程序 ui 库。用户在使用时能感受到源自 element ui 开发的熟悉感。finclip-ui 能帮助更多的开发者在开发 finclip 小程序中获得开箱即用，使用简单，样式统一等 ui 库能力。

finclip-ui 现已支持 按钮、徽章、加载、计数器、步骤条、开关、标签、多选、表单、toast 提示、dialog 弹窗、actionsheet 等多种 ui 库

## 预览

1. 在 finclip-ui 根目录下运行

```bash
# 安装项目依赖
npm install
# 执行组件编译
npm run dev
```

2. 打开 finclip-ide，把 finclip ui 的 example 目录添加进去就可以预览示例 demo 了。

## 使用

1. 在 finclip-ui 根目录下运行 npm run build 将会在根目录下打包生成一个 dist 文件夹，将此文件夹拖入到你的小程序项目之中，采用自定义组件 usingComponents 的方式去引入即可，如引用 button

"usingComponents": {
"finclip-button":"/dist/btn/index"
}

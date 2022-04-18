## 初始化
在已创建好的小程序项目根目录下执行npm init来初始化项目

## 安装包
安装所需的包 npm i @qiun/ft-ucharts

## 构建npm
在小程序开发工具中，点击工具->构建npm即可，此时会看见项目目录中多了个miniprogram_npm文件夹，里面有@qiun文件夹。

## 使用组件
然后在页面的json配置文件中配置如下：
{
  "usingComponents": {
    "qiun-ft-ucharts": "@qiun/ft-ucharts"
  }
}

配置好后即可在fxml文件中使用

<view class="charts">
  <qiun-ft-ucharts type="column" canvas2d="{{true}}" opts="{{opts}}" chartData="{{chartData}}" bindcomplete="complete"/>
</view>

注：示例中uCharts组件仅做演示，实际使用请用码云或者npmjs中最新版本

## 组件参数详见官网组件文档或在线演示中的代码

[https://www.ucharts.cn](https://www.ucharts.cn)
## 项目名称 - GuardFinClipExtender

## 团队名称 - Authing

队长：iOS - 贾楠、Android - 钟家惠

队员：Authing 研发团队

## 项目介绍

<div align=center><img width="300" src="https://files.authing.co/authing-console/authing-logo-new-20210924.svg"></div>
<br/>
<div align="center">
  <a href="https://docs.authing.cn/v2/" target="_blank"><img src="https://img.shields.io/badge/docs-passing-success"></a>
  <a href="https://forum.authing.cn/" target="_blank"><img src="https://img.shields.io/badge/chat-on%20forum-blue"></a>
  <a href="javascript:;"><img src="https://img.shields.io/badge/License-MIT-brightgreen"></a>
  <a href="javascript:;"><img src="https://img.shields.io/badge/PRs-welcome-green"></a>
<br/>
<br>

GuardFinClipExtender 为你的 FinClip 小程序提供了 Authing - Guard 组件强大的用户认证能力
<br>
<br>
![image](https://github.com/Authing/guard-ios-finclip/blob/dev_README/images-folder/demo.gif?raw=true)
<br>
iOS 示例
<br>
<br>
![image](https://github.com/Authing/guard-android-finclip/blob/master/images-folder/demo.gif?raw=true)
<br>
安卓示例

</div>

## 项目背景

FinClip 小程序同微信小程序相比，不以微信为载体，可以在任意原生 App 中使用并提供多端支持，这是其强大特性。
但是同时，微信小程序开发者使用 FinClip 需要处理以下：
1. 复杂的身份认证和用户管理。
2. wx.login 不再可以一行代码获取授权码（code），需实现微信复杂的授权登录相关接口。
3. 原生与小程序认证相关复杂的交互。

考虑到以上种种问题，微信小程序开发者会担心庞大的迁移成本。

**GuardFinClipExtender** 为开发者解决了以上问题，并且使用方便简单：
1. 不再需要考虑任何身份认证和用户管理的处理逻辑。
2. 开发者使用 FinClip 小程序微信登录，只需调用 wx.login 即可一行代码获取到 token。
3. 原生与小程序认证相关交互都通过 Guard 组件，小程序开发者完全不需要关心。

## SDK 集成
iOS 参见: https://github.com/Authing/guard-ios-finclip

Android 参见: https://github.com/Authing/guard-android-finclip

小程序 Demo: https://github.com/Authing/authing-finclip


# GuardFinClipExtender

<LastUpdated/>

<div align=center><img width="300" src="https://files.authing.co/authing-console/authing-logo-new-20210924.svg"></div>
<br/>
<div align="center">
  <a href="https://docs.authing.cn/v2/" target="_blank"><img src="https://img.shields.io/badge/docs-passing-success"></a>
  <a href="https://forum.authing.cn/" target="_blank"><img src="https://img.shields.io/badge/chat-on%20forum-blue"></a>
  <a href="javascript:;"><img src="https://img.shields.io/badge/License-MIT-brightgreen"></a>
  <a href="javascript:;"><img src="https://img.shields.io/badge/PRs-welcome-green"></a>
  <a href="https://developer.apple.com/swift/"><img src="https://img.shields.io/badge/swift-5.0-orange.svg?style=flat"></a>
<br/>

<br>

GuardFinClipExtender 为你的 FinClip 小程序提供了 Authing - Guard 组件强大的用户认证能力

<br>

![image](https://github.com/Authing/guard-ios-finclip/blob/dev_README/images-folder/demo.gif?raw=true)

</div>

## 项目背景

FinClip 小程序同微信小程序相比，不以微信为载体，可以在任意原生 App 中使用并提供多端支持，这是其强大特性。
但是同时，微信小程序开发者使用 FinClip 需要处理以下：
1. 复杂的身份认证和用户管理。
2. wx.login 不再可以一行代码获取授权码（code），需实现微信复杂的授权登录相关接口。
3. 原生与小程序认证相关复杂的交互。

考虑到以上种种问题，微信小程序开发者会担心庞大的迁移成本。

**GuardFinClipExtender** 为开发者解决了以上问题，并且使用方便简单：
1. 不再需要考虑任何身份认证和用户管理的逻辑。
2. 微信小程序开发者使用微信登录，只需调用 wx.login 返回值即可一行代码获取到 token。
3. 原生与小程序认证相关交互都通过 Guard 组件，小程序开发者完全不需要关心。

## GitHub 

下载地址

| **条目** | **说明**                                     |
| -------- | -------------------------------------------- |
| 支持版本 | - Swift 5.0 + - Xcode 11 + - iOS 10+         |
| Platform | - iOS - osx - tvos - watchos                 |
| 仓库地址 | https://github.com/Authing/guard-ios-finclip.git |


## 开始之前

在开始开发之前，需要准备以下内容：

- 开发设备上安装 [Xcode 13](https://developer.apple.com/xcode/) 以及 [FIDE](https://www.finclip.com/mop/document/develop/developer/fide-introduce.html)
- 免费创建一个 [Authing 帐号](https://www.authing.cn/)
- 在 Authing 控制台 [创建一个自建应用](https://docs.authing.cn/v2/guides/app/create-app.html)
- 免费创建一个 [FinClip 帐号](https://www.finclip.com/)
- 在 FinClip 控制台 [创建一个小程序](https://www.finclip.com/mop/document/introduce/accessGuide/enterprise-guidelines.html#_3-%E5%88%9B%E5%BB%BA%E5%B0%8F%E7%A8%8B%E5%BA%8F)


## 集成 SDK

使用 guard-ios-finclip 需要以下步骤：

- iOS 项目集成 Guard-iOS SDK 请参阅 [Guard-iOS 开始开发](https://docs.authing.cn/v2/reference/sdk-for-ios/develop.html)

- iOS 项目集成 FinClip-iOS SDK 请参阅 [FinClip iOS 集成](https://www.finclip.com/mop/document/runtime-sdk/ios/ios-integrate.html#_2-%E9%9B%86%E6%88%90sdk)

- iOS 项目添加 [FinClip URL Type](https://www.finclip.com/mop/document/runtime-sdk/ios/ios-integrate.html#_4-%E6%B7%BB%E5%8A%A0url-type)

- iOS 项目集成 guard-ios-finclip

- 小程序导入 `guard.js`

### iOS 项目集成 guard-ios-finclip

- 在 swift package 搜索栏输入：https://github.com/Authing/guard-ios-finclip

- 依赖规则选择 Up to Next Major Version 1.0.0

- 勾选 GuardFinClipExtender

### 小程序项目中导入 guard.js

- clone demo 项目 https://github.com/Authing/authing-finclip

- 将 demo 中 guard 目录下的 `guard.js` 导入到项目中

## 初始化 SDK

导入 Guard 和 GuardFinClipExtender

```Swift
import Guard
import GuardFinClipExtender
```

在 App 启动方法中初始化 SDK

```Swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
    let config = FATStoreConfig.init()
    config.sdkKey = <#FinClip SDK Key#>
    config.sdkSecret = <#FinClip SDK secret#>
    config.apiServer = <#服务器地址#> // 例如:https://api.finclip.com;
    let configs = FATConfig.init(storeConfigs: [config])


    GuardFinClipExt.initSDK(authingAppId: <#Authing 控制台的 AppId#>, finclipConfigs: configs)
    
    return true
}
```

注册回调方法

```Swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return FATClient.shared().handleOpen(url)
}

func application(_ application: UIApplication, open url: URL, sourceApplication: String?, annotation: Any) -> Bool {
    return FATClient.shared().handleOpen(url)
}
```

打开小程序

```Swift
let request = FATAppletRequest.init()
request.appletId = <#小程序id#>
request.apiServer = <#服务器地址#>
request.transitionStyle = .up
request.startParams = [:]
FATClient.shared().startApplet(with: request, inParentViewController: self) { result, error in
    print("打开小程序")
} closeCompletion: {
    print("关闭小程序")
}
```

## 小程序使用 Guard API

### 小程序工程配置

在小程序工程的根目录创建 `FinClipConf.js` 文件，在 `FinClipConf.js ` 中配置原生提供的接口

```javascript
module.exports = {
    extApi:[
        {
            name: 'guardRequest', //使用 guardRequest 可以调用 Guard 原生 API
            params: {
                url: '',
                body: {},
                method: '',
            }   
        },
        {
            name: 'encryptPassword',  //密码加密，调用密码相关 API 时需要先调用此方法密码加密
            params: {
                password: '',
            }
        }
    ]
}
```

在小程序的 `app.js` 中导入 `guard.js`

```javascript
const guard = require('./../guard.js')
// app.js
App({
  guard:guard,
})
```

使用 Guard API

```javascript
getCurrentUser() {
    var _this = this
    // 通过 app.guard 获取 url 以及 body
    let getUser = app.guard.getCurrentUser();
     // 调用 guardRequest 
    ft.guardRequest({
        url: getUser.url,
        body: getUser.body,
    method: getUser.method,
    success: function (res) {
        console.log("getCurrentUser success");
    },
    fail: function (res) {
        console.log("getCurrentUser fail");
        console.log(JSON.stringify(res["errMsg"]));
    }
});
```

微信登录 API
> 使用前项目配置参见:https://docs.authing.cn/v2/reference/sdk-for-ios/social/wechat.html
```javascript
wx.login({
  timeout:10000,
  success: (result) => {
    this.setData({
        // 获取 token
        token: result.token
    })

  },
  fail: (error) => {
    this.setData({
        token: error.errMsg
    })
  },
  complete: () => {}
});
```

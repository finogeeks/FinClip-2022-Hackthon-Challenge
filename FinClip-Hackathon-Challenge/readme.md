# RFC项目设计文档
> [完成文档请参考](https://github.com/Maifengyuan/FinClip-2022-Hackthon-Challenge/blob/main/FinClip-Hackathon-Challenge/%E3%80%90%E4%BB%8A%E5%A4%A9%E4%BD%A0%E4%B8%A2%E4%BA%BA%E4%BA%86%E5%90%97%E3%80%91%E5%AF%BB%E7%89%A9%E6%A3%AE%E6%9E%97/RFC%E6%96%87%E6%A1%A3.docx)
## 项目介绍
### 项目成员：

| 姓名 | 职能 | Email |
|---|---|---|
| 麦锋源 | 队长 | 1332814096@qq.com |
| 张洁琳 | 成员 | 1924047204@qq.com |
| 许智超 | 指导老师 | 576726974@qq.com |

### 项目进展

| 版本 | 时间 | 说明 |
|---|---|---|
| 1.0.9 | 2022.2.25 | 新增线下失物驿站管理端版块，每周话题更新为学院动态，暂时下线智能失物匹配功能 |

### 作品描述
**通过智能API构建的失物招领小程序平台**

### 项目背景
在高校中生活中，失物与拾物乃是家常便饭，每个人都体验过寻找失物时无助与曲折。对于传统失物招领服务的诟病，普通物品遗失置于楼管处无人管理，常常有遗失或错拿发生，而珍贵物品的遗失处理不妥又容易为失主造成麻烦。操作过程繁琐与信息匹配等问题导致我们丢失的物品越加难以找回，而传统失物招领服务点的存储物品只会不断增加，无人认领。所以，将高校失物招领向数字化、智能化转型就显得尤为重要。
针对校园中失物招领服务现存的问题，产品通过建立一种平台模式，对物品进行信息化整合，结合大数据与智能API进行分析实现精准、高效匹配，并以公益捐赠为产品赋能，推动智慧校园与公益生态的有机结合。

### 项目设计
#### 架构设计
寻物森林主要为高校提供失物招领信息整合、发布、通知集一体化的服务，利用图像识别
API 对用户上传物品自动识别生成标签，对信息进行分类整合，推动失物招领服务向数字化、
智能化转型，打造高校智慧失物管理小程序平台。通过与公益捐赠结合的方式，对失物进行价
值创造，为校园公益赋能。
![页面跳转流程图](https://golf.lucaszy.com/%E9%A1%B5%E9%9D%A2%E8%B7%B3%E8%BD%AC%E6%B5%81%E7%A8%8B%E5%9B%BE3.png#pic_center)

产品共分为四个主要版块（置于底部 tabbar 栏），主要功能分布如下：
- 首页：页面划分为三大部分，顶部是搜索栏与 swiper 轮播图，支持分类标签与关键字
搜索，轮播图链接小程序关联公众号的推送文章，底部展示失物招领信息。中间设置三
个内容分区，分别为“校园热议”、“排行榜”以及“公益捐赠”。
- 暂存点：通过地图组件展示校园与暂存点位置，用户通过点击暂存点可以浏览内置存放
的物品信息；
- 发布：用于上传拾物/失物信息；
- 我的：个人主页，提供个人发布记录浏览与修改，通过客服与意见反馈可以联系后台

#### 交互设计

<div style="align: center">
<img src="https://golf.lucaszy.com/%E4%BA%A4%E4%BA%92%E8%AE%BE%E8%AE%A1-1.jpg" alt="交互说明1" width="500" height="1600" />
</div>
<div style="align: center">
<img src="https://golf.lucaszy.com/%E4%BA%A4%E4%BA%922.jpg" alt="交互说明2" width="500" height="1200" />
</div>
<div style="align: center">
<img src="https://golf.lucaszy.com/%E4%BA%A4%E4%BA%923.jpg" alt="交互说明3" width="500" height="1200" />
</div>
<div style="align: center">
<img src="https://golf.lucaszy.com/%E4%BA%A4%E4%BA%924.jpg" alt="交互说明4" width="500" height="1500" />
</div>
<div style="align: center">
<img src="https://golf.lucaszy.com/%E4%BA%A4%E4%BA%925.jpg" alt="交互说明5" width="500" height="1200" align="center" />
</div>

#### 系统框架
1. 总体开发架构
![系统机构图](https://golf.lucaszy.com/xwsl_%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84.png#pic_center)

2. 功能架构设计
![数据流程图](https://golf.lucaszy.com/%E6%95%B0%E6%8D%AE%E6%B5%81%E7%A8%8B%E5%9B%BE3.png#pic_center)

3. 用户信息流设计
![用户信息](https://golf.lucaszy.com/%E4%BA%91%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8%E4%B8%8E%E4%BC%A0%E9%80%923.png#pic_center)

- 获取用户头像与昵称：在用户首次进入小程序时，进入个人主页并点击个人头像授权将调起 getUserProfile 方法获取用户个人信息，并进行缓存。当用户第二次进入小程序时，页面将自动判断是否存在缓存数据，若存在即将数据直接展示。
- 当用户发布失物招领信息时，将向用户授权是否同意接受订阅消息以至于可以在第一时间收到拾物主的信息通知。若改授权未经同意，则对应的失物详情页发送消息将无法触发。用户授权该功能后，在用户发布的失物详情页中将通过 openid 实现推送。
- 在两个发布页界面中，用户发布的物品地理信息将通过 openLocation 调起微信内置地图 API 触发，并自动将选择值传入。该功能需要用户在小程序设置中允许小程序使用位置信息。权限开启后点击输入框将直接通过 openLocation 方法触发。若用户没有开启权限，每次点击该方法都会提示用户是否授权。否则无法直接使用。

### 开源组件说明
#### 样式组件
1. 原生组件（WeUI组件库）
小程序官方文档参考：https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html ；
https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/extended/weui/?token=1127449522&lang=zh_CN

2. ColorUI
参考文档：https://github.com/weilanwl/ColorUI

3. VanUI
参考文档：https://vant-contrib.oschina.io/vant-weapp/#/home

##### API接口
1. 计算机视觉-图像识别API：Azure - Computer Vision API (v3.2)
参考文档：https://azure.microsoft.com/zh-cn/services/cognitive-services/computer-vision/#overview

2. 和风天气API：城市天气——实时天气
参考文档：https://dev.qweather.com/docs/api/

3. 通用翻译API：百度翻译开发平台
参考文档：http://api.fanyi.baidu.com/

4. 腾讯位置服务API
参考文档：https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/jsSdkOverview

##### 插件
1. openaiwidget-微信对话机器人
参考文档：https://openai.weixin.qq.com/

2. 微信同声传译
参考文档：https://github.com/Tencent/Face2FaceTranslator

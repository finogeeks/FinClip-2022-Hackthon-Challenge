## Button 按钮

### 使用指南

在 app.wxss 中引入组件库所有样式

```css
@import "/dist/index.wxss";
```

### 代码演示

#### 基础用法

```html
<finclip-button> 默认按钮 </finclip-button>
```

#### 按钮类型

按钮支持额外的三种类型 primary, danger, warn

```html
<finclip-button type="primary"> 主要按钮 </finclip-button>

<finclip-button type="danger"> 危险按钮 </finclip-button>

<finclip-button type="warn"> 危险按钮 </finclip-button>
```

#### 按钮大小

按钮支持额外三种大小 large, small, mini

```html
<finclip-button size="large"> 大型按钮 </finclip-button>

<finclip-button size="small"> 小型按钮 </finclip-button>

<finclip-button size="mini"> 超小按钮 </finclip-button>
```

#### 其他

按钮支持镂空状态，可以直接使用 finclip-btn--plain

```html
<finclip-button plain="{{true}}"> 镂空按钮 </finclip-button>
```

同时支持加载状态，可以使用 finclip-btn--loading 获得

```html
<finclip-button loading="{{true}}"> 加载按钮 </finclip-button>
```

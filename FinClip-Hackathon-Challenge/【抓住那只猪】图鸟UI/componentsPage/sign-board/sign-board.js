(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["componentsPage/sign-board/sign-board"],{4154:function(n,t,e){},a3b9:function(n,t,e){"use strict";e.r(t);var o=e("c2de"),i=e("b7d7");for(var r in i)"default"!==r&&function(n){e.d(t,n,(function(){return i[n]}))}(r);e("f714");var a,c=e("f0c5"),u=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,"5b5c8872",null,!1,o["a"],a);t["default"]=u.exports},b7d7:function(n,t,e){"use strict";e.r(t);var o=e("f8d8"),i=e.n(o);for(var r in o)"default"!==r&&function(n){e.d(t,n,(function(){return o[n]}))}(r);t["default"]=i.a},c2de:function(n,t,e){"use strict";e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return r})),e.d(t,"a",(function(){return o}));var o={tnNavBar:function(){return Promise.all([e.e("common/vendor"),e.e("tuniao-ui/components/tn-nav-bar/tn-nav-bar")]).then(e.bind(null,"70f4"))},tnButton:function(){return Promise.all([e.e("common/vendor"),e.e("tuniao-ui/components/tn-button/tn-button")]).then(e.bind(null,"c442"))},tnSignBoard:function(){return Promise.all([e.e("common/vendor"),e.e("tuniao-ui/components/tn-sign-board/tn-sign-board")]).then(e.bind(null,"459a"))}},i=function(){var n=this,t=n.$createElement;n._self._c},r=[]},ed97:function(n,t,e){"use strict";(function(n){e("e9ee");o(e("66fd"));var t=o(e("a3b9"));function o(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=e,n(t.default)}).call(this,e("543d")["createPage"])},f714:function(n,t,e){"use strict";var o=e("4154"),i=e.n(o);i.a},f8d8:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){e.e("libs/components/dynamic-demo-template").then(function(){return resolve(e("e364"))}.bind(null,e)).catch(e.oe)},i={components:{dynamicDemoTemplate:o},data:function(){return{show:!1,imageSrc:"",signSelectColor:["#080808","#E83A30"],rotate:!0,tips:["无需依赖额外的样式文件","使用tn-sign-board组件"],sectionList:[{name:"参数切换",section:[{title:"画笔颜色",optional:["默认","自定义"],methods:"colorChange"},{title:"旋转签名",optional:["不旋转","旋转"],methods:"rotateChange",current:1}]}]}},methods:{click:function(n){this[n.methods]&&this[n.methods](n)},showSignBoard:function(){this.show=!0},colorChange:function(n){switch(n.index){case 0:this.signSelectColor=["#080808","#E83A30"];break;case 1:this.signSelectColor=["#838383","#01BEFF"];break}this.showSignBoard()},rotateChange:function(n){this.rotate=0!==n.index,this.showSignBoard()},saveSign:function(n){this.imageSrc=n,this.show=!1},closeSign:function(){this.show=!1},beforeBack:function(){var n=this;return new Promise((function(t,e){n.show?n.$t.messageUtils.modal("操作提示","当前已经打开了签名板，是否确认需要关闭",(function(){t()}),!0,(function(){e()})):t()}))}}};t.default=i}},[["ed97","common/runtime","common/vendor"]]]);
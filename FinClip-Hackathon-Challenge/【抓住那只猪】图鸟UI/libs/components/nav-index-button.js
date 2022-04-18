(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["libs/components/nav-index-button"],{"025c":function(t,n,e){"use strict";var a=e("e618"),u=e.n(a);u.a},"1d63":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"nav-index-button",props:{bottom:{type:[Number,String],default:300},right:{type:[Number,String],default:75},indexPath:{type:String,default:"/pages/index/index"}},methods:{navIndex:function(){var n=getCurrentPages();if(n&&n.length>0){var e=this.indexPath||"/pages/index/index",a=n[0];1!=n.length||a.route&&a.route==e.substring(1,e.length)?t.navigateBack({delta:1}):t.reLaunch({url:e})}else t.reLaunch({url:indexPath})}}};n.default=e}).call(this,e("543d")["default"])},5065:function(t,n,e){"use strict";e.r(n);var a=e("a395"),u=e("ad93");for(var r in u)"default"!==r&&function(t){e.d(n,t,(function(){return u[t]}))}(r);e("025c");var i,c=e("f0c5"),d=Object(c["a"])(u["default"],a["b"],a["c"],!1,null,"c035244e",null,!1,a["a"],i);n["default"]=d.exports},a395:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return a}));var u=function(){var t=this,n=t.$createElement;t._self._c},r=[]},ad93:function(t,n,e){"use strict";e.r(n);var a=e("1d63"),u=e.n(a);for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);n["default"]=u.a},e618:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'libs/components/nav-index-button-create-component',
    {
        'libs/components/nav-index-button-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5065"))
        })
    },
    [['libs/components/nav-index-button-create-component']]
]);

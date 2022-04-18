(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/template/template"],{3502:function(t,e,n){"use strict";n.r(e);var r=n("7fb7"),a=n.n(r);for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);e["default"]=a.a},"5e6b":function(t,e,n){"use strict";var r=n("f9b6"),a=n.n(r);a.a},"6dfd":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.navList,(function(e,n){var r=t.__get_orig(e),a=t._f("titleFilter")(e.title),u=t.__map(e.list,(function(e,n){var r=t.__get_orig(e),a=t.getRandomCoolBg(n);return{$orig:r,m0:a}}));return{$orig:r,f0:a,l0:u}})));t.$mp.data=Object.assign({},{$root:{l1:n}})},u=[]},"7fb7":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("c483"));function a(t){return t&&t.__esModule?t:{default:t}}var u={name:"TemplatePage",filters:{titleFilter:function(t){if(0===t.length)return"";for(var e="",n=0;n<t.length;n++)0!==n&&(e+=" / "),e+=t[n];return e}},data:function(){return{navList:r.default.data}},methods:{getRandomCoolBg:function(){return this.$t.colorUtils.getRandomCoolBgClass()}}};e.default=u},9054:function(t,e,n){"use strict";n.r(e);var r=n("6dfd"),a=n("3502");for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);n("5e6b");var o,i=n("f0c5"),f=Object(i["a"])(a["default"],r["b"],r["c"],!1,null,"6e08600c",null,!1,r["a"],o);e["default"]=f.exports},f9b6:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/template/template-create-component',
    {
        'pages/template/template-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9054"))
        })
    },
    [['pages/template/template-create-component']]
]);

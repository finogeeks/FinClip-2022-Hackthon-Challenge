(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/common/contact"],{"1a79":function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return a}));var o=function(){var t=this,n=t.$createElement;t._self._c},u=[]},"1fe4":function(t,n,e){"use strict";e.r(n);var a=e("38ad"),o=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=o.a},"38ad":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={props:{title:{type:String,default:""},path:{type:String,default:""},img:{type:String,default:""}},data:function(){return{}},methods:{handleContact:function(n){console.log("handleContact"),console.log(n);var e=n.detail.path;console.log(e);var a=JSON.stringify(n.detail.query);console.log(a);var o=e+"?from=mp&query="+a;console.log(o),t.navigateTo({url:o})}}};n.default=e}).call(this,e("543d")["default"])},"5f19":function(t,n,e){"use strict";e.r(n);var a=e("1a79"),o=e("1fe4");for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);e("ad1e");var r,c=e("f0c5"),l=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);n["default"]=l.exports},ad1e:function(t,n,e){"use strict";var a=e("c872"),o=e.n(a);o.a},c872:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/common/contact-create-component',
    {
        'components/common/contact-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5f19"))
        })
    },
    [['components/common/contact-create-component']]
]);

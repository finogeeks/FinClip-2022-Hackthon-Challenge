(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/address"],{"2ed0":function(e,t,n){"use strict";(function(e){n("2968");r(n("66fd"));var t=r(n("3680"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},3680:function(e,t,n){"use strict";n.r(t);var r=n("486a"),o=n("be79");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("cc24");var c,s=n("f0c5"),u=Object(s["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],c);t["default"]=u.exports},"3e77":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("a34a")),o=n("2f62");function a(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,r,o,a,c){try{var s=e[a](c),u=s.value}catch(i){return void n(i)}s.done?t(u):Promise.resolve(u).then(r,o)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function s(e){c(a,r,o,s,u,"next",e)}function u(e){c(a,r,o,s,u,"throw",e)}s(void 0)}))}}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=function(){n.e("components/uni-load-more/uni-load-more").then(function(){return resolve(n("0589"))}.bind(null,n)).catch(n.oe)},d=function(){n.e("components/common/copyright").then(function(){return resolve(n("749f"))}.bind(null,n)).catch(n.oe)},p={components:{uniLoadMore:l,copyright:d},data:function(){return{from:"",addressList:{},pageNo:1,loadingType:"more"}},computed:i({},(0,o.mapState)(["pageSize","theme"])),onLoad:function(e){var t=this;return s(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(console.log("option",e),""!==t.theme){n.next=4;break}return n.next=4,t.$util.loadSetting();case 4:return t.from=e.from,n.next=7,t.refreshList(!0);case 7:case"end":return n.stop()}}),n)})))()},onPullDownRefresh:function(){var t=this;return s(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log("下拉刷新"),n.next=3,t.refreshList(!0);case 3:e.stopPullDownRefresh();case 4:case"end":return n.stop()}}),n)})))()},onReachBottom:function(){var e=this;return s(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("上拉加载"),t.next=3,e.refreshList();case 3:case"end":return t.stop()}}),t)})))()},methods:{checkAddress:function(t){console.log("item:",t),"createOrder"==this.from&&(this.$helper.prePage().address=t,e.navigateBack())},addAddress:function(t,n){e.navigateTo({url:"/pages/address/addressManage?type=".concat(t,"&data=").concat(JSON.stringify(n))})},refreshList:function(e){var t=this;return s(r.default.mark((function n(){var o;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(console.log("refreshList"),e&&(console.log("refresh"),t.addressList=[],t.loadingType="loading",t.pageNo=1),"noMore"!==t.loadingType){n.next=5;break}return console.log("noMore"),n.abrupt("return");case 5:return n.next=7,t.$apis.auth.addressList(t.pageSize,t.pageNo);case 7:o=n.sent,console.log("list:",o),t.addressList=t.addressList.concat(o.data.items),console.log("addressList:",t.addressList),t.pageNo>=o.data.page_count?t.loadingType="noMore":(t.loadingType="more",t.pageNo++);case 12:case"end":return n.stop()}}),n)})))()},deleteAddress:function(t){var n=this;return s(r.default.mark((function o(){var a;return r.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:a=n,e.showModal({content:"确定要删除该地址吗？",success:function(){var e=s(r.default.mark((function e(n){var o;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!n.confirm){e.next=6;break}return console.log("aid:",t),e.next=4,a.$apis.auth.addressDelete(t);case 4:o=e.sent,o.errMsg||(a.$helper.msg("已删除地址"),a.refreshList(!0));case 6:case"end":return e.stop()}}),e)})));function n(t){return e.apply(this,arguments)}return n}()});case 2:case"end":return o.stop()}}),o)})))()}}};t.default=p}).call(this,n("543d")["default"])},"486a":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}));var r={uniLoadMore:function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"0589"))}},o=function(){var e=this,t=e.$createElement;e._self._c},a=[]},"84f8":function(e,t,n){},be79:function(e,t,n){"use strict";n.r(t);var r=n("3e77"),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=o.a},cc24:function(e,t,n){"use strict";var r=n("84f8"),o=n.n(r);o.a}},[["2ed0","common/runtime","common/vendor"]]]);
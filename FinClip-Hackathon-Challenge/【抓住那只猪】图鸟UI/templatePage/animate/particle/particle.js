(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["templatePage/animate/particle/particle"],{4275:function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return i}));var i={tnNavBar:function(){return Promise.all([e.e("common/vendor"),e.e("tuniao-ui/components/tn-nav-bar/tn-nav-bar")]).then(e.bind(null,"70f4"))}},a=function(){var t=this,n=t.$createElement;t._self._c},r=[]},5110:function(t,n,e){},"68e8":function(t,n,e){"use strict";(function(t){e("e9ee");i(e("66fd"));var n=i(e("884b"));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},"6d20":function(t,n,e){"use strict";e.r(n);var i=e("8747"),a=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);n["default"]=a.a},8747:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e("222d"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function o(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function s(t,n,e){return n&&o(t.prototype,n),e&&o(t,e),t}var u=function(){function t(n,e){r(this,t),this.x=n,this.y=e,this.r=1+2*Math.random(),this.sx=2*Math.random()-1,this.sy=2*Math.random()-1}return s(t,[{key:"draw",value:function(t){t.beginPath(),t.arc(this.x,this.y,this.r,0,2*Math.PI),t.closePath(),t.fillStyle="#fff",t.fill()}},{key:"move",value:function(t,n){this.x+=this.sx,this.y+=this.sy,(this.x>t||this.x<0)&&(this.sx=-this.sx),(this.y>n||this.y<0)&&(this.sy=-this.sy)}},{key:"drawLine",value:function(t,n){var e=this.x-n.x,i=this.y-n.y,a=Math.sqrt(e*e+i*i);if(a<100){var r=(100-a)/300*1;t.beginPath(),t.moveTo(this.x,this.y),t.lineTo(n.x,n.y),t.closePath(),t.strokeStyle="rgba(255, 255, 255, "+r+")",t.strokeWidth=1,t.stroke()}}}]),t}(),c=t.getSystemInfoSync(),f=400,l=1e3,h={name:"TemplateParticle",mixins:[i.default],data:function(){return{ctx:null,screenWidth:c.screenWidth,screenHeight:c.screenHeight,timer:null,points:[]}},onLoad:function(n){this.from=n.from||"";for(var e=0;e<80;e++)this.points.push(new u(Math.random()*f,Math.random()*l));this.ctx=t.createCanvasContext("star_canvas"),this.gameloop()},onUnload:function(){clearTimeout(this.timer)},methods:{gameloop:function(){this.timer=setTimeout(this.gameloop,100),this.paint()},paint:function(){this.ctx.clearRect(0,0,f,l);for(var t=0;t<this.points.length;t++){this.points[t].move(f,l),this.points[t].draw(this.ctx);for(var n=t+1;n<this.points.length;n++)this.points[t].drawLine(this.ctx,this.points[n])}this.ctx.draw()}}};n.default=h}).call(this,e("543d")["default"])},"884b":function(t,n,e){"use strict";e.r(n);var i=e("4275"),a=e("6d20");for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);e("f887");var o,s=e("f0c5"),u=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"6540f47b",null,!1,i["a"],o);n["default"]=u.exports},f887:function(t,n,e){"use strict";var i=e("5110"),a=e.n(i);a.a}},[["68e8","common/runtime","common/vendor"]]]);
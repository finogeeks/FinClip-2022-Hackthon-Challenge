// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }

// module.exports = {
//   formatTime: formatTime
// }
var e = require("./WXBizDataCrypt"), t = require("../configs"), n = require("./cryptojs/cryptojs.js").Crypto, r = require("moment.min.js"), a = function(e) {
  return (e = e.toString())[1] ? e : "0" + e;
}, o = function(e) {
  if (console.log("d", e), !e) return "";
  var t = new Date(i(e));
  return t.getFullYear() + "年" + (t.getMonth() + 1) + "月" + t.getDate() + "日(周" + [ "日", "一", "二", "三", "四", "五", "六" ][t.getDay()] + ")";
}, i = function(e) {
  var t = e.replace(/\-/g, "");
  return [ t.substr(0, 4), t.substr(4, 2), t.substr(6, 2) ].join("-");
}, s = function(e) {
  return t[e];
}, u = function(e) {
  return e.includes("am") ? "9:30" : e.includes("pm") ? "14:30" : e;
};

module.exports = {
  formatTime: function(e) {
      var t = e.getFullYear(), n = e.getMonth() + 1, r = e.getDate(), o = e.getHours(), i = e.getMinutes(), s = e.getSeconds();
      return [ t, n, r ].map(a).join("-") + " " + [ o, i, s ].map(a).join(":");
  },
  decryptData: function(t, n) {
      var r = getApp();
      r.globalData.appId && r.globalData.sessionKey || console.error("invalid appId or sessionKey", r.globalData), 
      console.log("decryptData", r.globalData.appId, r.globalData.sessionKey);
      var a = new e(r.globalData.appId, r.globalData.sessionKey).decryptData(t, n);
      return console.log("解密后 data: ", a), a;
  },
  paySign: function(e, r, a, o, i) {
      var s = {
          appId: t.appId,
          nonceStr: e,
          package: r,
          signType: a,
          timeStamp: o
      }, u = function(e) {
          var t = Object.keys(e), n = {};
          (t = t.sort()).forEach(function(t) {
              n[t] = e[t];
          });
          var r = "";
          for (var a in n) r += "&" + a + "=" + n[a];
          return r = r.substr(1);
      }(s);
      return u = u + "&key=" + i, console.log("ret", s), console.log("api_key", i), console.log("string", u), 
      n.MD5(u).toUpperCase();
  },
  shuffle: function(e) {
      for (var t, n, r = e.length; 0 !== r; ) n = Math.floor(Math.random() * r), t = e[r -= 1], 
      e[r] = e[n], e[n] = t;
      return e;
  },
  UTC0Time: function(e) {
      return e.setTime(e.getTime() + 60 * e.getTimezoneOffset() * 1e3);
  },
  UTC8Time: function(e) {
      return e.setTime(e.getTime() + 60 * (e.getTimezoneOffset() + 480) * 1e3);
  },
  moment: r,
  chunkArray: function(e, t) {
      for (var n = [], t = t || 6, r = 0; r < e.length; r += t) n.push(e.slice(r, r + t));
      return n;
  },
  formatFullDateLabel: o,
  formatInventoryLabel: function(e) {
      return e && e.date ? o(e.date) + " " + u(e.sku) : "";
  },
  appendProcessSuffix: function(e) {
      return e;
  },
  config: s,
  skuLabel: u,
  isWeekend: function(e) {
      return new Date(e).getDay() % 6 == 0;
  },

  artworkTabs: function(e, t) {
      var n = Object.assign([], s("artworkTabs_" + t));
      return n.forEach(function(t) {
          t.category_id === e ? t.active = !0 : t.active = !1;
      }), n;
  },
  
  apiPrefix: !0 === t.debug ? "https://haybirds.me/beta/api" : "https://haybirds/api"
};
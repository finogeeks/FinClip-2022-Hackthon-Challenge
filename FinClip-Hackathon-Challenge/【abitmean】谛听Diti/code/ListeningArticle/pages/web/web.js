Page({
  data: {
      url: ""
  },
  onLoad: function(t) {
      wx.hideShareMenu({}), 
      this.setData({
          url: decodeURIComponent(t.url)
      });
      var a = new e.Query("essay");
      a.equalTo("url", this.data.url), a.select([ "title", "objectId" ]);
      var s = this;
      a.first().then(function(e) {
          s.setData({
              essay: e
          }), wx.setNavigationBarTitle({
              title: e.get("title")
          }), wx.showShareMenu({});
      });
  },
  onShareAppMessage: function() {
      var e = this;
      return {
          title: "这篇好文章分享给你阅读",
          path: "pages/web/web?url=" + encodeURIComponent(this.data.url),
          complete: function(a) {
              "shareAppMessage:ok" === a.errMsg && t("share", {
                  essayTitle: e.data.essay.title,
                  essayId: e.data.essay.objectId
              }).catch(function(e) {
                  console.error(e);
              });
          }
      };
  }
});
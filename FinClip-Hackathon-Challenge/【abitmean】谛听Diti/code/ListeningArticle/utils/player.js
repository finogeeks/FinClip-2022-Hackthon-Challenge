var i = {}, n = {};

n.init = function() {}, 

n.addObserver = function(i) {
    if (i) {
        var n = this._.info.properties.observers;
        -1 == n.indexOf(i) && n.push(i);
    }
}, 

n.removeObserver = function(i) {
    if (i) {
        var n = this._.info.properties.observers.indexOf(i);
        -1 != n && this._.info.properties.observers.splice(n, 1);
    }
}, 

n.startPlay = function(i) {
    var n = this;
    if (i && i.xfvoice && 0 != i.xfvoice.length) {
        this._.info.properties.playData = i, this._.info.properties.playList.push(i);
        var o = this._.info.properties.bgAudioManager;
        null == o && (o = wx.getBackgroundAudioManager(), this._.info.properties.bgAudioManager = o), 
        o.title = i.title, o.epname = i.desc, i.xfvoice ? o.src = i.xfvoice : o.src = i.voice, 
        o.coverImgUrl = i.cover, i.author ? o.singer = i.author : i.publicNo && (o.singer = i.publicNo), 
        o.onPlay(function(i) {
            n._.info.properties.playing = !0, n._.info.notify("onPlay", {
                duration: o.duration
            });
        }), o.onPause(function() {
            n._.info.properties.playing = !1, n._.info.notify("onPause", {});
        }), o.onStop(function() {
            n._.info.properties.playing = !1, n._.info.notify("onStop", {});
        }), o.onNext(function() {
            n._.info.notify("onNext", {});
        }), o.onPrev(function() {
            n._.info.notify("onPrev", {});
        }), o.onEnded(function() {
            n._.info.properties.bgAudioManager = null, n._.info.properties.playing = !1, n._.info.notify("onEnded", {});
        }), o.onTimeUpdate(function() {
            n._.info.notify("onTimeUpdate", {
                currentTime: o.currentTime,
                duration: o.duration
            });
        });
    }
}, 

n.playData = function() {
    return this._.info.properties.playData;
}, 

n.playing = function() {
    return this._.info.properties.playing;
}, 

n.currentTime = function() {
    return this._.info.properties.bgAudioManager.currentTime;
}, 

n.duration = function() {
    return this._.info.properties.bgAudioManager.duration;
}, 

n.playList = function() {
    return this._.info.properties.playList;
}, 

n.play = function() {
    this._.info.properties.playing = !0, this._.info.properties.bgAudioManager.play();
}, 

n.pause = function() {
    this._.info.properties.playing = !1, this._.info.properties.bgAudioManager.pause();
}, 

n.seek = function(i) {
    this._.info.properties.bgAudioManager.seek(i);
}, 


i.info = {
    properties: {
        observers: [],
        playing: false,
        playData: null,
        playList: [],
        bgAudioManager: null
    },
    notify: function(i, n) {
        this.properties.observers.forEach(function(o) {
            o[i] && o[i](n);
        });
    }
};

var o = App;

function e(i) {
    this, n.init();
}

App = function(i) {
    !function(i, n, o) {
        if (i[n]) {
            var e = i[n];
            i[n] = function(i) {
                o.call(this, i, n), e.call(this, i);
            };
        } else i[n] = function(i) {
            o.call(this, i, n);
        };
    }(i, "onLaunch", e), o(i);
}, n._ = i, module.exports = n;
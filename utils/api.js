import config from 'config.js'
const app = getApp()
var domain = config.getDomain
var HOST_DOMAIN = config.hostDomain
var CID = config.CID

module.exports = {
    //小程序登录
    login: function (obj) {
        var url = app.globalData.api + 'Users/'
        return url
    },
    //保存用户信息
    postUserInfo: function () {
        var url = app.globalData.api + 'Users/'
        return url
    },
    // 获取我的记录
    getList: function (obj) {
        var url =
            app.globalData.api +
            '/Lists/?fields=id,title,status,create_time&offset=' +
            obj.offset +
            '&limit=' +
            obj.limit +
            '&type=' +
            obj.type
        return url
    },
    //删除我的记录
    deleteList: function (obj) {
        var url = app.globalData.api + '/Lists/' + obj.id + '/hide'
        return url
    },

    //获取抽奖配置详情
    getListByID: function (obj) {
        var url = app.globalData.api + '/Lists/'
        return url
    },
    //获取全部中奖详情
    getWinListByID: function (obj) {
        var url = app.globalData.api + '/win/' + obj.list_id + '.html'
        return url
    },
    //分页加载中奖用户
    getWinListByPage: function (obj) {
        var url =
            app.globalData.api +
            '/winmore?list_id=' +
            obj.lid +
            '&detail_id=' +
            obj.id +
            '&p=' +
            obj.p +
            '&type=' +
            obj.type
        return url
    },
    //核销
    putKXByID: function (obj) {
        var url = app.globalData.api + '/awarded.html'
        return url
    },
    //获取个人中心
    getUserInfo: function (obj) {
        var url = app.globalData.api + '/userinfo.html'
        return url
    },
    //获取推荐小程序
    getRecommend: function () {
        var url = app.globalData.api + 'recommend.html'
        return url
    },

    //获取收货地址列表
    getAddrList: function (obj) {
        var url = app.globalData.api + '/address.html'
        return url
    },
    //获取单条收货地址
    getAddrListByID: function (obj) {
        var url = app.globalData.api + '/address/' + obj.id + '.html'
        return url
    },
    //获取确认收货地址
    getAddrByID: function (obj) {
        var url = app.globalData.api + '/confirmAddress/' + obj.id + '.html'
        return url
    },
    //提交收货地址
    postAddr: function (obj) {
        var url = app.globalData.api + '/address.html'
        return url
    },
    //提交确认收货地址（微信）
    postAddrWX: function (obj) {
        var url = app.globalData.api + '/confirmAddress/' + obj.id + '.html'
        return url
    },
    //获取抽奖列表
    getMyList: function (obj) {
        var url =
            app.globalData.api +
            '/myList.html?type=' +
            obj.type +
            '&status=' +
            obj.status +
            '&p=' +
            obj.page +
            '&limit=' +
            obj.limit
        return url
    },
    //确认收货地址
    confirmAddr: function (obj) {
        var url = app.globalData.api + '/confirmAddress.html'
        return url
    },
    //获取QA列表
    getAQList: function (obj) {
        var url = app.globalData.api + '/question.html'
        return url
    },
    //获取QA详情
    getAQListByID: function (obj) {
        var url = app.globalData.api + '/question/' + obj.id + '.html'
        return url
    },
    //获取参与推荐广告
    getJoinGameList: function (obj) {
        var url = app.globalData.api + 'ad?v=3.0'
        return url
    },
    //收集宣传需求数据
    postSpread: function (obj) {
        var url = app.globalData.api + '/spread.html'
        return url
    },
    //创建抽奖
    postLottery: function (obj) {
        var url = obj
        return url
    },
    //更新抽奖
    putLottery: function (obj) {
        var url = obj
        return url
    },
    //编辑抽奖
    getLottery: function (obj) {
        var url = obj
        return url
    },
    //获取详情
    getDetail: function (obj) {
        var url = app.globalData.api + '/lists/' + obj.lid + '/runs.html'
        return url
    },
    //手动开奖【请求奖项】
    getManual: function (obj) {
        var url = app.globalData.api + '/manual/' + obj.lid + '.html'
        return url
    },
    // 手动开奖【确认中奖用户】
    confirmLottery: function (obj) {
        var url = app.globalData.api + '/confirmLottery.html'
        return url
    },
    //手动抽奖【确认抽奖结束】
    manualComplete: function (obj) {
        var url = app.globalData.api + '/manualComplete/' + obj.id
        return url
    },

    //摇号开奖
    getRock: function (obj) {
        var url = app.globalData.api + '/rocking/' + obj.lid + '.html'
        return url
    },
    //个人中心推荐活动
    getEvents: function (obj) {
        var url = app.globalData.api + '/activity.html'
        return url
    },
    //中奖用户导出
    winnerExport: function (obj) {
        var url = app.globalData.api + '/export/' + obj.list_id + '.html'
        return url
    },

    //手机扫码
    webScan: function (obj) {
        var url = app.globalData.api + '/DzpGzh/scan.html'
        return url
    },

    //授权登录
    scanCodeAuth: function (obj) {
        var url = app.globalData.api + '/DzpGzh/authorize.html'
        return url
    },

    //趣味抽奖获取奖项列表
    getTaste: function (obj) {
        var url = app.globalData.api + '/taste'
        return url
    },
    //现场抽奖等级列表
    getXCLive: function (obj) {
        var url = app.globalData.api + '/live?rsv=mc'
        return url
    },
    //现场抽奖等级权限
    getQuota: function (obj) {
        var url = app.globalData.api + '/live/quota?rsv=mc'
        return url
    },
    //现场抽奖等级权限付款
    postLivepay: function (obj) {
        var url = app.globalData.api + '/livepay'
        return url
    },

    //抽奖大转盘等级权限付款
    postTurnTablePay: function (obj) {
        var url = app.globalData.api + '/turntablepay'
        return url
    },

    //获取反馈列表
    getFeedback: function (obj) {
        var url =
            app.globalData.api + '/feedback?p=' + obj.p + '&limit=' + obj.limit
        return url
    },
    //发送反馈
    postFeedback: function (obj) {
        var url = app.globalData.api + '/feedback'
        return url
    },
    //常见问题
    getQuestionLive: function (obj) {
        var url = app.globalData.api + '/QuestionLive'
        return url
    },
    //手动抽奖 拉取开奖的信息
    postWaitLottery: function (obj) {
        var url = app.globalData.api + '/getWaitLottery/' + obj.id
        return url
    },

    //奖池关闭或开启
    poolDraw: function (obj) {
        var url = app.globalData.api + '/pool/draw'
        return url
    },

    //奖池抽奖
    postPoolLottery: function () {
        var url = app.globalData.api + '/pool/lottery'
        return url
    },

    //邀请记录
    getInvitelog: function (obj) {
        var url =
            app.globalData.api +
            '/DzpProxy/invitelog.html?p=' +
            obj.p +
            '&limit=' +
            obj.limit
        return url
    },

    //代理邀请
    postInvitel: function (obj) {
        var url = app.globalData.api + '/DzpProxy/invite.html'
        return url
    },

    //申请提现
    postWithdraw: function (obj) {
        var url = app.globalData.api + '/DzpProxy/withdraw.html'
        return url
    },
    //提现记录
    getWidthdrawlog: function (obj) {
        var url =
            app.globalData.api +
            '/DzpProxy/widthdrawlog.html?p=' +
            obj.p +
            '&limit=' +
            obj.limit
        return url
    },

    //补充提现资料
    postBank: function (obj) {
        var url = app.globalData.api + '/DzpProxy/bank.html'
        return url
    },

    //我的佣金
    getProxy: function (obj) {
        var url = app.globalData.api + '/DzpProxy/proxy.html'
        return url
    },

    //我的佣金记录
    getProxyLog: function (obj) {
        var url =
            app.globalData.api +
            '/DzpProxy/proxylog.html?p=' +
            obj.p +
            '&limit=' +
            obj.limit
        return url
    },

    //获取大转盘段位
    getTurntable: function (obj) {
        var url = app.globalData.api + '/turntable'
        return url
    },

    //新版大转盘
    //大转盘付费版本
    getDZPVersion: function () {
        var url = app.globalData.api + 'Dzp/version'
        return url
    },

    //检测大转盘购买

    checkDZPBuy: function () {
        var url = app.globalData.api + 'Dzp/buy'
        return url
    },

    //大转盘下单购买

    postDZPBuy: function () {
        var url = app.globalData.api + 'Dzp/order'
        return url
    },

    //大转盘创建抽奖
    postNomarlLottery: function (obj) {
        var url = app.globalData.api + 'Dzp/lottery'
        return url
    },

    //获取抽奖大转盘
    getNomarlLottery: function (obj) {
        var url = app.globalData.api + 'Dzp/lottery?lottery_id=' + obj.id
        return url
    },

    //获取大转盘详情
    getDZPLotteryByID: function (obj) {
        var url = app.globalData.api + 'Dzp/detail?lottery_id=' + obj.id
        return url
    },

    //大转盘 开启与暂停
    postPauseByID: function (obj) {
        var url = app.globalData.api + 'Dzp/pause'
        return url
    },

    //大转盘 参与抽奖

    postDzpjoin: function (obj) {
        var url = app.globalData.api + 'Dzp/join'
        return url
    },

    getPoolCheck: function (obj) {
        var url =
            app.globalData.api +
            'Dzp/check?lottery_id=' +
            obj.lottery_id +
            '&sort=' +
            obj.sort
        return url
    },

    //获取大转盘全部中奖详情
    getDZPWinListByID: function (obj) {
        var url = app.globalData.api + 'Dzp/prize?lottery_id=' + obj.list_id
        return url
    },
    //分页加载大转盘中奖用户
    getDZPWinListByPage: function (obj) {
        var url =
            app.globalData.api +
            '/Dzp/page?lottery_id=' +
            obj.lid +
            '&lottery_detail_id=' +
            obj.id +
            '&page=' +
            obj.p
        return url
    },

    //大转盘提交确认收货地址（微信）
    postDZPAddrWX: function (obj) {
        var url = app.globalData.api + 'Dzp/addr'
        return url
    },

    getDZPCenter: function () {
        var url = app.globalData.api + 'Dzp/center'
        return url
    },

    //获取抽奖列表
    getMyDZPList: function (obj) {
        var url = app.globalData.api
        if (obj.type == 1) {
            url +=
                'Dzp/list' +
                '&status=' +
                obj.status +
                '&page=' +
                obj.page +
                '&perpage=' +
                obj.limit
        } else if (obj.type == 2) {
            url +=
                'Dzp/jlist' +
                '&status=' +
                obj.status +
                '&page=' +
                obj.page +
                '&perpage=' +
                obj.limit
        } else if (obj.type == 3) {
            url +=
                'Dzp/plist' +
                '&status=' +
                obj.status +
                '&page=' +
                obj.page +
                '&perpage=' +
                obj.limit
        } else if (obj.type == 4) {
            url +=
                'DzpHelper/lottery?' + 'p=' + obj.page + '&limit=' + obj.limit
        }
        return url
    },

    getDZPWinnerToken: function (obj) {
        var url = app.globalData.api + 'Dzp/token?lottery_id=' + obj.lottery_id
        return url
    },

    getDZPpluginid: function (obj) {
        var url = app.globalData.api + 'dzp/pluginid?lottery_id=' + obj.lid
        return url
    },

    getDZPArticles: function (obj) {
        var url =
            app.globalData.api +
            '/users/wxurl?app_id=' +
            obj.app_id +
            '&limit=' +
            obj.limit
        return url
    },

    //核销界面get请求：
    getQrcode: function (obj) {
        var url = app.globalData.api + '/dzp/check_qrcode?' + obj
        return url
    },

    //提前结束插件抽奖
    postPluginEnd: function (obj) {
        var url = app.globalData.api + 'dzp/pluginEnd'
        return url
    },

    //提前结束普通抽奖
    postPluginEnd: function (obj) {
        var url = app.globalData.api + 'dzp/lotteryEnd'
        return url
    },
    //公共抽奖列表
    getPubliclottery: function (obj) {
        var url = app.globalData.api + 'dzp/publiclottery'
        return url
    },
    //获得邀请好友信息
    postPublicInvite: function (obj) {
        var url = app.globalData.api + 'dzp/invite'
        return url
    },

    //获得邀请好友列表
    getPublicInvite: function (obj) {
        var url =
            app.globalData.api +
            'dzp/invite?lottery_id=' +
            obj.lottery_id +
            '&p=' +
            obj.p +
            '&limit=' +
            obj.limit
        return url
    },

    //大转盘 自然堂门店 参与抽奖

    postZRTjoin: function (obj) {
        var url = app.globalData.api + 'zrt/join'
        return url
    },

    getZRTCheck: function (obj) {
        var url = app.globalData.api + 'zrt/check'
        return url
    },
    getZRTDetail: function (obj) {
        var url =
            app.globalData.api +
            'zrt/detail?lottery_id=' +
            obj.lottery_id +
            '&phone=' +
            obj.phone
        return url
    },

    postShopID: function () {
        var url = app.globalData.api + 'zrt/shop'
        return url
    },

    toBeHX: function () {
        var url = app.globalData.api + 'zrt/auth'
        return url
    },

    getZRTQrcode: function (obj) {
        var url = app.globalData.api + 'zrt/wait?' + obj
        return url
    },

    postZRTQrcode: function (obj) {
        var url = app.globalData.api + 'zrt/verify'
        return url
    },

    getIsJoin: function () {
        var url = app.globalData.api + 'zrt/find'
        return url
    },

    //大转盘获取授权公众号列表

    getAuthorizerInfo: function () {
        var url = 'https://api-pay.chouchoujiang.com/WxAuth/get_authorizer_info'
        return url
    },
    //根据真实ID获取抽奖基本信息
    getLotteyInfo: function () {
        var url = app.globalData.api + `DzpHelper/index`
        return url
    },
    //获取分享者邀请码or核销员邀请码
    getMulitQrcode: function (obj) {
        var url = app.globalData.api + 'DzpHelper/invite?id=' + obj.id
        return url
    },
    //获取授权分享者列表与核销员列表ß
    getMulitUsers: function (obj) {
        var url =
            app.globalData.api +
            'DzpHelper/index?lottery_id=' +
            obj.id +
            '&p=' +
            obj.p +
            '&limit=' +
            obj.limit
        return url
    },
    //保存邀请者
    postMulitQrcode: function (obj) {
        var url = app.globalData.api + 'DzpHelper/invite'
        return url
    },
    //删除核销者
    removeMulitUser: function (obj) {
        var url = app.globalData.api + 'DzpHelper/index'
        return url
    },
    //大型活动报备提交
    DingdingWarming: function (obj) {
        var url = app.globalData.api + 'DingdingWarming/create'
        return url
    },
    //大型活动报备提交
    getlotterynum: function (obj) {
        var url = app.globalData.api + 'DzpHelper/lotterynum'
        return url
    },
    //大型活动报备提交
    setJoin: function (obj) {
        var url = app.globalData.api + 'DzpHelper/join'
        return url
    },

    //获取投诉分类
    getFeedbackTypeList(obj) {
        return app.globalData.api + 'Users/feedbackTypeList?source=' + obj.source
    },
    //提交问题反馈
    postUserProposal() {
        return app.globalData.api + 'Users/userProposal'
    },
    //提交投诉
    postUserComplaint() {
        return app.globalData.api + 'Users/userComplaint'
    }
}
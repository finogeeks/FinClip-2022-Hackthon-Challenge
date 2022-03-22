Component({
    properties: {},
    data: {
        open: !0,
        loginStep: 1,
        rawInputValue: "",
        code1: "",
        code2: "",
        code3: "",
        code4: ""
    },
    methods: {
        bindPhoneHandler: function() {
            this.setData({
                loginStep: 2
            });
        },
        loginChoose: function() {
            this.setData({
                loginStep: 1
            });
        },
        sendCodeHandler: function() {
            this.setData({
                loginStep: 3
            });
        },
        sendAgain: function() {
            console.log("sss");
        },
        rawInputHandler: function(t) {
            var e = t.detail.value, n = e.length > 4 ? e.substring(0, 4) : e;
            this.setData({
                rawInputValue: n,
                code1: n.substr(0, 1),
                code2: n.substr(1, 1),
                code3: n.substr(2, 1),
                code4: n.substr(3, 1)
            });
        },
        closeLogin: function() {
            this.setData({
                open: !1
            });
        }
    }
});
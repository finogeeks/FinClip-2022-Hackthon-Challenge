function e(e, i) {
    var r = void 0;
    return o[e].forEach(function(e) {
        e.id === i && (r = e);
    }), r;
}

var o = {
    Order: [ {
        id: "created",
        name: "已创建",
        workflow: "预订"
    }, {
        id: "confirmed",
        name: "已确认",
        workflow: "预订"
    }, {
        id: "resolved",
        name: "已拆分",
        workflow: "预订"
    }, {
        id: "merged",
        name: "被合并",
        workflow: "预订"
    }, {
        id: "revoked",
        name: "已取消",
        workflow: "预订"
    }, {
        id: "closed",
        name: "已关闭",
        workflow: "预订"
    }, {
        id: "finished",
        name: "已完成",
        workflow: "评价"
    } ],
    Payment: [ {
        id: "unpaid",
        name: "未支付",
        workflow: "预订"
    }, {
        id: "prepaid",
        name: "已付定金",
        workflow: "预订"
    }, {
        id: "paid_in_full",
        name: "已付全款",
        workflow: "拍摄"
    }, {
        id: "refund_issued",
        name: "退款中",
        workflow: "预订"
    }, {
        id: "refund_settled",
        name: "已退款",
        workflow: "预订"
    } ],
    Ticket: [ {
        id: "confirmed",
        name: "等待拍摄",
        workflow: "拍摄"
    }, {
        id: "service_prepared",
        name: "拍前准备",
        workflow: "拍摄"
    }, {
        id: "service_completed",
        name: "拍摄完毕",
        workflow: "拍摄"
    }, {
        id: "service_incompleted",
        name: "未完成拍摄",
        workflow: "拍摄"
    }, {
        id: "raw_demo_sent",
        name: "小样已发送",
        workflow: "选片"
    }, {
        id: "photo_selected",
        name: "选片完成",
        workflow: "选片"
    }, {
        id: "pp_assigned",
        name: "后期处理中",
        workflow: "后期"
    }, {
        id: "pp_initial_retouched",
        name: "后期处理中",
        workflow: "后期"
    }, {
        id: "pp_final_retouched",
        name: "后期处理中",
        workflow: "后期"
    }, {
        id: "pp_album_designed",
        name: "后期处理中",
        workflow: "后期"
    }, {
        id: "pp_album_design_sent",
        name: "等待确认排版",
        workflow: "后期"
    }, {
        id: "pp_album_design_confirmed",
        name: "排版已确认",
        workflow: "后期"
    }, {
        id: "pp_album_design_has_feedback",
        name: "有修改意见",
        workflow: "后期"
    }, {
        id: "pp_album_on_printing",
        name: "开始制作",
        workflow: "工厂"
    } ]
};

module.exports = {
    states: function(i) {
        var r = i.state, n = i.payment_state, a = i.ticket.state, t = 0, d = "", w = [ {
            workflow: "预订",
            status: "",
            active: !1
        }, {
            workflow: "拍摄",
            status: "",
            active: !1
        }, {
            workflow: "选片",
            status: "",
            active: !1
        }, {
            workflow: "后期",
            status: "",
            active: !1
        }, {
            workflow: "制作",
            status: "",
            active: !1
        }, {
            workflow: "发货",
            status: "",
            active: !1
        }, {
            workflow: "评价",
            status: "",
            active: !1
        } ];
        if ([ "created", "revoked", "closed" ].includes(r)) return t = 0, d = [ "unpaid", "refund_issued", "refund_settled" ].includes(n) ? e("Payment", n) : e("Order", r), 
        w[t].active = !0, w[t].status = d.name, w;
        if ("finished" === r && "finished" === a) return t = 6, w[t].active = !0, w[t].status = "服务完毕", 
        w;
        var f = o.Ticket.find(function(e) {
            return e.id === a;
        });
        if (console.log("3 state", r, n, a), !f) return [];
        var l = w.find(function(e) {
            return e.workflow === f.workflow;
        });
        if (l) return l.active = !0, l.status = f.name, w;
        console.error("unexpected index", r, n, a);
    }
};
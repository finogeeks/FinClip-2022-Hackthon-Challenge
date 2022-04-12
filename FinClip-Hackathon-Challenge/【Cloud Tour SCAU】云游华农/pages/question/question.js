Page({
  data:{
    ti:[],//用于前端显示的数据
    dati:'',
    A:[],
    a:'',
    B:[],
    b:'',
    C:[],
    c:'',
    D:[],
    d:'',
    ca:[],//储存是否选中该选项
    cb:[],
    cc:[],
    cd:[],
    fa:[],//储存选中之后为错误
    fb:[],
    fc:[],
    fd:[],
    ta:[],//储存选中之后为正确
    tb:[],
    tc:[],
    td:[],
    fA:false,
    fB:false,
    fC:false,
    fD:false,
    tA:false,
    tB:false,
    tC:false,
    tD:false,
    isa:false,
    isb:false,
    isc:false,
    isd:false,
    tr:[],//全部取出的题
    tr1:'',//对应题号的题
    index:1,//题的编码数
    xuanle:false,
    dui:0,//正确的个数
    dui1:[],
    xuanzhong:'',//选中的选项
    xuanz:[],//每一题所对应的选项
    problems:[],//每一题对应题库的哪一题
    second:6000,//倒计时
    seconds:'',
    minutes:'',
    onsubmity:false,
    alreadyanswer:[],
    ishide:true,
    realHeight:'',
    starttime:0,
  },
   onLoad:function(){
    var problem =0
    var i=0
    var j=0
    var tong = false
    var A =''
    var B =''
    var C =''
    var D =''
    var ti=''
    var tr='' 
    //数据初步处理
    if(this.data.second==0&&!this.data.onsubmity){
         wx.showToast({
              title: '交卷成功',
              duration: 1000,
              mask:true,
              success: function () {
                wx.redirectTo({
                  url: '../questionj/questionj',
                })
              }
            })
    }
    //数据的选择以c开头，正确以t开头，错误以f开头，先往选项里面全推入false以表示未有选中
    for(j=0;j<10;j++){
      this.data.xuanz.push('')
      this.data.ca.push(false)
      this.data.cb.push(false)
      this.data.cc.push(false)
      this.data.cd.push(false)
      this.data.fa.push(false)
      this.data.fb.push(false)
      this.data.fc.push(false)
      this.data.fd.push(false)
      this.data.ta.push(false)
      this.data.tb.push(false)
      this.data.tc.push(false)
      this.data.td.push(false)
      this.data.alreadyanswer.push(false)
    }
    //题库随机化(随机题号)
    //tong用于表示题号是否冲突
    this.data.xuanz.splice(0,1,'e')
    while(this.data.problems.length<10){
      problem = parseInt(Math.random()*22)+1
      for(i=0;i<this.data.problems.length;i++){
        if(problem==this.data.problems[i]){
          tong=true}
      }
      if(!tong){
        this.data.problems.push(problem)}
      tong=false
    }
       //选项随机
    let res ={data:[ 
      {a: "1月8日",b: "12月2日",c: "11月11日",d: "11月10日",id: 18,text:"华南农业大学校庆日是____。",tr: "11月10日",_id: "1"},
      {a: "1",b: "2",c: "3",d: "4",id: 18,text: "华农一共有____个运动场。",tr: "4",_id: "2"},
      {a: "牛奶",b: "大米",c: "酸果汁",d: "酸奶",id: 18,text: "华农最出名的特产是____。",tr: "酸奶",_id: "3"},
      {a: "黄色",b: "蓝色",c: "红色",d: "绿色",id: 18,text: "华农的校徽是____颜色。",tr: "绿色",_id: "4"},
      {a: "西园",b: "绿榕园",c: "香园",d: "芷园",id: 18,text: "华农最早的食堂是____",tr: "香园",_id: "5"},
      {a: "第一教学楼",b: "红满堂",c: "第六教学楼",d: "行政楼",id: 18,text: "丁颖礼堂位于____。",tr: "第六教学楼",_id: "6"},
      {a: "西园",b: "稻香园",c: "荷园",d: "芷园",id: 18,text: "华农环境最好的食堂是____",tr: "西园",_id: "7"},
      {a: "樱花",b: "紫荆花",c: "桃花",d: "木棉花",id: 18,text: "春天在行政楼前盛开的花是____。",tr: "紫荆花",_id: "8"},
      {a: "五湖五海",b: "三湖四海",c: "五湖八海",d: "五湖四海",id: 18,text: "大学是一座自然景色与人文景观交相辉映的校园，形成了“____一片林的紫荆校园。",tr: "五湖四海",_id: "9"},
      {a: "鄱阳湖",b: "西湖",c: "宁荫湖",d: "洪泽湖",id: 18,text: "距离华农正门最近的湖是____。",tr: "洪泽湖",_id: "10"},
     ]}
    //选项随机
    for(i=0;i<10;i++){
       var index1 = this.data.problems[i]
       var suiji1 = parseInt(Math.random()*4)+1
       var suiji2 = parseInt(Math.random()*4)+1
       while(suiji1==suiji2){
         suiji2=parseInt(Math.random()*4)+1
        }
       var suiji3 = parseInt(Math.random()*4)+1
       while(suiji1==suiji3||suiji3==suiji2){
         suiji3=parseInt(Math.random()*4)+1
       }
       var suiji4 = parseInt(Math.random()*4)+1
       while(suiji1==suiji4||suiji2==suiji4||suiji3==suiji4){
         suiji4=parseInt(Math.random()*4)+1
       }
    
            ti = res.data[i].text
            tr = res.data[i].tr
             switch (suiji1) {
               case 1: A = res.data[i].a; break
               case 2: A = res.data[i].b; break
               case 3: A = res.data[i].c; break
               case 4: A = res.data[i].d; break
             }
             switch (suiji2) {
               case 1: B = res.data[i].a; break
               case 2: B = res.data[i].b; break
               case 3: B = res.data[i].c; break
               case 4: B = res.data[i].d; break
             }
             switch (suiji3) {
               case 1: C = res.data[i].a; break
               case 2: C = res.data[i].b; break
               case 3: C = res.data[i].c; break
               case 4: C = res.data[i].d; break
             }
            switch (suiji4) {
              case 1: D = res.data[i].a; break
              case 2: D = res.data[i].b; break
              case 3: D = res.data[i].c; break
              case 4: D = res.data[i].d; break
            }
            //赋值题、选项和正确选项数组
            this.data.A.push(A)
            this.data.B.push(B)
            this.data.C.push(C)
            this.data.D.push(D)
            this.data.ti.push(ti)
            this.data.tr.push(tr)
            // 设置第一题
            this.setData({
              a:this.data.A[0],
              b:this.data.B[0],
              c:this.data.C[0],
              d:this.data.D[0],
              dati:this.data.ti[0],
              tr1:this.data.tr[0]
            })
  }
  },
  onxuan:function(e){
    //从wxml传来点击的选项，判断选项，推入选项数组
    this.setData({
      isa:false,
      isb:false,
      isc:false,
      isd:false
    })
    //判断该题是否已经回答过，回答过则无法进行操作
    if(!this.data.alreadyanswer[this.data.index-1]){
        //获得选中的选项
        var xuan = e.currentTarget.dataset.xuan;
        var panduan=''
        var index=this.data.index
        this.data.xuanz.splice(index-1,1,xuan)
        this.data.alreadyanswer.splice(index-1,1,true)
        switch(xuan){
          case 'a':this.data.ca.splice(index-1,1,true);
                  this.data.cb.splice(index-1,1,false);
                  this.data.cc.splice(index-1,1,false);
                  this.data.cd.splice(index-1,1,false);break;
          case 'b':this.data.ca.splice(index-1,1,false);
                  this.data.cb.splice(index-1,1,true);
                  this.data.cc.splice(index-1,1,false);
                  this.data.cd.splice(index-1,1,false);break;
          case 'c':this.data.ca.splice(index-1,1,false);
                  this.data.cb.splice(index-1,1,false);
                  this.data.cc.splice(index-1,1,true);
                  this.data.cd.splice(index-1,1,false);break;
          case 'd':this.data.ca.splice(index-1,1,false);
                  this.data.cb.splice(index-1,1,false);
                  this.data.cc.splice(index-1,1,false);
                  this.data.cd.splice(index-1,1,true);break;
        }
        // console.log(this.data.ca)
        // console.log(this.data.cb)
        // console.log(this.data.cc)
        // console.log(this.data.cd)
        // console.log(xuan)
        // console.log(this.data.xuanz)
        //根据选中的选项取出选中的内容
        switch(xuan){
          case 'a':panduan=this.data.A[index-1];break;
          case 'b':panduan=this.data.B[index-1];break;
          case 'c':panduan=this.data.C[index-1];break;
          case 'd':panduan=this.data.D[index-1];break;
        }
        //选项正确
        if(this.data.tr[index-1]==panduan){
          this.setData({
            dui:this.data.dui+1
          })
          this.data.dui1.push(true)
          switch(xuan){
            case 'a':this.data.ta.splice(index-1,1,true);break;
            case 'b':this.data.tb.splice(index-1,1,true);break;
            case 'c':this.data.tc.splice(index-1,1,true);break;
            case 'd':this.data.td.splice(index-1,1,true);break;
          }
        }
        //选项错误
        else{
          wx.vibrateShort({
            type:"heavy"
          })
          this.data.dui1.push(false)
          switch(xuan){
            case 'a':this.data.fa.splice(index-1,1,true);this.setData({isa:true});break;
            case 'b':this.data.fb.splice(index-1,1,true);this.setData({isb:true});break;
            case 'c':this.data.fc.splice(index-1,1,true);this.setData({isc:true});break;
            case 'd':this.data.fd.splice(index-1,1,true);this.setData({isd:true});break;
          }
          if(this.data.tr[index-1]==this.data.A[index-1]){
            this.data.ta.splice(index-1,1,true)
          }else if(this.data.tr[index-1]==this.data.B[index-1]){
            this.data.tb.splice(index-1,1,true)
          }else if(this.data.tr[index-1]==this.data.C[index-1]){
            this.data.tc.splice(index-1,1,true)
          }else if(this.data.tr[index-1]==this.data.D[index-1]){
            this.data.td.splice(index-1,1,true)
          }
        }
        //当前该题选项赋值选中或未选中
        this.setData({
          tA:this.data.ta[index-1],
          tB:this.data.tb[index-1],
          tC:this.data.tc[index-1],
          tD:this.data.td[index-1],
          fA:this.data.fa[index-1],
          fB:this.data.fb[index-1],
          fC:this.data.fc[index-1],
          fD:this.data.fd[index-1],
        });
        // console.log(this.data.ta)
        // console.log(this.data.tb)
        // console.log(this.data.tc)
        // console.log(this.data.td)
        // console.log(this.data.dui)
    }
},
  onxia:function(){
    //下一题，index随着增大
    if(this.data.index<10){
      this.setData({
        index:this.data.index+1
      })
      //每一题的选项，题目和对错
      this.setData({
        a:this.data.A[this.data.index-1],
        b:this.data.B[this.data.index-1],
        c:this.data.C[this.data.index-1],
        d:this.data.D[this.data.index-1],
        tr1:this.data.tr[this.data.index-1],
        dati:this.data.ti[this.data.index-1],
        fA:this.data.fa[this.data.index-1],
        fB:this.data.fb[this.data.index-1],
        fC:this.data.fc[this.data.index-1],
        fD:this.data.fd[this.data.index-1],
        tA:this.data.ta[this.data.index-1],
        tB:this.data.tb[this.data.index-1],
        tC:this.data.tc[this.data.index-1],
        tD:this.data.td[this.data.index-1],
      })
}
},
  onshang:function(){
    //上一题，index随着减小
    if(this.data.index>1){
      this.setData({
        index:this.data.index-1,
      })
      this.setData({
        a:this.data.A[this.data.index-1],
        b:this.data.B[this.data.index-1],
        c:this.data.C[this.data.index-1],
        d:this.data.D[this.data.index-1],
        tr1:this.data.tr[this.data.index-1],
        dati:this.data.ti[this.data.index-1],
        fA:this.data.fa[this.data.index-1],
        fB:this.data.fb[this.data.index-1],
        fC:this.data.fc[this.data.index-1],
        fD:this.data.fd[this.data.index-1],
        tA:this.data.ta[this.data.index-1],
        tB:this.data.tb[this.data.index-1],
        tC:this.data.tc[this.data.index-1],
        tD:this.data.td[this.data.index-1],
      })
    }
},
  onsubmit:function(){
    this.setData({
      onsubmity:true
    })
    var app = getApp()
    app.globalData.dui1 = this.data.dui1;
    app.globalData.dui = this.data.dui;
    wx.showModal({
      title: '提交答卷',
      content: '确定要提交答卷吗？',
      showCancel: true, //是否显示取消按钮
      cancelText: "再想想", //默认是“取消”
      cancelColor: '#c7c7c7', //取消文字的颜色
      confirmText: "确定", //默认是“确定”
      confirmColor: '#46a070', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          wx.showToast({
            title: '交卷成功',
            duration: 1000,
            mask:true,
            success: function () {
              wx.redirectTo({
                url: '../questionj/questionj',
              })
            }
          })
        }
      }
    })
   
  },
  onHide:function(){
  },
  onUnload:function(){
  }
})
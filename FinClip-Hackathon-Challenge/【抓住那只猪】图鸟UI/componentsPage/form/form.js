(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["componentsPage/form/form"],{"32b9":function(e,t,n){"use strict";var o=n("c71e"),i=n.n(o);i.a},"32cb":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){n.e("libs/components/dynamic-demo-template").then(function(){return resolve(n("e364"))}.bind(null,n)).catch(n.oe)},i={name:"componentsForm",components:{dynamicDemoTemplate:o},data:function(){var e=this;return{errorType:["message","border-bottom","toast"],labelPosition:"left",labelAlign:"right",border:!1,actionSheetShow:!1,labelWidth:140,checkboxWidth:"auto",checkboxWrap:!1,radioWidth:"auto",radioWrap:!1,pickerShow:!1,selectShow:!1,codeTips:"获取验证码",checkboxList:[{name:"苹果",disabled:!1},{name:"橘子",disabled:!1},{name:"香蕉",disabled:!1},{name:"榴莲",disabled:!0}],radioList:[{name:"微信",disabled:!1},{name:"支付宝",disabled:!0},{name:"云闪付",disabled:!1}],actionSheetList:[{text:"男"},{text:"女"},{text:"保密"}],selectList:[{label:"手机",value:1101},{label:"笔记本",value:1102},{label:"手表",value:1103}],model:{name:"",sex:"",phone:"",desc:"",password:"",rePassword:"",fruit:["橘子"],payType:"微信",region:"",goodsType:"",code:"",remember:!1,photo:[],agreement:!1},rules:{name:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:5,message:"姓名长度在3到5个字符",trigger:["change","blur"]},{validator:function(t,n,o){return e.$t.test.chinese(n)},message:"姓名必须为中文",trigger:["change","blur"]},{asyncValidator:function(e,t,n){"图鸟"===t?n(new Error("姓名重复")):n()},trigger:["blur"]}],sex:[{required:!0,message:"请选择性别",trigger:"change"}],phone:[{required:!0,message:"请输入手机号码",trigger:"change"}],desc:[{min:5,message:"简介不能少于5个字",trigger:"change"},{pattern:/^[\u4e00-\u9fa5]+$/gi,message:"简介只能包含中文",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:["change","blur"]},{pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,message:"需同时含有字母和数字，长度在6-12之间",trigger:["change","blur"]}],rePassword:[{required:!0,message:"请再次输入密码",trigger:["change","blur"]},{validator:function(t,n,o){return n===e.model.password},message:"两次输入的密码不相等",trigger:["change","blur"]}],fruit:[{required:!0,message:"请选择水果",trigger:"change",type:"array"}],payType:[{required:!0,message:"请选择支付方式",trigger:"change"}],region:[{required:!0,message:"所在地区不能为空",trigger:"change"}],goodsType:[{required:!0,message:"商品类型不能为空",trigger:"change"}],code:[{required:!0,message:"验证码不能为空",trigger:"change"}],remember:[{required:!0,message:"记住密码不能为空",trigger:"change"}],photo:[{required:!0,message:"请选择图片",trigger:"change",type:"array"}]},tips:["无需依赖额外的样式文件","使用tn-toast组件"],sectionList:[{name:"参数切换",section:[{title:"label显示位置",optional:["左边","上边"],methods:"labelPositionChange"},{title:"label对齐方式",optional:["左对齐","右对齐","居中"],methods:"labelAlignChange",current:1},{title:"边框显示",optional:["显示","隐藏"],methods:"borderChange",current:1},{title:"可选项排列方式",optional:["默认","宽度的50%","换行"],methods:"checkRadioStyleChange"},{title:"错误提示方式",optional:["message","toast","下划线","输入框"],methods:"errorTypeChange"}]}]}},onReady:function(){this.$refs.form.setRules(this.rules)},methods:{click:function(e){this[e.methods]&&this[e.methods](e)},labelPositionChange:function(e){switch(e.index){case 0:this.labelPosition="left";break;case 1:this.labelPosition="top";break}},labelAlignChange:function(e){switch(e.index){case 0:this.labelAlign="left";break;case 1:this.labelAlign="right";break;case 2:this.labelAlign="center";break}},borderChange:function(e){this.border=0===e.index},checkRadioStyleChange:function(e){switch(e.index){case 0:this.checkboxWidth="auto",this.checkboxWrap=!1,this.radioWidth="auto",this.radioWrap=!1;break;case 1:this.checkboxWidth="50%",this.checkboxWrap=!1,this.radioWidth="50%",this.radioWrap=!1;break;case 2:this.checkboxWidth="auto",this.checkboxWrap=!0,this.radioWidth="auto",this.radioWrap=!0;break}},errorTypeChange:function(e){switch(e.index){case 0:this.errorType=["message"];break;case 1:this.errorType=["toast"];break;case 2:this.errorType=["border-bottom"];break;case 3:this.errorType=["border"];break}},submit:function(){var e=this;this.$refs.form.validate((function(t){!t||e.model.agreement||e.$t.messageUtils.toast("请勾选协议")}))},actionSheetClick:function(t){e.hideKeyboard(),this.model.sex=this.actionSheetList[t].text},regionPickerConfirm:function(e){this.model.region=e.province.label+"-"+e.city.label+"-"+e.area.label},goodsTypeSelectConfirm:function(e){this.model.goodsType="".concat(e[0]["label"])},checkboxGroupChange:function(e){this.model.fruit=e},radioGroupChange:function(e){this.model.payType=e},getCode:function(){var e=this;this.$refs.code.canGetCode?(this.$t.messageUtils.loading("正在获取验证码"),setTimeout((function(){e.$t.messageUtils.closeLoading(),e.$t.messageUtils.toast("验证码已经发送"),e.$refs.code.start()}),2e3)):this.$t.messageUtils.toast(this.$refs.code.secNum+"秒后再重试")},codeChange:function(e){this.codeTips=e},imageUploadChange:function(e){this.model.photo=e},agreementCheckChange:function(e){this.model.agreement=e.value}}};t.default=i}).call(this,n("543d")["default"])},"47a1":function(e,t,n){"use strict";n.r(t);var o=n("32cb"),i=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=i.a},c24f:function(e,t,n){"use strict";n.r(t);var o=n("e19d"),i=n("47a1");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("32b9");var a,s=n("f0c5"),c=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,"74321601",null,!1,o["a"],a);t["default"]=c.exports},c71e:function(e,t,n){},e19d:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}));var o={tnNavBar:function(){return Promise.all([n.e("common/vendor"),n.e("tuniao-ui/components/tn-nav-bar/tn-nav-bar")]).then(n.bind(null,"70f4"))},tnForm:function(){return n.e("tuniao-ui/components/tn-form/tn-form").then(n.bind(null,"e01a"))},tnFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("tuniao-ui/components/tn-form-item/tn-form-item")]).then(n.bind(null,"675c"))},tnInput:function(){return Promise.all([n.e("common/vendor"),n.e("tuniao-ui/components/tn-input/tn-input")]).then(n.bind(null,"6737"))},tnCheckboxGroup:function(){return Promise.all([n.e("common/vendor"),n.e("tuniao-ui/components/tn-checkbox-group/tn-checkbox-group")]).then(n.bind(null,"79ad"))},tnCheckbox:function(){return n.e("tuniao-ui/components/tn-checkbox/tn-checkbox").then(n.bind(null,"d20b"))},tnRadioGroup:function(){return Promise.all([n.e("common/vendor"),n.e("tuniao-ui/components/tn-radio-group/tn-radio-group")]).then(n.bind(null,"8399"))},tnRadio:function(){return n.e("tuniao-ui/components/tn-radio/tn-radio").then(n.bind(null,"bbbf"))},tnButton:function(){return Promise.all([n.e("common/vendor"),n.e("tuniao-ui/components/tn-button/tn-button")]).then(n.bind(null,"c442"))},tnSwitch:function(){return n.e("tuniao-ui/components/tn-switch/tn-switch").then(n.bind(null,"b458"))},tnImageUpload:function(){return Promise.all([n.e("common/vendor"),n.e("tuniao-ui/components/tn-image-upload/tn-image-upload")]).then(n.bind(null,"c758"))},tnActionSheet:function(){return n.e("tuniao-ui/components/tn-action-sheet/tn-action-sheet").then(n.bind(null,"72dd"))},tnPicker:function(){return Promise.all([n.e("common/vendor"),n.e("tuniao-ui/components/tn-picker/tn-picker")]).then(n.bind(null,"142d"))},tnSelect:function(){return n.e("tuniao-ui/components/tn-select/tn-select").then(n.bind(null,"a82f"))},tnVerificationCode:function(){return n.e("tuniao-ui/components/tn-verification-code/tn-verification-code").then(n.bind(null,"6fe3"))}},i=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.actionSheetShow=!0},e.e1=function(t){e.pickerShow=!0},e.e2=function(t){e.selectShow=!0})},r=[]},f22c:function(e,t,n){"use strict";(function(e){n("e9ee");o(n("66fd"));var t=o(n("c24f"));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])}},[["f22c","common/runtime","common/vendor"]]]);
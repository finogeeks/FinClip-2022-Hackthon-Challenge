/* 
 * qiun-data-charts 秋云高性能跨全端图表组件
 * Copyright (c) 2021 QIUN® 秋云 https://www.ucharts.cn All rights reserved.
 * Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 * 复制使用请保留本段注释，感谢支持开源！
 * 为方便更多开发者使用，如有更好的建议请提交码云 Pull Requests ！
 *
 * uCharts®官方网站
 * https://www.uCharts.cn
 * 
 * 开源地址:
 * https://gitee.com/uCharts/uCharts
 * 
 */

import uCharts from 'u-charts.js';
import cfu from 'config-ucharts.js';

function deepCloneAssign(origin = {}, ...args) {
  for (let i in args) {
    for (let key in args[i]) {
      if (args[i].hasOwnProperty(key)) {
        origin[key] = args[i][key] && typeof args[i][key] === 'object' ? deepCloneAssign(Array.isArray(args[i][key]) ? [] : {}, origin[key], args[i][key]) : args[i][key];
      }
    }
  }
  return origin;
}

function formatterAssign(args,formatter) {
  for (let key in args) {
    if(args.hasOwnProperty(key) && args[key] !== null && typeof args[key] === 'object'){
      formatterAssign(args[key],formatter)
    }else if(key === 'format' && typeof args[key] === 'string'){
      args['formatter'] = formatter[args[key]] ? formatter[args[key]] : undefined;
    }
  }
  return args;
}

function debounce(fn, wait) {
  let timer = false;
  return function() {
    clearTimeout(timer);
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      timer = false;
      fn.apply(this, arguments);
    }, wait);
  };
}

var lastMoveTime = null;
var moveLength = 0;

Component({
  options: {
    pureDataPattern: /^_/
  },
  properties: {
    type: {
      type: String,
      value: null
    },
    canvasId: {
      type: String,
      value: 'uchartsid'
    },
    canvas2d: {
      type: Boolean,
      value: false
    },
    background: {
      type: String,
      value: 'rgba(0,0,0,0)'
    },
    animation: {
      type: Boolean,
      value: true
    },
    chartData: {
      type: Object,
      value: {
        categories: [],
        series: []
      }
    },
    localdata:{
      type: Array,
      value: []
    },
    opts: {
      type: Object,
      value: {}
    },
    loadingType: {
      type: Number,
      value: 2
    },
    errorShow: {
      type: Boolean,
      value: true
    },
    errorReload: {
      type: Boolean,
      value: true
    },
    errorMessage: {
      type: String,
      value: null
    },
    inScrollView: {
      type: Boolean,
      value: false
    },
    reshow: {
      type: Boolean,
      value: false
    },
    reload: {
      type: Boolean,
      value: false
    },
    disableScroll: {
      type: Boolean,
      value: false
    },
    optsWatch: {
      type: Boolean,
      value: true
    },
    onzoom: {
      type: Boolean,
      value: false
    },
    ontap: {
      type: Boolean,
      value: true
    },
    ontouch: {
      type: Boolean,
      value: false
    },
    onmovetip: {
      type: Boolean,
      value: false
    },
    tooltipShow: {
      type: Boolean,
      value: true
    },
    tooltipFormat: {
      type: String,
      value: undefined
    },
    tooltipCustom: {
      type: Object,
      value: undefined
    },
    pageScrollTop: {
      type: Number,
      value: 0
    },
    tapLegend: {
      type: Boolean,
      value: true
    }
  },
  data: {
    cid: 'uchartsid',
    type2d: true,
    cWidth: 375,
    cHeight: 250,
    showchart: false,
    mixinDatacomErrorMessage:null,
    mixinDatacomLoading:true,
    _inWin: false,
    _pixel: 1,
    _drawData:{},
    _lastDrawTime:null
  },
  observers: {
    'chartData.**': function(val) {
      if (typeof val === 'object') {
        if (val.series && val.series.length > 0) {
          this.beforeInit();
        }else{
          let mixinDatacomLoading = true;
          this._clearChart();
          let showchart = false;
          let mixinDatacomErrorMessage = null;
          this.setData({ mixinDatacomLoading, showchart, mixinDatacomErrorMessage });
        }
      } else {
        let mixinDatacomLoading = false;
        let showchart = false;
        let mixinDatacomErrorMessage = '参数错误：chartData数据类型错误';
        this.setData({ mixinDatacomLoading, showchart, mixinDatacomErrorMessage });
      }
    },
    'localdata': function(val) {
      if (val.length > 0) {
        this.beforeInit();
      }else{
        let mixinDatacomLoading = true;
        this._clearChart();
        let showchart = false;
        let mixinDatacomErrorMessage = null;
        this.setData({ mixinDatacomLoading, showchart, mixinDatacomErrorMessage });
      }
    },
    'opts.**': function(val) {
      if (typeof val === 'object') {
        if (this.data.optsWatch == true) {
          this.checkData(this.data._drawData);
        }
      } else {
        let mixinDatacomLoading = false;
        let showchart = false;
        let mixinDatacomErrorMessage = '参数错误：opts数据类型错误';
        this.setData({ mixinDatacomLoading, showchart, mixinDatacomErrorMessage });
      }
    },
    'reshow': function(val) {
      if (val === true && this.data.mixinDatacomLoading === false) {
        setTimeout(() => {
          let mixinDatacomErrorMessage = null;
          this.setData({ mixinDatacomErrorMessage });
          this.checkData(this.data._drawData);
        }, 200);
      }
    },
    'reload': function(val) {
      if (val === true) {
        let showchart = false;
        let mixinDatacomErrorMessage = null;
        this.setData({ showchart, mixinDatacomErrorMessage });
        this.reloading();
      }
    },
    'mixinDatacomErrorMessage': function(val) {
      if (val) {
        this.emitMsg({name: 'error', params: {type:"error", errorShow: this.data.errorShow, msg: val, id: this.cid}});
        if(this.data.errorShow){
          console.log('[秋云图表组件]' + val);
        }
      }
    },
    'errorMessage': function(val) {
      if (val && this.data.errorShow && val !== null && val !== 'null' && val !== '') {
        let mixinDatacomLoading = false;
        let showchart = false;
        let mixinDatacomErrorMessage = val;
        this.setData({ mixinDatacomLoading, showchart, mixinDatacomErrorMessage });
      } else {
        let showchart = false;
        let mixinDatacomErrorMessage = null;
        this.setData({ showchart, mixinDatacomErrorMessage });
        this.reloading();
      }
    }
  },
  lifetimes: {
    attached: function () {
      let cid = this.data.canvasId;
      if (this.data.canvasId == 'uchartsid' || this.data.canvasId == '') {
        let t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let len = t.length;
        let id = '';
        for (let i = 0; i < 32; i++) {
          id += t.charAt(Math.floor(Math.random() * len));
        }
        cid = id;
      }
      let _inWin = false;
      const systemInfo = ft.getSystemInfoSync();
      if(systemInfo.platform === 'windows' || systemInfo.platform === 'mac'){
        _inWin = true;
      }
      let type2d = false;
      let _pixel = 1;
      if (this.data.canvas2d === false || systemInfo.platform === 'windows' || systemInfo.platform === 'mac') {
        type2d = false;
      }else{
        type2d = true;
        _pixel = systemInfo.pixelRatio;
      }
      this.setData({ cid, type2d, _pixel });
    },
    ready: function () {
      ft.nextTick(() => {
        this.beforeInit();
      })
    },
    detached: function () {
      delete cfu.option[this.data.cid]
      delete cfu.instance[this.data.cid]
    },
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示，可以选择执行重绘，参考下面resize的方法
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      const _this = this;
      debounce(function(res) {
        if (_this.data.mixinDatacomLoading == true) {
          return;
        }
        const errmsg = _this.mixinDatacomErrorMessage;
        if (errmsg !== null && errmsg !== 'null' && errmsg !== '') {
          return;
        }
        _this.resizeHandler();
      }, 200)
    }
  },
  methods: {
    beforeInit(){
      this.data.mixinDatacomErrorMessage = null;
      if (typeof this.data.chartData === 'object' && this.data.chartData != null && this.data.chartData.series !== undefined && this.data.chartData.series.length > 0) {
        //拷贝一下chartData，为了opts变更后统一数据来源
        let _drawData = deepCloneAssign({}, this.data.chartData);
        let mixinDatacomLoading = false;
        let showchart = true;
        this.setData({ _drawData, mixinDatacomLoading, showchart });
        this.checkData(this.data.chartData);
      }else if(this.data.localdata.length>0){
        let mixinDatacomLoading = false;
        let showchart = true;
        this.setData({ mixinDatacomLoading, showchart });
        this.localdataInit(this.data.localdata);
      }else{
        let mixinDatacomLoading = true;
        this.setData({ mixinDatacomLoading });
      }
    },
    localdataInit(resdata){
      let needCategories = false;
      let tmpData = {categories:[], series:[]};
      let tmpcategories = [];
      let tmpseries = [];
      //拼接categories
      needCategories = cfu.categories.includes(this.data.type);
      if(needCategories === true){
        //如果props中的chartData带有categories，则优先使用chartData的categories
        if(this.data.chartData && this.data.chartData.categories && this.data.chartData.categories.length>0){
          tmpcategories = this.data.chartData.categories
        }else{
          let tempckey = {};
          resdata.map(function(item, index) {
            if (item.text != undefined && !tempckey[item.text]) {
              tmpcategories.push(item.text)
              tempckey[item.text] = true
            }
          });
        }
        tmpData.categories = tmpcategories
      }
      //拼接series
      let tempskey = {};
      resdata.map(function(item, index) {
        if (item.group != undefined && !tempskey[item.group]) {
          tmpseries.push({ name: item.group, data: [] });
          tempskey[item.group] = true;
        }
      });
      //如果没有获取到分组名称(可能是带categories的数据，也可能是不带的饼图类)
      if (tmpseries.length == 0) {
        tmpseries = [{ name: '默认分组', data: [] }];
        //如果是需要categories的图表类型
        if(needCategories === true){
          for (let j = 0; j < tmpcategories.length; j++) {
            let seriesdata = 0;
            for (let i = 0; i < resdata.length; i++) {
              if (resdata[i].text == tmpcategories[j]) {
                seriesdata = resdata[i].value;
              }
            }
            tmpseries[0].data.push(seriesdata);
          }
        //如果是饼图类的图表类型
        }else{
          for (let i = 0; i < resdata.length; i++) {
            tmpseries[0].data.push({"name": resdata[i].text,"value": resdata[i].value});
          }
        }
      //如果有分组名
      } else {
        for (let k = 0; k < tmpseries.length; k++) {
          //如果有categories
          if (tmpcategories.length > 0) {
            for (let j = 0; j < tmpcategories.length; j++) {
              let seriesdata = 0;
              for (let i = 0; i < resdata.length; i++) {
                if (tmpseries[k].name == resdata[i].group && resdata[i].text == tmpcategories[j]) {
                  seriesdata = resdata[i].value;
                }
              }
              tmpseries[k].data.push(seriesdata);
            }
          //如果传了group而没有传text，即没有categories（正常情况下这种数据是不符合数据要求规范的）
          } else {
            for (let i = 0; i < resdata.length; i++) {
              if (tmpseries[k].name == resdata[i].group) {
                tmpseries[k].data.push(resdata[i].value);
              }
            }
          }
        }
      }
      tmpData.series = tmpseries
      //拷贝一下chartData，为了opts变更后统一数据来源
      let _drawData = deepCloneAssign({}, tmpData);
      this.setData({ _drawData });
      this.checkData(tmpData)
    },
    _clearChart() {
      let cid = this.data.cid
      const ctx = ft.createCanvasContext(cid, this);
      ctx.clearRect(0, 0, this.data.cWidth, this.data.cHeight);
      ctx.draw();
    },
    reloading() {
      if(this.data.errorReload === false){
        return;
      }
      let showchart = false;
      let mixinDatacomErrorMessage = null;
      this.setData({ showchart, mixinDatacomErrorMessage });
      this.beforeInit();
    },
    checkData(anyData) {
      let cid = this.data.cid
      //复位opts或eopts
      if (this.data.type && cfu.type.includes(this.data.type)) {
        cfu.option[cid] = deepCloneAssign({}, cfu[this.data.type], this.data.opts);
        cfu.option[cid].canvasId = cid;
      } else {
        let mixinDatacomLoading = false;
        let showchart = false;
        let mixinDatacomErrorMessage = '参数错误：props参数中type类型不正确';
        this.setData({ mixinDatacomLoading, showchart, mixinDatacomErrorMessage });
      }
      //挂载categories和series
      let newData = deepCloneAssign({}, anyData);
      if (newData.series !== undefined && newData.series.length > 0) {
        let mixinDatacomErrorMessage = null;
        this.setData({ mixinDatacomErrorMessage });
        cfu.option[cid].categories = newData.categories;
        cfu.option[cid].series = newData.series;
        ft.nextTick(()=>{
          this.init()
        })
      }
    },
    resizeHandler() {
      //渲染防抖
      let currTime = Date.now();
      let lastDrawTime = this.data._lastDrawTime?this.data._lastDrawTime:currTime-3000;
      let duration = currTime - lastDrawTime;
      if (duration < 1000) return;
      let chartdom = ft.createSelectorQuery().in(this)
        .select('#boxid'+this.data.cid)
        .boundingClientRect(data => {
          let showchart = true;
          this.setData({ showchart });
          if (data.width > 0 && data.height > 0) {
            if (data.width !== this.data.cWidth || data.height !== this.data.cHeight) {
              this.checkData(this.data._drawData)
            }
          }
        })
        .exec();
    },
    init() {
      let cid = this.data.cid
      let chartdom = ft.createSelectorQuery().in(this)
        .select('#boxid'+cid)
        .boundingClientRect(data => {
          if (data.width > 0 && data.height > 0) {
            let mixinDatacomLoading = false;
            let showchart = true;
            let _lastDrawTime = Date.now();
            let cWidth = data.width;
            let cHeight = data.height;
            let mixinDatacomErrorMessage = null;
            this.setData({ mixinDatacomLoading, showchart, _lastDrawTime, cWidth, cHeight, mixinDatacomErrorMessage });
            cfu.option[cid].background = this.data.background == 'rgba(0,0,0,0)' ? '#FFFFFF' : this.data.background;
            cfu.option[cid].canvas2d = this.data.type2d;
            cfu.option[cid].pixelRatio = this.data._pixel;
            cfu.option[cid].animation = this.data.animation;
            cfu.option[cid].width = data.width * this.data._pixel;
            cfu.option[cid].height = data.height * this.data._pixel;
            cfu.option[cid].ontap = this.data.ontap;
            cfu.option[cid].ontouch = this.data.ontouch;
            cfu.option[cid].onmovetip = this.data.onmovetip;
            cfu.option[cid].tooltipShow = this.data.tooltipShow;
            cfu.option[cid].tooltipFormat = this.data.tooltipFormat;
            cfu.option[cid].tooltipCustom = this.data.tooltipCustom;
            cfu.option[cid].inScrollView = this.data.inScrollView;
            cfu.option[cid].lastDrawTime = this._lastDrawTime;
            cfu.option[cid].tapLegend = this.data.tapLegend;
            cfu.option[cid] = formatterAssign(cfu.option[cid],cfu.formatter)
            if (this.data.type2d === true) {
              const query = ft.createSelectorQuery().in(this)
              query
                .select('#' + cid)
                .fields({ node: true, size: true })
                .exec(res => {
                  if (res[0]) {
                    const canvas = res[0].node;
                    const ctx = canvas.getContext('2d');
                    cfu.option[cid].context = ctx;
                    cfu.option[cid].rotateLock = cfu.option[cid].rotate;
                    if(cfu.instance[cid] && cfu.option[cid] && cfu.option[cid].update === true){
                      this._updataUChart(cid)
                    }else{
                      canvas.width = data.width * this.data._pixel;
                      canvas.height = data.height * this.data._pixel;
                      canvas._width = data.width * this.data._pixel;
                      canvas._height = data.height * this.data._pixel;
                      setTimeout(()=>{
                        cfu.option[cid].context.restore();
                        cfu.option[cid].context.save();
                        this._newChart(cid)
                      },100)
                    }
                  } else {
                    this.data.showchart = false;
                    this.data.mixinDatacomErrorMessage = '参数错误：开启2d模式后，未获取到dom节点，canvas-id:' + cid;
                  }
                });
            } else {
              cfu.option[cid].context = ft.createCanvasContext(cid, this);
              if(cfu.instance[cid] && cfu.option[cid] && cfu.option[cid].update === true){
                this._updataUChart(cid)
              }else{
                setTimeout(()=>{
                  cfu.option[cid].context.restore();
                  cfu.option[cid].context.save();
                  this._newChart(cid)
                },100)
              }
            }
          } else {
            let mixinDatacomLoading = false;
            let showchart = false;
            this.setData({ mixinDatacomLoading, showchart });
            if (this.data.reshow == true) {
              this.data.mixinDatacomErrorMessage = '布局错误：未获取到父元素宽高尺寸！canvas-id:' + cid;
            }
          }
        })
        .exec();
    },
    saveImage(){
    	ft.canvasToTempFilePath({
    	  canvasId: this.data.cid,
    	  success: res=>{
          ft.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function () {
                  ft.showToast({
                      title: '保存成功',
                      duration: 2000
                  });
              }
          });
    	  } 
    	},this);
    },
    _newChart(cid) {
      if (this.data.mixinDatacomLoading == true) {
        return;
      }
      let showchart = true;
      this.setData({ showchart });
      cfu.instance[cid] = new uCharts(cfu.option[cid]);
      cfu.instance[cid].addEventListener('renderComplete', () => {
        this.emitMsg({name: 'complete', params: {type:"complete", complete: true, id: cid}});
        cfu.instance[cid].delEventListener('renderComplete')
      });
      cfu.instance[cid].addEventListener('scrollLeft', () => {
        this.emitMsg({name: 'scrollLeft', params: {type:"scrollLeft", scrollLeft: true, id: cid}});
      });
      cfu.instance[cid].addEventListener('scrollRight', () => {
        this.emitMsg({name: 'scrollRight', params: {type:"scrollRight", scrollRight: true, id: cid}});
      });
    },
    _updataUChart(cid) {
      cfu.instance[cid].updateData(cfu.option[cid])
    },
    _tooltipDefault(item, category, index, opts) {
      if (category) {
        let data = item.data
        if(typeof item.data === "object"){
          data = item.data.value
        }
        return category + ' ' + item.name + ':' + data;
      } else {
        if (item.properties && item.properties.name) {
          return item.properties.name;
        } else {
          return item.name + ':' + item.data;
        }
      }
    },
    _showTooltip(e) {
      let cid = this.data.cid
      let tc = cfu.option[cid].tooltipCustom
      if (tc && tc !== undefined && tc !== null) {
        let offset = undefined;
        if (tc.x >= 0 && tc.y >= 0) {
          offset = { x: tc.x, y: tc.y + 10 };
        }
        cfu.instance[cid].showToolTip(e, {
          index: tc.index,
          offset: offset,
          textList: tc.textList,
          formatter: (item, category, index, opts) => {
            if (typeof cfu.option[cid].tooltipFormat === 'string' && cfu.formatter[cfu.option[cid].tooltipFormat]) {
              return cfu.formatter[cfu.option[cid].tooltipFormat](item, category, index, opts);
            } else {
              return this._tooltipDefault(item, category, index, opts);
            }
          }
        });
      } else {
        cfu.instance[cid].showToolTip(e, {
          formatter: (item, category, index, opts) => {
            if (typeof cfu.option[cid].tooltipFormat === 'string' && cfu.formatter[cfu.option[cid].tooltipFormat]) {
              return cfu.formatter[cfu.option[cid].tooltipFormat](item, category, index, opts);
            } else {
              return this._tooltipDefault(item, category, index, opts);
            }
          }
        });
      }
    },
    _tap(e,move) {
      let cid = this.data.cid
      let currentIndex = null;
      let legendIndex = null;
      if (this.inScrollView === true) {
        let chartdom = ft.createSelectorQuery().in(this)
          .select('#boxid'+cid)
          .boundingClientRect(data => {
            e.changedTouches=[];
            e.changedTouches.unshift({ x: e.detail.x - data.left, y: e.detail.y - data.top - this.pageScrollTop});
            if(move){
              if (this.data.tooltipShow === true) {
                this._showTooltip(e);
              }
            }else{
              currentIndex = cfu.instance[cid].getCurrentDataIndex(e);
              legendIndex = cfu.instance[cid].getLegendDataIndex(e);
              if(this.data.tapLegend === true){
                cfu.instance[cid].touchLegend(e);
              }
              if (this.data.tooltipShow === true) {
                this._showTooltip(e);
              }
              this.emitMsg({name: 'getIndex', params: { type:"getIndex", event:{ x: e.detail.x - data.left, y: e.detail.y - data.top }, currentIndex: currentIndex, legendIndex: legendIndex, id: cid, opts: cfu.instance[cid].opts}});
            }
          })
          .exec();
      } else {
        if(move){
          if (this.data.tooltipShow === true) {
            this._showTooltip(e);
          }
        }else{
          e.changedTouches=[];
          e.changedTouches.unshift({ x: e.detail.x - e.currentTarget.offsetLeft, y: e.detail.y - e.currentTarget.offsetTop });
          currentIndex = cfu.instance[cid].getCurrentDataIndex(e);
          legendIndex = cfu.instance[cid].getLegendDataIndex(e);
          if(this.data.tapLegend === true){
            cfu.instance[cid].touchLegend(e);
          }
          if (this.data.tooltipShow === true) {
            this._showTooltip(e);
          }
          this.emitMsg({name: 'getIndex', params: {type:"getIndex", event:{ x: e.detail.x, y: e.detail.y - e.currentTarget.offsetTop }, currentIndex: currentIndex, legendIndex: legendIndex, id: cid, opts: cfu.instance[cid].opts}});
        }
      }
    },
    _touchStart(e) {
      let cid = this.data.cid
      lastMoveTime=Date.now();
      if(cfu.option[cid].enableScroll === true && e.touches.length == 1){
        cfu.instance[cid].scrollStart(e);
      }
      this.emitMsg({name:'getTouchStart', params:{type:"touchStart", event:e.changedTouches, id:cid}});
    },
    _touchMove(e) {
      let cid = this.data.cid
      let currMoveTime = Date.now();
      let duration = currMoveTime - lastMoveTime;
      let touchMoveLimit = cfu.option[cid].touchMoveLimit || 24;
      if (duration < Math.floor(1000 / touchMoveLimit)) return;//每秒60帧
      lastMoveTime = currMoveTime;
      if(cfu.option[cid].enableScroll === true && e.changedTouches.length == 1){
        cfu.instance[cid].scroll(e);
      }
      if(this.data.ontap === true && cfu.option[cid].enableScroll === false && this.data.onmovetip === true){
        this._tap(e,true)
      }
      if(this.data.ontouch === true && cfu.option[cid].enableScroll === true && this.data.onzoom === true && e.changedTouches.length == 2){
        cfu.instance[cid].dobuleZoom(e);
      }
      this.emitMsg({name: 'getTouchMove', params: {type:"touchMove", event:e.changedTouches, id: cid}});
    },
    _touchEnd(e) {
      let cid = this.data.cid
      if(cfu.option[cid].enableScroll === true && e.touches.length == 0){
        cfu.instance[cid].scrollEnd(e);
      }
      this.emitMsg({name:'getTouchEnd', params:{type:"touchEnd", event:e.changedTouches, id:cid}});
      if(this.data.ontap === true && cfu.option[cid].enableScroll === false && this.data.onmovetip === true){
        this._tap(e,true)
      }
    },
    _error(e) {
      this.data.mixinDatacomErrorMessage = e.detail.errMsg;
    },
    emitMsg(msg) {
      this.triggerEvent(msg.name, msg.params);
    },
    toJSON(){
      return this
    }
  }
})
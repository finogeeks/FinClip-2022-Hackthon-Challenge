const { Tab, extend } = require('../../dist/index');

Page(extend({}, Tab, {
  data: {
    tab1: {
      list: [{
        id: 'all',
        title: '全部'
      }, {
        id: 'unreviewe',
        title: '未审核'
      }, {
        id: 'reviewing',
        title: '审核中'
      }, {
        id: 'reviewed',
        title: '已审核'
      }],
      selectedId: 'all'
    },
  },

  handleFinclipTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;

    this.setData({
      [`${componentId}.selectedId`]: selectedId
    });
  }
}));

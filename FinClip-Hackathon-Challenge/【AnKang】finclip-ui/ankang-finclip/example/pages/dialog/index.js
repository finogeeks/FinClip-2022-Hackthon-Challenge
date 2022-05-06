const Finclip = require('../../dist/index');

Page(Object.assign({}, Finclip.Dialog, {
  toggleBaseDialog() {
    this.showFinclipDialog({
      title: '弹窗',
      content: '这是一个模态弹窗',
      showCancel: true
    }).then(() => {
      console.log('=== dialog ===', 'type: confirm');
    }).catch(() => {
      console.log('=== dialog ===', 'type: cancel');
    });
  },

  toggleWithoutTitleDialog() {
    this.showFinclipDialog({
      content: '这是一个模态弹窗'
    }).then(() => {
      console.log('=== dialog without title ===', 'type: confirm');
    });
  },

  toggleButtonDialog() {
    this.showFinclipDialog({
      title: '弹窗',
      content: '这是一个模态弹窗',
      buttons: [{
        text: '现金支付',
        color: 'red',
        type: 'cash'
      }, {
        text: '微信支付',
        color: '#409EFF',
        type: 'wechat'
      }, {
        text: '取消',
        type: 'cancel'
      }]
    }).then(({ type }) => {
      console.log('=== dialog with custom buttons ===', `type: ${type}`);
    });
  },

  toggleVerticalDialog() {
    this.showFinclipDialog({
      title: '弹窗',
      content: '这是一个模态弹窗',
      buttonsShowVertical: true,
      buttons: [{
        text: '现金支付',
        color: 'red',
        type: 'cash'
      }, {
        text: '微信支付',
        color: '#409EFF',
        type: 'wechat'
      }, {
        text: '取消',
        type: 'cancel'
      }]
    }).then(({ type }) => {
      console.log('=== dialog with vertical buttons ===', `type: ${type}`);
    });
  }
}));

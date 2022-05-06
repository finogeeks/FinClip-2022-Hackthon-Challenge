const Finclip = require('../../dist/index');

Page(Object.assign({}, Finclip.Toast, {
  data: {},

  showToast() {
    this.showFinclipToast('toast的内容');
  },

  showIconToast() {
    this.showFinclipToast({
      title: 'toast的内容',
      icon: 'fail'
    });
  },

  showImageToast() {
    this.showFinclipToast({
      title: 'toast自定义',
      image: 'https://img2.baidu.com/it/u=1677809961,1539614879&fm=253&fmt=auto&app=138&f=JPEG?w=260&h=260'
    });
  },

  showLoadingToast() {
    this.showFinclipToast({
      title: 'toast的内容',
      icon: 'loading'
    });
  },

  showOnlyIcon() {
    this.showFinclipToast({
      icon: 'fail'
    });
  },

  showLoading() {
    this.showFinclipLoading('加载中');
  }
}));

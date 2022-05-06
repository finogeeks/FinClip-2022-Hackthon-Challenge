const { extractComponentId } = require('../common/helper');

module.exports = {
  _handleFinclipActionsheetMaskClick({ currentTarget = {} }) {
    const dataset = currentTarget.dataset || {};
    const { componentId, closeOnClickOverlay } = dataset;

    // 判断是否在点击背景时需要关闭弹层
    if (!closeOnClickOverlay) {
      return;
    }

    resolveCancelClick.call(this, { componentId });
  },

  _handleFinclipActionsheetCancelBtnClick(e) {
    const componentId = extractComponentId(e);

    resolveCancelClick.call(this, { componentId });
  },

  _handleFinclipActionsheetBtnClick({ currentTarget = {} }) {
    const dataset = currentTarget.dataset || {};
    const { componentId, index } = dataset;

    if (this.handleFinclipActionsheetClick) {
      this.handleFinclipActionsheetClick({ componentId, index });
    } else {
      console.warn('页面缺少 handleFinclipActionsheetClick 回调函数');
    }
  }
};

function resolveCancelClick({ componentId }) {
  console.info('[finclip:actionsheet:cancel]');
  if (this.handleFinclipActionsheetCancel) {
    this.handleFinclipActionsheetCancel({ componentId });
  } else {
    console.warn('页面缺少 handleFinclipActionsheetCancel 回调函数');
  }
}

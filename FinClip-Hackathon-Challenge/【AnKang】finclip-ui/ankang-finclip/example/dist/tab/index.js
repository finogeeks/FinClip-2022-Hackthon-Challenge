const { extractComponentId } = require('../common/helper');

var Tab = {
  _handleFinclipTabChange(e) {
    const componentId = extractComponentId(e);
    const dataset = e.currentTarget.dataset;
    const selectedId = dataset.itemId;
    const data = { componentId, selectedId };

    console.info('[finclip:tab:change]', data);
    if (this.handleFinclipTabChange) {
      this.handleFinclipTabChange(data);
    } else {
      console.warn('页面缺少 handleFinclipTabChange 回调函数');
    }
  }
};

module.exports = Tab;

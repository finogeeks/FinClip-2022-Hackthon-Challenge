const { extractComponentId } = require('../common/helper');

function handle(e) {
  const componentId = extractComponentId(e);
  const value = e.detail.value;

  callback.call(this, componentId, value);
}

function callback(componentId, value) {
  const e = { componentId, value };
  console.info('[finclip:Select:change]', e);

  if (this.handleFinclipSelectChange) {
    this.handleFinclipSelectChange(e);
  } else {
    console.warn('页面缺少 handleFinclipSelectChange 回调函数');
  }
}

module.exports = {
  _handleFinclipSelectChange(e) {
    handle.call(this, e);
  }
};

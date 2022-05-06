var Switch = {
  _handleFinclipSwitchChange(e) {
    var dataset = e.currentTarget.dataset;

    var checked = !dataset.checked;
    var loading = dataset.loading;
    var disabled = dataset.disabled;
    var componentId = dataset.componentId;

    if (loading || disabled) return;

    console.info('[finclip:switch:change]', { checked, componentId });

    if (this.handleFinclipSwitchChange) {
      this.handleFinclipSwitchChange({
        checked,
        componentId
      });
    } else {
      console.warn('页面缺少 handleFinclipSwitchChange 回调函数');
    }
  }
};

module.exports = Switch;

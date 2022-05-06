const { extractComponentId } = require('../common/helper');

module.exports = {
  _handleFinclipFieldChange(event) {
    const componentId = extractComponentId(event);
    event.componentId = componentId;

    console.info('[finclip:field:change]', event);

    if (this.handleFinclipFieldChange) {
      return this.handleFinclipFieldChange(event);
    }

    console.warn('页面缺少 handleFinclipFieldChange 回调函数');
  },

  _handleFinclipFieldFocus(event) {
    const componentId = extractComponentId(event);
    event.componentId = componentId;

    console.info('[finclip:field:focus]', event);

    if (this.handleFinclipFieldFocus) {
      return this.handleFinclipFieldFocus(event);
    }

    console.warn('页面缺少 handleFinclipFieldFocus 回调函数');
  },

  _handleFinclipFieldBlur(event) {
    const componentId = extractComponentId(event);
    event.componentId = componentId;

    console.info('[finclip:field:blur]', event);

    if (this.handleFinclipFieldBlur) {
      return this.handleFinclipFieldBlur(event);
    }

    console.warn('页面缺少 handleFinclipFieldBlur 回调函数');
  }
};

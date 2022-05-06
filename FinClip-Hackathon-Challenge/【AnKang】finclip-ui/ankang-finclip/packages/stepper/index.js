Component({
  properties: {
    stepper: {
      type: Number,
      value: 0,
    },
    min: {
      type: Number,
      value: 1,
    },
    max: {
      type: Number,
      value: 20,
    },
    size: {
      type: String,
      value: '',
    },
  },
  data: {},
  methods: {
    handle: function (e, num) {
      var dataset = e.currentTarget.dataset;
      var disabled = dataset.disabled;
      var stepper = +dataset.stepper;

      if (disabled) return null;

      this.callback(stepper + num);
    },

    callback: function (stepper) {
      stepper = +stepper;
      var e = { stepper };
      this.setData({
        stepper: e.stepper,
      });
      console.info("[finclip:stepper:change]", e);

      if (this.handleFinclipStepperChange) {
        this.handleFinclipStepperChange(e);
      } else {
        console.warn("页面缺少 handleFinclipStepperChange 回调函数");
      }
    },

    _handleFinclipStepperMinus: function (e) {
      console.log(333, e);
      this.handle(e, -1);
    },

    _handleFinclipStepperPlus: function (e) {
      this.handle(e, +1);
    },

    _handleFinclipStepperBlur: function (e) {
      var dataset = e.currentTarget.dataset;
      var max = +dataset.max;
      var min = +dataset.min;
      var value = e.detail.value;

      if (!value) {
        setTimeout(() => {
          this.callback(min);
        }, 16);
        this.callback(value);
        return "" + value;
      }

      value = +value;
      if (value > max) {
        value = max;
      } else if (value < min) {
        value = min;
      }

      this.callback(value);

      return "" + value;
    },
  },
});

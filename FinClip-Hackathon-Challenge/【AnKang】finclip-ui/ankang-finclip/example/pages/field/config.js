module.exports = {
  // 基础类型输入框配置
  base: {
    name: {
      focus: true,
      title: '小程序名称',
      placeholder: '名称'
    },
    tel: {
      error: true,
      title: '联系电话',
      inputType: 'number',
      placeholder: '请输入联系电话'
    },
    address: {
      title: '小程序描述',
      type: 'textarea',
      placeholder: '请输入小程序描述'
    }
  },
  // 无标题输入框
  notitle: {
    placeholder: '请输入小程序标签',
    componentId: 'tag'
  },
  // 圆角输入框
  radius: {
    totalPrice: {
      right: true,
      mode: 'wrapped',
      title: '联系电话',
      inputType: 'number',
      placeholder: '请输入联系电话'
    },
    excludePrice: {
      right: true,
      error: true,
      mode: 'wrapped',
      title: '联系电话',
      inputType: 'number',
      placeholder: '请输入联系电话'
    },
    notitle: {
      mode: 'wrapped',
      inputType: 'number',
      placeholder: '请输入联系电话'
    }
  },
};

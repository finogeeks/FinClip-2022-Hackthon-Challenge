Page({

  /**
   * 页面的初始数据
   */
  data: {
     index: null,
    picker: ['信工学院', '经济学院', '管理学院','外国语学院'],
    multiArray: [
      ['信工学院', '经济学院', '管理学院','外国语学院'],
      ['大数据', '计科', '物联网', '软工', '信管'],
      ['2001', '2002','2003']
    ],
        objectMultiArray: [
      [{
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        }
      ],
      [{
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ],
      [{
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
    multiIndex: [0, 0, 0],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
 PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  MultiColumnChange(e) {
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['大数据', '计科', '物联网', '软工', '信管'],
            data.multiArray[2] =  ['2001', '2002','2003'];
            break;
          case 1:
            data.multiArray[1] = ['大数据', '计科', '物联网', '软工', '信管'],
            data.multiArray[2] = ['2001', '2002','2003'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['2001', '2002','2003'];
                break;
              case 1:
                data.multiArray[2] = ['2001', '2002','2003'];
                break;
              case 2:
                data.multiArray[2] = ['2001', '2002','2003'];
                break;
              case 3:
                data.multiArray[2] = ['2001', '2002','2003'];
                break;
              case 4:
                data.multiArray[2] = ['2001', '2002','2003'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['2001', '2002','2003'];
                break;
              case 1:
                data.multiArray[2] = ['2001', '2002','2003'];
                break;
              case 2:
                data.multiArray[2] = ['2001', '2002','2003'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
  },
  cha_submit(){
    wx.showToast({
      title: '查询成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {
        wx.navigateTo({
          url: '/pages/index/class-schedule/class/clas'
        });
          
      }
    });
    
      
  },
    empty_submit() {
    wx.showToast({
      title: '查询空课表成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {
        wx.navigateTo({
          url: './emclass/emclass'
        });
          
      }
    });
    
      
  },
      emptys_submit() {
    wx.showToast({
      title: '已生成空课表',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {
          
      }
    });
    
      
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})
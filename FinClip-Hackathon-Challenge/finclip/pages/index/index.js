// index.js
// 获取应用实例
const app = getApp()

//
Page({
  data: {
    products:[
        {
            "title":"福吉",
            "thumbnailUri":"69719875ad5a4682b4da9f703bfd90fe",
        },
        {
            "title":"仲夏",
            "thumbnailUri":"b38c636fa02c872ae097fa9f08356581",
        },
        {
            "title":"原丰",
            "thumbnailUri":"213856a3f5b16afa6e5a52f67f8bbe2c",
        },
        {
            "title":"清秋",
            "thumbnailUri":"97e470c8f309f05f140351a7c9c884d9",
        },
        {
            "title":"瑞南",
            "thumbnailUri":"ea10b601e5972b0b1c83287ee2a89e61",
        },
        {
            "title":"环生",
            "thumbnailUri":"b6214486937a203ebba8d92c80e79f50",
        }],
  },
  // 事件处理函数
  onLoad() {
    this.data.products.forEach(product => {
      Object.assign(product,
      {thumbnailUrl:`https://qdingzhi-store-private.oss-cn-hangzhou.aliyuncs.com/fxl-ink-portal/product-thumbnail/${product.thumbnailUri}?x-oss-process=image/resize,m_fill,w_560,h_620,limit_0/auto-orient,1/quality,q_90`});
    });

    this.setData({
      products: this.data.products
    })
  },
  onProductClick: function(item) {
    const index = parseInt(item.currentTarget.id);
    const product = this.data.products[index];
    ft.navigateTo({
      url: `/pages/poster/poster?title=${product.title}&productImage=${product.thumbnailUrl}`,
      success: function(res) {
      }
    })
  }
})

/**
 * 数据名必须为:lazyData或其它名(与数据以及页面相同)
 *
 * 模拟数据：lazyData
 * 传输数据：_that,data(this,lazyData,lazy_name,loading_icon)
 */
export function lazyImg(_that, data, lazy_name, loading_icon){
  for (let i = 0, len = data.length; i < len; i++) {
    wx.createIntersectionObserver().relativeToViewport({
      bottom: 20
    }).observe('.item-' + i, (ret) => {
      ret.intersectionRatio > 0 ? data[i].show = true : '';
      _that.setData({
        [lazy_name]: data,
        loadIcon: loading_icon
      })
    })
  }
}
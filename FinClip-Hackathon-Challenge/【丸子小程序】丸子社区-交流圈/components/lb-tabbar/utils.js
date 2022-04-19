export function getPx (val) {
  if (!val) return 0
  if (val.indexOf('rpx') > -1) {
    val = +val.replace('rpx', '')
    val = uni.upx2px(val)
  } else {
    val = +val.replace('px', '')
  }
  return val
}

import Taro from "@tarojs/taro"

const testFn = (fn: () => unknown) => {
  try {
    return fn()
  } catch (e) {
    return null
  }
}
const getSysInfo = () => {
  const sys = Taro.getSystemInfoSync()
  const system = sys.system.toLowerCase()
  const isAndroid = /android/.test(system)
  const isIOS = /ios/.test(system)
  const isFinclip = !!testFn(() => ft.getSystemInfoSync())
  const isWechat = !isFinclip && !!testFn(() => wx.getSystemInfoSync())

  return {
    isWechat,
    isFinclip,
    isAndroid,
    isIOS
  }
}

export const sysInfo = getSysInfo()
export const isFinclipAndroid = sysInfo.isAndroid && sysInfo.isFinclip

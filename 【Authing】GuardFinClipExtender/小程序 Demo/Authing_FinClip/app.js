const guard = require('./guard/guard.js')
// app.js
App({
  guard:guard,
  onLaunch() {

    // 展示本地存储能力
    const logs = ft.getStorageSync('logs') || []
    logs.unshift(Date.now())
    ft.setStorageSync('logs', logs)
  }
})

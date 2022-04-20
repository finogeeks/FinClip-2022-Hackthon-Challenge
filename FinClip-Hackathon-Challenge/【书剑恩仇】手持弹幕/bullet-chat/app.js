// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = ft.getStorageSync('logs') || []
    logs.unshift(Date.now())
    ft.setStorageSync('logs', logs)
  }
})

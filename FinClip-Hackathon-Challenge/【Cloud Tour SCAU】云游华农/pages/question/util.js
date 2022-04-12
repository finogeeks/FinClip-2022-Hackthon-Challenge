function isClicked(self) {
  self.setData({
      ishide: true
  })
 
  setTimeout(function () {
      self.setData({
          ishide: false
      })
  }, 2000)
}
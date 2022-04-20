function Circle(x, y, radius,rotation) {
  console.log('x:'+x);
  console.log('y:' + y);
  console.log('radius:' + radius);
  this.x = x;
  this.y = y;
  this.width = 0;
  this.height = 0;
  this.radius = radius;
  this.rotation = 0;
  this.img = null;
  this.scaleX = 1;
  this.scaleY = 1;
  this.inputEvent = false;
  this.onInputDown = null;
}

Circle.prototype.draw = function (context) {
  // 保存
  context.save();
  // 移动到圆心
  context.translate(this.x, this.y);
  // 旋转
  context.rotate(this.rotation);
  // 缩放
  context.scale(this.scaleX, this.scaleY);

  if (this.img) {
    var imgX = -this.width / 2;
    var imgY = -this.height / 2;
    context.drawImage(this.img, imgX, imgY, this.width, this.height);
  }
  // 还原
  context.restore();
};

Circle.prototype.scale = function (x, y) {
  this.scaleX = x;
  this.scaleY = y;
};



Circle.prototype.contains = function (obj) {
  return Circle.contains(this, obj.x, obj.y);
};

Circle.contains = function (a, x, y) {
  //  Check if x/y are within the bounds first
  if (a.radius > 0 && x >= a.left && x <= a.right && y >= a.top && y <= a.bottom) {
    var dx = (a.x - x) * (a.x - x);
    var dy = (a.y - y) * (a.y - y);

    return (dx + dy) <= (a.radius * a.radius);
  }
  else {
    return false;
  }
};

Object.defineProperty(Circle.prototype, "left", {
  get: function () {
    return this.x - this.radius;
  },

  set: function (value) {
    if (value > this.x) {
      this.radius = 0;
    }
    else {
      this.radius = this.x - value;
    }
  }
});

Object.defineProperty(Circle.prototype, "right", {

  get: function () {
    return this.x + this.radius;
  },

  set: function (value) {
    if (value < this.x) {
      this.radius = 0;
    }
    else {
      this.radius = value - this.x;
    }
  }
});

Object.defineProperty(Circle.prototype, "top", {
  get: function () {
    return this.y - this.radius;
  },

  set: function (value) {
    if (value > this.y) {
      this.radius = 0;
    }
    else {
      this.radius = this.y - value;
    }
  }
});

Object.defineProperty(Circle.prototype, "bottom", {
  get: function () {
    return this.y + this.radius;
  },
  set: function (value) {
    if (value < this.y) {
      this.radius = 0;
    }
    else {
      this.radius = value - this.y;
    }
  }
});

module.exports = Circle;
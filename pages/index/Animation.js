function Animation(circle) {
  this.circle = circle;
  // 角速度
  this.speed = 0;
  // 最大速度
  this.maxSpeed = 10;
  // 摩擦力
  this.friction = 0.98;
  // 加速度
  this.acceleration = 0.1;
  // 是否开始运行
  this.isRun = false;
  // 圈数
  this.rounds = 0;
  //角度
  this.degrees = 0;
  // 当前角度
  this.angle = 0;
  // 开始减速
  this.speedDown = false;
  // 开始加速
  this.speedUp = true;
  // 顺时针还是逆时针
  this.anticlockwise = false;
  // 完成
  this.onComplete = null;
}

Animation.prototype.tween = function (rounds, degrees) {
  this.circle.rotation = 0;
  this.angle = 0;
  this.speedDown = false;
  this.speedUp = true;
  this.rounds = rounds;
  this.degrees = degrees;
  this.isRun = true;
  this.speed = 0;
};

Animation.prototype.update = function () {
  if (this.isRun) {

    // 是否要减速
    if (this.angle >= (this.rounds * 360 + this.degrees)) {
      this.speedDown = true;
      this.angle = 0;
    }

    // 是否要停止加速
    if (this.speed >= this.maxSpeed) {
      this.speedUp = false;
    }

    // 转动角度
    this.angle += this.speed;

    // 加速
    if (this.speedUp) {
      this.speed += this.acceleration;
    }

    // 减速
    if (this.speedDown) {
      if (Math.abs(this.angle) >= 360) {
        this.isRun = false;
        this.speed = 0;
        if (this.onComplete) this.onComplete();
      } else {
        this.speed *= this.friction;
      }
    }

    // 旋转方向
    if (this.anticlockwise) {
      this.circle.rotation += (Math.PI / 180) * this.speed;
    } else {
      this.circle.rotation -= (Math.PI / 180) * this.speed;
    }
  }
};

module.exports = Animation;
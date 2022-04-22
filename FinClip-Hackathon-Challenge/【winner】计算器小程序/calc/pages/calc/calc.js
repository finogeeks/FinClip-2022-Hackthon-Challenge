const compute = require('../../utils/common.js');
Page({
  data: {
    showNum: 0,
    warp: false,
    view: {
      Width: '',
      Height: ''
    }
  },
  //点击按钮
  clickBtn:function(e){
    var clickCode = e.currentTarget.dataset.code;//点击的按钮字符
    var boxNum = this.data.showNum; //显示区的数字
    if (boxNum.length>=12){
      this.setData({
        warp: true
      })
    }
    //点击非运算符号
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].includes(clickCode)){ 
      //输入小数点
      if (clickCode == '.'){
        //显示区域没有运算符号
        if (boxNum.toString().indexOf('+') == -1 && boxNum.toString().indexOf('-') == -1 && boxNum.toString().indexOf('×') == -1 && boxNum.toString().indexOf('÷') == -1){
          //并且已经有了小数点
          if (boxNum.toString().indexOf('.') != -1) {
            return;
          }
        }else{//已经有了运算符号
          //并且已经有了两个小数点,或者最后一位是运算符号
          if ((boxNum.toString().split('.')).length - 1 >= 2 || ["+", "-", "×", "÷"].includes(boxNum.toString().charAt(boxNum.toString().length - 1))){
            return;
          }
        }
      }
      //输入数字
      if (boxNum == '0'){
        if (clickCode == '.'){
          this.setData({
            showNum: boxNum + clickCode
          })
        } else {
          this.setData({
            showNum: clickCode
          })
        }
      }else{
        this.setData({
          showNum: boxNum + clickCode
        })
      }
    }
    //点击运算符号
    if (["+", "-", "×", "÷", "="].includes(clickCode)){
      //显示区域是0，点击加减乘除和等号都无效(不能直接输入负号)
      //显示区域最后一位是运算符号,点击加减乘除和等号也无效
      if (boxNum.toString() == '0' || ["+", "-", "×", "÷"].includes(boxNum.toString().charAt(boxNum.toString().length - 1))) {
        return;
      } else {
        //如果点击加减乘除时显示区域已经有了+-×÷则直接执行运算
        if (clickCode == '+' || clickCode == '-' || clickCode == '×' || clickCode == '÷'){  
          if (boxNum.toString().indexOf('+') != -1){
            var leftNum = boxNum.split("+")[0];
            var rightNum = boxNum.split("+")[1]; 
            var computeResult = compute.fixed(leftNum, rightNum, 'add');
            if (computeResult.toString().length >= 12) {
              this.setData({
                warp: true
              })
            }
            this.setData({
              showNum: computeResult + clickCode
            })
            return;
          } else if (boxNum.toString().indexOf('-') != -1) {
            //如果第一位是负号
            if (boxNum.toString().charAt(0) == '-'){
              //显示区域只有一位
              if (boxNum.toString() == '-'){
                //点击运算符号或‘0’或‘.’都无效
                if (clickCode == '+' || clickCode == '-' || clickCode == '×' || clickCode == '÷' || clickCode == '0' || clickCode == '.') {
                  return;
                } else if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(clickCode)){
                  //点数字1-9就追加
                  this.setData({
                    showNum: computeResult + clickCode
                  })
                }
              } else {//显示区域不止一位
                //判断有几个减号（负号）
                //如果有两个，取第二个减号两边的字符, 再进行计算
                if ((boxNum.toString().split('-')).length - 1 == 2) {
                  var lastIndex = boxNum.toString().lastIndexOf("-");
                  var leftNum = boxNum.toString().substring(0, lastIndex)
                  var rightNum = boxNum.toString().substring(lastIndex+1, boxNum.toString().length)
                  var computeResult = compute.fixed(leftNum, rightNum, 'sub');
                  this.setData({
                    showNum: computeResult + clickCode
                  })
                  if (computeResult.toString().length >= 12) {
                    this.setData({
                      warp: true
                    })
                  }
                }else{//如果只有一个减号
                  //还要判断负数乘/除的情况
                  if (boxNum.toString().indexOf('×') != -1){
                    var leftNum = boxNum.split("×")[0];
                    var rightNum = boxNum.split("×")[1];
                    var computeResult = Number(leftNum) * Number(rightNum);
                    if (computeResult.toString().length >= 12) {
                      this.setData({
                        warp: true
                      })
                    }
                    this.setData({
                      showNum: computeResult + clickCode
                    })
                    return;
                  }
                  //判断负数除以一个数
                  if (boxNum.toString().indexOf('÷') != -1){
                    var leftNum = boxNum.split("÷")[0];
                    var rightNum = boxNum.split("÷")[1];
                    var computeResult = Number(leftNum) / Number(rightNum);
                    if (computeResult.toString().length >= 12) {
                      this.setData({
                        warp: true
                      })
                    }
                    this.setData({
                      showNum: computeResult + clickCode
                    })
                  }else{
                    this.setData({
                      showNum: boxNum.toString() + clickCode
                    })
                  }
                }
              }
            }else{//第一位不是负号
              var leftNum = boxNum.split("-")[0];
              var rightNum = boxNum.split("-")[1];
              var computeResult = compute.fixed(leftNum, rightNum, 'sub');
              this.setData({
                showNum: computeResult + clickCode
              })
              if (computeResult.toString().length >= 12) {
                this.setData({
                  warp: true
                })
              }
            }
            return;
          } else if (boxNum.toString().indexOf('×') != -1) {
            var leftNum = boxNum.split("×")[0];
            var rightNum = boxNum.split("×")[1];
            var computeResult = Number(leftNum) * Number(rightNum);
            if (computeResult.toString().length >= 12) {
              this.setData({
                warp: true
              })
            }
            this.setData({
              showNum: computeResult + clickCode
            })
            return;
          } else if (boxNum.toString().indexOf('÷') != -1) {
            var leftNum = boxNum.split("÷")[0];
            var rightNum = boxNum.split("÷")[1];
            var computeResult = Number(leftNum) / Number(rightNum);
            if (computeResult.toString().length >= 12) {
              this.setData({
                warp: true
              })
            }
            this.setData({
              showNum: computeResult + clickCode
            })
            return;
          }
        }
        //点击的是等号，执行运算
        if (clickCode == '=') {
          //运算体中有运算符号
          if (boxNum.toString().indexOf('+') != -1) {
            var leftNum = boxNum.split("+")[0];
            var rightNum = boxNum.split("+")[1];
            //并且符号两边都有值才可以运算
            if (leftNum && rightNum){
              var computeResult = compute.fixed(leftNum, rightNum, 'add');
              if (computeResult.toString().length >= 12) {
                this.setData({
                  warp: true
                })
              }
              this.setData({
                showNum: computeResult
              })
            }
            return;
          }else if (boxNum.toString().indexOf('-') != -1) {
            //如果第一位是负号
            if (boxNum.toString().charAt(0) == '-') {
              //显示区域只有一位
              if (boxNum.toString() == '-') {
                //点击运算符号或‘0’或‘.’都无效
                if (clickCode == '+' || clickCode == '-' || clickCode == '×' || clickCode == '÷' || clickCode == '0' || clickCode == '.') {
                  return;
                } else if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(clickCode)) {
                  //点数字1-9就追加
                  this.setData({
                    showNum: computeResult
                  })
                }
              } else {//显示区域不止一位
                //判断有几个减号（负号）
                //如果有两个，取第二个减号两边的字符, 再进行计算
                if ((boxNum.toString().split('-')).length - 1 == 2) {
                  var lastIndex = boxNum.toString().lastIndexOf("-");
                  var leftNum = boxNum.toString().substring(0, lastIndex)
                  var rightNum = boxNum.toString().substring(lastIndex + 1, boxNum.toString().length)
                  // var computeResult = Number(leftNum) - Number(rightNum);
                  var computeResult = compute.fixed(leftNum, rightNum, 'sub');
                  this.setData({
                    showNum: computeResult
                  })
                  if (computeResult.toString().length >= 12) {
                    this.setData({
                      warp: true
                    })
                  }
                } else {//如果只有一个减号
                  //还要判断负数乘/除的情况
                  if (boxNum.toString().indexOf('×') != -1) {
                    var leftNum = boxNum.split("×")[0];
                    var rightNum = boxNum.split("×")[1];
                    var computeResult = Number(leftNum) * Number(rightNum);
                    if (computeResult.toString().length >= 12) {
                      this.setData({
                        warp: true
                      })
                    }
                    this.setData({
                      showNum: computeResult
                    })
                    return;
                  }
                  //判断负数除以一个数
                  if (boxNum.toString().indexOf('÷') != -1) {
                    var leftNum = boxNum.split("÷")[0];
                    var rightNum = boxNum.split("÷")[1];
                    var computeResult = Number(leftNum) / Number(rightNum);
                    if (computeResult.toString().length >= 12) {
                      this.setData({
                        warp: true
                      })
                    }
                    this.setData({
                      showNum: computeResult
                    })
                  }
                }
              }
            } else {//第一位不是负号
              var leftNum = boxNum.split("-")[0];
              var rightNum = boxNum.split("-")[1];
              // var computeResult = Number(leftNum) - Number(rightNum);
              var computeResult = compute.fixed(leftNum, rightNum, 'sub');
              this.setData({
                showNum: computeResult
              })
              if (computeResult.toString().length >= 12) {
                this.setData({
                  warp: true
                })
              }
            }
            return;        
          }else if (boxNum.toString().indexOf('×') != -1) {
            //第一位不是负号
            if (boxNum.toString().charAt(0) != '-'){

            }
            var leftNum = boxNum.split("×")[0];
            var rightNum = boxNum.split("×")[1];
            if (leftNum && rightNum) {
              // var computeResult = Number(leftNum) * Number(rightNum);
              var computeResult = compute.fixed(leftNum, rightNum, 'mul');
              if (computeResult.toString().length >= 12) {
                this.setData({
                  warp: true
                })
              }
              this.setData({
                showNum: computeResult
              })
            }
            return;
          }else if (boxNum.toString().indexOf('÷') != -1) {
            var leftNum = boxNum.split("÷")[0];
            var rightNum = boxNum.split("÷")[1];
            if (leftNum && rightNum) {
              // var computeResult = Number(leftNum) / Number(rightNum);
              var computeResult = compute.fixed(leftNum, rightNum, 'div');
              if (computeResult.toString().length >= 12) {
                this.setData({
                  warp: true
                })
              }
              this.setData({
                showNum: computeResult
              })
            }
            return;
          }
        } else {
          this.setData({
            showNum: boxNum.toString() + clickCode
          })
        }
      }
    }
    //点击回退按钮
    if (clickCode == '←'){
      if (boxNum == '0') {
        return;
      } 
      if (boxNum.length <= 12) {
        this.setData({
          warp: false
        })
      }
      if (boxNum.length == 1){
        this.setData({
          showNum: 0
        })
      } else {
        this.setData({
          showNum: boxNum.toString().substring(0, boxNum.toString().length - 1)
        })
      }
    }
    //归零
    if (clickCode == 'C'){
      this.setData({
        showNum: 0,
        warp: false
      })
    }
  },
  onLoad:function(options){
    this.setData({
      showNum: options.num
    })
  },
  onReady() {
    var that = this;
    wx.getSystemInfo({
      success({ windowWidth, windowHeight}) {
        that.setData({
          view: {
            Width: windowWidth,
            Height: windowHeight
          }
        })
      }
    });
  },
  //页面分享
  onShareAppMessage: function () {
    return {
      title: '汇票计算助手',
      path: 'pages/calc/calc'
    }
  }
})
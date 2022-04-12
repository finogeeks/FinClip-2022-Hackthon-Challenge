//导入懒加载的js
let {lazyImg} = require("../../js/lazyImage");

Page({
  data: {
    urls:[],
    lazyData:[
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/0016c5908aaf6b8fec9f5c2d65315aa.jpg?sign=930db67556b77306afcfa815580fec05&t=1649750725"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/02b9044821c1947cfb1af54f9c86512.png?sign=f35b3dc496c744f69dbc3648549c38e9&t=1649750732"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/211c61549aa4df58f6d746967f5d74b.png?sign=9914d201f63fcfb1c36a02801e59af77&t=1649750763"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/3a1a0bd3901066a6c06240e50a14a8c.jpg?sign=86e1610d02c8d97a2cc6933005a67418&t=1649750770"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/3dd2394bafcb5488060c10cdd000f48.png?sign=8a3f8bfca46a71a79665873f2ef06f8b&t=1649750780"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/67c6893cf822675bd4a742fa4a401c0.png?sign=58f65ee5db7f6ce13d386ae1c538ef49&t=1649750790"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/8a54966d1b2981c59ffec880b4044bc.jpg?sign=000ac5ce3d892bb3b0ba27a277e074c2&t=1649750807"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/9062b0bab5bfaf23a539bea4f1fc778.png?sign=4bfcc0bf00c9a09e7f1ecc08a64c16ae&t=1649750815"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/a0874081633a8f933dd03d7d7f31c8b.png?sign=715432d8b92d513a27084d7f39eaf9e9&t=1649750822"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/d275ee07a6bd9d6ba4a65e4831b9090.png?sign=4fe8c0864c3db322e4b3cf8649502aae&t=1649750831"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/dc5a0bbaea2cf10dc52f0c1825b47f4.png?sign=1bee2a994ea94377306cbd9d7ebed48e&t=1649750842"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/e57238aa757fe7153a7cfb8ec5589b2.jpg?sign=a5fc99ea1773a5c49b00503f043547ef&t=1649750851"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/f458b8ca3ff51c929443d7c14dbe4f7.png?sign=262bdd9434487094bb611ce02e1a9a54&t=1649750863"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/be11955f657fcd7b220f2fd9c41b22b.jpg?sign=19a80f4dde0c4c963d473258be1fbf13&t=1649750999"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/a0874081633a8f933dd03d7d7f31c8b.png?sign=1233fb9ffad84147c9d36a9be596a687&t=1649751021"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/af821af4234134dc80d092ae65dbb27.png?sign=5fd6755a5effceb857d6afd3972785ed&t=1649751007"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/8b52aacab87589b8a6edbdcc46a16bf.png?sign=2a05c81055f6e27ab7ae934b0b39402e&t=1649751033"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/8a54966d1b2981c59ffec880b4044bc.jpg?sign=210f1de116e55671ad72d7e608316de3&t=1649751041"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/7b622ac0ec99a40cb5d900ad00a17a7.jpg?sign=1d76b03afb7b2161fa9ce121296a036f&t=1649751055"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/658d4e8a3307f9518899a76d6edd9bd.png?sign=f641f8a9649d91ec7ca33fef5141ce23&t=1649751063"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/648a37391068c48f377c0f5db800734.png?sign=a5e3de4d185da9bfadd3be0a7d987ccc&t=1649751071"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/57d84603d555004f2e71c67169af20f.png?sign=21ec59c7e1601209b1988e9377dc8264&t=1649751081"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/44d8ca99c1b6d21e97f3da9b9c997d5.jpg?sign=f82ee6e0a9e029d184ee4075585e761b&t=1649751098"},
      {src:"https://796b-ykf-1gf4ci0r28637c7c-1305480306.tcb.qcloud.la/%E6%8F%92%E7%94%BB/3a3b8c30d95246b5a308ac57fd65207.png?sign=c192a2399d380e7a1f6b777678c04cce&t=1649751103"},
    ]
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src, //当前点击的图片的地址
      urls: this.data.urls  //图片数组，一定要是一个数组
    })
  },
  //将图片src取出放入urls数组中
  imageList(){
    for(let item of this.data.lazyData){
      this.data.urls.push(item.src);
    }
  },
  onLoad: function() {
    /**
     * this - 当前对象
     * this.data.lazyData - 数据源
     * lazy_name - 数据名
     * 加载图标 - https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif
     */
    lazyImg(this, this.data.lazyData, 'lazyData', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F8e7779d3df66f6a929fbc40b3f01c687c3272e7214ba7-8w2V8I_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644304602&t=424435be7a21d6a9b47c604d33b13a8f')
    this.imageList();
  }
})
 


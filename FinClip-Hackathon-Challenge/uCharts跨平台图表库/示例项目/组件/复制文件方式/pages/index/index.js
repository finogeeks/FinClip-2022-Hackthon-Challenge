Page({
  data: {
    chartData: {},
    opts: {},
  },
  onReady() {
    this.getServerData();
  },
  getServerData() {
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
      //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      let chartData = {
            categories:["2016", "2017", "2018", "2019", "2020", "2021"],
            series: [
              {
                name: "目标值",
                data: [35, 36, 31, 33, 13, 34]
              },
              {
                name: "完成量",
                data: [18, 27, 21, 24, 6, 28]
              }
            ]
          };
      this.setData({ chartData });
    }, 500);
  },
  complete(e){
    console.log(e);
  }
})
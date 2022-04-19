module.exports = {
  transpileDependencies: ['uview-ui'],
  devServer: {
    proxy: 'https://test-covidmap.cdgwin.com/',
  },
};

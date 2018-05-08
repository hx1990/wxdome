// pages/detail.js
const log=console.log.bind(console)
const Zan = require('../../dist/index.js');
Page(Object.assign({},Zan.Stepper,{

  /**
   * 页面的初始数据
   */
  data: {
   product:{},
   defaultImagePath:'https://yizhengyilong.xyz/pic/1.jpg',
   srcImagePath:'',
   loadComplete:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.setData({
      product: option
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (option) {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (option) {
   
    
    
  },
  handleZanStepperChange(e) {
    log(e)
    const Id = e.componentId
    const stepper = e.stepper
    const p = this.data.product
    p.stepper= stepper
  },
  
  imageload(ev){
    this.setData({
      loadComplete:true,
      srcImagePath:'https://yizhengyilong.xyz'+this.data.product.src
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
}))
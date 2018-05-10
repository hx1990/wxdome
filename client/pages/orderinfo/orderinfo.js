const log = console.log.bind(console)
let nb = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prodcut: [],
    totalPrice: 0,
    name: '',
    phone: 0,
    address: '',
    date: '2018-05-02',
    sendtime: '',
    array: ['11:30', '18:30'],
    index: 0,
  },

  onLoad(options) {
    const that = this
    wx.request({
      url: "https://yizhengyilong.xyz/userinfo",
      success(res) {
        for (let i = 0; i < res.data.length; i++) {

          if (res.data[i].wxname == options.wxname) {

            that.setData({
              name: res.data[i].name,
              phone: Number(res.data[i].phone),
              address: res.data[i].address
            })
          }
        }
      }

    })
    wx.getStorage({
      key: 'listinfo',
      success: function (res) {
        let price = 0
        for (let i = 0; i < res.data.length; i++) {
          let p = res.data
          price += (p[i].stepper.stepper) * (p[i].price)
        }
        that.setData({
          product: res.data,
          totalPrice: price
        })
      }
    })

  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      sendtime: this.data.date + ' ' + this.data.array[this.data.index] + ':00'
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      sendtime: this.data.date + ' ' + this.data.array[this.data.index] + ':00'
    })
  },


  pay() {
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function (res) {
        log('成功', res)
      },
      'fail': function (res) {
        log('失败', res)
      }
    })
  },

  submitOrderinfo() {

    const that = this
    let n = 0
    let date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    for (let i = 0; i < this.data.product.length; i++) {
      wx.request({
        url: 'https://yizhengyilong.xyz/orderinfo',
        data: {
          ptitle: that.data.product[i].name,
          psrc: that.data.product[i].src,
          price: that.data.product[i].price,
          stepper: that.data.product[i].stepper.stepper,
          address: that.data.address,
          phone: '' + that.data.phone,
          user: that.data.name,
          posttime: date,
          sendtime: that.data.sendtime,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          log('执行', nb++)
        }
      })
    }
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
})

const Zan = require('../../dist/index.js');
const addlist = []
const log = console.log.bind(console)

Page(Object.assign({}, Zan.actionsheet, Zan.Stepper, Zan.NoticeBar, {
  data: {
    notice: [],
    showTopPopup: false,
    stepperd: [],
    list: [],
    count: 0,
    totalPrice: 0,
    showcat: 'none',
    alllsit: {},
    type: [],
    quanbu: []
  },

  // 显示购物车列表
  showlist() {
    if (this.data.list.length > 0) {
      this.setData({
        showcat: 'block'
      })
    }
  },
  
  //关闭购物车列表
  close() {
    this.setData({
      showcat: 'none'
    })
  },

  //添加购物车
  showCat() {
    let p = this.data.quanbu
    let price = 0
    const addlist = []
    for (let i = 0; i < p.length; i++) {
      if (p[i].stepper.stepper > 0) {
        addlist.push(p[i])
      }
      price += (p[i].stepper.stepper) * (p[i].price)
    }
    for (let i = 0; i < addlist.length; i++) {
      if (addlist[i].stepper.stepper == 0) {
        addlist.splice(i, 1)
      }
    }
    this.setData({
      totalPrice: price,
      list: addlist
    })
    wx.setStorage({
      key: 'listinfo',
      data: this.data.list
    })
  },

  //显示隐藏公告信息
  toggleTopPopup() {
    this.setData({
      showTopPopup: !this.data.showTopPopup
    })
  },

  //点击添加或者删除商品
  handleZanStepperChange(e) {
    let Id = e.componentId
    let stepper = e.stepper
    const p = this.data.quanbu
    let pjson = this.data.alllist
    for (var i = 0; i < p.length; i++) {
      if (p[i].ID == Id) {
        let a = pjson[p[i].type]
        for (let j = 0; j < a.length; j++) {
          if (a[j].ID == Id) {
            pjson[p[i].type][j].stepper.stepper = stepper
          }
        }
        p[i].stepper.stepper = stepper
      }
    }
    let inow = 0
    for (let i = 0; i < p.length; i++) {
      if (p[i].stepper.stepper > 0) {
        inow += p[i].stepper.stepper
      }
    }
    this.setData({
      quanbu: p,
      count: inow,
      alllist: pjson
    });
    this.showCat()
  },

  //生命周期视图现实之前加载后台接口
  onShow() {
    const that = this
    //获取公告信息
    wx.request({
      url: "https://yizhengyilong.xyz/notice",
      success(res) {
        that.setData({
          notice: res.data
        })
      },
      fail(err) {
        log('err', err)
      }
    })

    //获取产品列表
    let jsonlist = {}
    let dianplist = []
    let quanbu = []
    wx.request({
      url: "https://yizhengyilong.xyz/productlist",
      success(res) {
        for (let i = 0; i < res.data.length; i++) {
          let p = res.data[i]
          p.stepper = {}
          p.stepper.stepper = 0
          p.stepper.min = 0
          quanbu.push(p)
          if (p.type == "店铺招牌") {
            dianplist.push(p)
          }
        }
        let typelist = []
        let json = {}
        for (let i = 0; i < res.data.length; i++) {
          let p = res.data[i]
          if (json[p.type]) {
            continue
          } else {
            typelist.push(p.type)
            json[p.type] = 1
          }
        }
        for (let j = 0; j < typelist.length; j++) {
          jsonlist[typelist[j]] = []
        }
        for (let i = 0; i < res.data.length; i++) {
          let p = res.data[i]
          for (let j = 0; j < typelist.length; j++) {
            if (p.type == typelist[j]) {
              let a = []
              jsonlist[typelist[j]].push(p)
            }
          }
        }

        that.setData({
          productlist: dianplist,
          alllist: jsonlist,
          type: typelist,
          quanbu
        })
      }
    })
  },
 
  //获取用户信息并跳转到支付页面
  getuse() {
    if (this.data.list.length > 0) { //判断购物车是否有商品
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo
          var nickName = userInfo.nickName
          let bsuer = false
          wx.request({
            url: "https://yizhengyilong.xyz/userinfo",
            success(res) {
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].wxname == nickName) { //显示用户订单地址
                  bsuer = true
                  wx.navigateTo({
                    url: '../orderinfo/orderinfo?wxname=' + nickName,
                  })
                }
              }
              if (!bsuer) {  //跳转到添加用户信息页面
                wx.reLaunch({
                  url: '../userinfo/userinfo?wxname=' + nickName
                })
              }
            }
          })

        }
      })
    }
  }
}))

// pages/userinfo.js
const Zan = require('../../dist/index')
const log = console.log.bind(console)
Page(Object.assign({}, Zan.Dialog, Zan.Select, Zan.TopTips, Zan.Field, {
  data: {
    wxname: '',
    name: '',
    address1: '',
    address2: '',
    phone: '',
    base: {
      name: {
        componentId: 1,
        focus: true,
        title: '收货人',
        placeholder: '名字'
      },
      tel: {
        error: true,
        componentId: 2,
        title: '联系电话',
        inputType: 'number',
        placeholder: '请输入手机号'
      },
      address: {
        componentId: 3,
        title: '详细地址',
        type: 'textarea',
        placeholder: '请输入详细地址'
      },
    },
    items: [
    ],
    index: 0,
  },

  onLoad(ev) {
    this.setData({
      wxname: ev.wxname
    })
    let that = this
    wx.request({
      url: 'https://yizhengyilong.xyz/xiaoqulist',
      success(res) {
        const xiaoqu = []
        for (let i = 0; i < res.data.length; i++) {
          let d = res.data[i]
          xiaoqu.push(d.name)
        }
        that.setData({
          items: xiaoqu
        })
      }
    })
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      address1: this.data.items[this.data.index]
    })
    log(this.data.address1, e)
  },
  handleZanFieldBlur(e) {
    const { componentId, detail } = e;
    if (componentId == 1) {
      this.setData({
        name: e.detail.value
      })
    } else if (componentId == 2) {
      this.setData({
        phone: '' + e.detail.value
      })
    } else if (componentId == 3) {
      this.setData({
        address2: e.detail.value
      })
    }
  },
  submitdata() {
    const that = this
    wx.request({
      url: 'https://yizhengyilong.xyz/userinfo',
      data: {
        wxname: that.data.wxname,
        name: that.data.name,
        address: that.data.address1 + that.data.address2,
        phone: that.data.phone
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.reLaunch({
          url: '../orderinfo/orderinfo',
          success(re) {
            log('成功跳转', res, re)
          },
        })
      }
    })
  },
  toggleVerticalDialog() {
    const that = this
    this.showZanDialog({
      title: '收货信息',
      content: '确认收货信息',
      buttonsShowVertical: true,
      buttons: [{
        text: '收货人:' + that.data.name,
        color: '#3CC51F',
        type: 'cash'
      }, {
        text: '联系电话：' + that.data.phone,
        color: '#3CC51F',
        type: 'wechat'
      },
      {
        text: '地址：' + that.data.address1 + that.data.address2,
        color: '#3CC51F',
        type: 'wechat'
      },
      {
        text: '确认',
        color: 'blue',
        type: 'confirm'
      },
      {
        text: '取消',
        type: 'cancel'
      }]
    }).then(({ type }) => {
      if (type == 'confirm') {
        that.submitdata()
      }
    });
  }
}))
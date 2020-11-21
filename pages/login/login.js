/*
登陆流程
1.收集表单数据
2.前端验证
  1）验证用户信息（账号，密码）是否合法
  2）前端验证不通过提示用户，不需要发请求给后端
  3）前端验证通过了，发请求（携带账号，密码）给服务器端
3.后端验证
  1）验证用户是否存在（查数据库）
  2）用户不存在直接返回，告诉前端用户不存在
  3）用户存在需要验证密码是否正确
  4）密码不正确返回给前端提示密码不正确
  5）密码正确返回给前端数据，提示用户登陆成功（会携带用户的相关信息）
*/
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    password:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //表单项内容发生改变的回调
  handleInput(event) {
    // let type = event.currentTarget.id; //id传值 取值： phone || password
    let type = event.currentTarget.dataset.type; //data-key=value 向event传多个参数时用 data-key=value
    // console.log(type, event.detail.value);
    this.setData({
      [type]: event.detail.value
    })
  },

  //登陆的回调
  async login() {
    // 1.收集表单数据
    let{phone, password} = this.data;
    // 2.前端验证
    if(!phone) {
      // 提示用户
      wx.showToast({
        title: '手机号不能为空',
        icon:"none"
      })
      return;
    }
    //定义正则
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if(!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: "none"
      })
      return;
    }

    if(!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: "none"
    })
    return;
    }

    //后端验证
    let result = await request('/login/cellphone', {phone, password, isLogin: true},{method:"POST"})
    if(result.code === 200) {
      wx.showToast({
        title: '登陆成功',
      })

      //将用户的信息存储至本地
      wx.setStorageSync("userInfo", JSON.stringify(result.profile))
      //跳转到个人中心personal页面
      wx.reLaunch({
        url: '/pages/personal/personal',
      })
    } else if(result.code === 400) {
      wx.showToast({
        title: '手机号错误',
        icon:"none"
      })
    } else if(result.code === 502) {
      wx.showToast({
        title: '密码错误',
        icon:"none"
      })
    } else {
      wx.showToast({
        title: '登陆失败，请重新登陆',
        icon:"none"
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
})
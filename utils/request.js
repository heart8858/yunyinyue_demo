//发送Ajax请求
import config from './config.js'

export default (url, data={}, method="GET") => {
  return new Promise((resolve,reject) => {
    //1. new Promise 初始化promise实例的状态为pending
    //2.
    wx.request({
      url: config.host + url,
      data,
      method,
      header:{
        cookie: wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1) : ''
      },
      success: (res) => {
        // console.log('请求成功', res);
        if(data.isLogin) { //登陆请求
          wx.setStorage({
            // 将用户的cookie存入至本地
            key: 'cookies',
            data: res.cookies
          })
        }
        resolve(res.data);
      },
      fail: (err) => {
        // console.log('请求失败', err);
        reject(err);
      }
    })
  })
}
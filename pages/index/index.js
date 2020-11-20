import request from '../../utils/request.js'

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[], //轮播图数据
    recommedList:[], //推荐歌单
    topList:[], //排行榜
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let bannerListData = await request('/banner', {type:2});
    this.setData({
      bannerList: bannerListData.banners
    })

    //获取推荐歌单数据
    let recommedListData = await request('/personalized', { type: 2 }, {limit:10});
    this.setData({
      recommedList: recommedListData.result
    })

    //获取排行榜数据
    let index = 0;
    let resultArr = [];
    while (index<5) {
      let topListData = await request('/top/list', { idx: index++ });
      let topListItem = { name: topListData.playlist.name, tracks: topListData.playlist.tracks.slice(0,3)}
      resultArr.push(topListItem);
      // 不需要等待五次请求全部结束才更新， 但是渲染次数较多
      this.setData({
        topList: resultArr
      })
    }
    //更新topList的状态值， 此处可能会导致发送请求过程中页面长时间白屏
    // this.setData({
    //   topList : resultArr
    // })
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
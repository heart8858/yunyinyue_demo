import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false, //标识音乐是否播放
    song:{}, //歌曲详情对象
    musicId:'' //音乐id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options: 用于接收路由跳转的query参数
    // 原生小程序中路由传参，对参数的长度有限制，如果参数长度过长会自动截取掉
    let musicId = options.musicId;
    this.setData({
      musicId
    })
    this.getMusicInfo(musicId);

    /*
      问题：如果用户操作系统的控制音乐播放/暂停的按钮，页面不知道，导致页面显示
      是否播放的状态和真是音乐播放状态不一致。
      解决：
        通过控制音频实例区监视音乐播放/暂停/停止
    */

    // 创建控制音乐播放的实例对象
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    this.backgroundAudioManager.onPlay(() => {
      // 修改音乐是否播放的状态
      this.changePlayState(true);
    });
    this.backgroundAudioManager.onPause(() => {
      this.changePlayState(false);
    });
    this.backgroundAudioManager.onStop(() => {
      this.changePlayState(false);
    });
  },
  // 修改播放状态的功能函数
  changePlayState(isPlay) {
    this.setData({
      isPlay
    })
  },
  // 获取音乐详情的功能函数
  async getMusicInfo(musicId) {
    let songData = await request("/song/detail", {ids: musicId});
    this.setData({
      song: songData.songs[0]
    })

  // 动态修改窗口标题
  wx.setNavigationBarTitle({
    title: this.data.song.name
  })
  },
  // 点击播放/暂停的回调
  handleMusicPlay() {
    let isPlay = !this.data.isPlay;
    // //修改是否播放的状态
    // this.setData({
    //   isPlay
    // })
    let {musicId} = this.data;
    this.musicControl(isPlay, musicId);
  },
  
  // 控制音乐播放/暂停的功能函数
  async musicControl(isPlay, musicId) {
    
    if(isPlay) { //音乐播放
      // 获取音乐播放连接
      let musicLinkData = await request('/song/url', {id: musicId});
      let musicLink = musicLinkData.data[0].url;
    
      this.backgroundAudioManager.src = musicLink;
      this.backgroundAudioManager.title = this.data.song.name;
    }else { //暂停音乐
      this.backgroundAudioManager.pause();
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
//index.js
//获取应用实例
const app = getApp()
var navigateToObject = require('../../utils/navigate.js');
var httpUtil = require('../../utils/httpUtil.js');
var commUtil = require('../../utils/common.js');

Page({
  data: {
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(210)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  funplay: function () {
    console.log("audio play");
  },
  funpause: function () {
    console.log("audio pause");
  },
  funtimeupdate: function (u) {
    //console.log(u.detail.currentTime);
    //console.log(u.detail.duration);
  },
  funended: function () {
    console.log("audio end");
  },
  funerror: function (u) {
    console.log(u.detail.errMsg);
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    wx.login({
      success: res => {
        console.log('res.code=============' + res.code)
        app.globalData.code = res.code;
        var that = this;
        var url = "https://www.party-time.cn/v1/api/wechatMini/login";
        var header = { "Content-Type": "application/x-www-form-urlencoded" };
        httpUtil.post(url, 'POST', { 'code': res.code }, function (e) {
          app.globalData.userCookieKey = e.data.data.userCookieKey;
          //danmuOperateSecheduler(that);
        }, function (e) {
          console.loe('login error')
        }, function (res) {
        });
      }
    });
  },
  startRecode:function(){
  var s = this;
  console.log("start");
  wx.startRecord({
      success: function (res) {
          console.log(res);
          var tempFilePath = res.tempFilePath;
          s.setData({ recodePath: tempFilePath, isRecode:true});
      },
      fail: function (res) {
          console.log("fail");
          console.log(res);
          //录音失败
      }
  });
  },
  endRecode:function(){//结束录音 
  var s = this;
  console.log("end");
  wx.stopRecord();
  s.setData({ isRecode: false });

   
  wx.showToast();
  setTimeout(function () {
    var urls = "https://www.party-time.cn/v1/api/wechatMini/fileUpload";
      console.log(s.data.recodePath);
      wx.uploadFile({
          url: urls,
          filePath: s.data.recodePath,
          name: 'file',
          formData:{
            userCookieKey:app.globalData.userCookieKey
          },
          header: {
              'content-type': 'multipart/form-data'
          },
          success: function (res) {
              var str = res.data;
              var data = JSON.parse(str);
              if (data.states == 1) {
                  var cEditData = s.data.editData;
                  cEditData.recodeIdentity = data.identitys;
                  s.setData({ editData: cEditData });
              }
              else {
                  wx.showModal({
                      title: '提示',
                      content: data.message,
                      showCancel: false,
                      success: function (res) {

                      }
                  });
              }
              wx.hideToast();
          },
          fail: function (res) {
              console.log(res);
              wx.showModal({
                  title: '提示',
                  content: "网络请求失败，请确保网络是否正常",
                  showCancel: false,
                  success: function (res) {

                  }
              });
              wx.hideToast();
          }
      });
  },1000)
 
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

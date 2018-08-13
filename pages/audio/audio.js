//index.js
//获取应用实例
const app = getApp()
var navigateToObject = require('../../utils/navigate.js');
var httpUtil = require('../../utils/httpUtil.js');
var commUtil = require('../../utils/common.js');
var array = [];
var x, y, x1, y1, x2, y2, index, currindex, n, yy;
var bmove = false;
Page({
  data: {
    doommData:[]
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
    /*var array = [];*/
    /*for(var i=0; i<25; i++){
        var dataObject = {
            text:"text"+i
        }
      array.push(dataObject);
    }
    this.setData({
      doommData: array
    })*/
  },
  startRecode: function () {
    var s = this;
    console.log("start");
    wx.startRecord({
      success: function (res) {
        console.log(res);
        var tempFilePath = res.tempFilePath;
        s.setData({ recodePath: tempFilePath, isRecode: true });
      },
      fail: function (res) {
        console.log("fail");
        console.log(res);
        //录音失败
      }
    });
  },
  endRecode: function () {//结束录音 
    var s = this;
    console.log("end");
    wx.stopRecord();
    s.setData({ isRecode: false });

    var that = this;
    wx.showToast();
    setTimeout(function () {
      var urls = "https://www.party-time.cn/v1/api/wechatMini/fileUpload";
      console.log(s.data.recodePath);
      wx.uploadFile({
        url: urls,
        filePath: s.data.recodePath,
        name: 'file',
        formData: {
          userCookieKey: app.globalData.userCookieKey
        },
        header: {
          'content-type': 'multipart/form-data'
        },
        success: function (res) {
          var result = res.data;
          var resultObject = JSON.parse(result)
          if (resultObject.result == 200){

            console.log('===============' + resultObject.data);

            var dataObject = {
              text: resultObject.data
            }
            array.push(dataObject);
            that.setData({
              doommData: array
            })
          }
          
          /*var data = JSON.parse(str);
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
          }*/
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
    }, 1000)

  }
})

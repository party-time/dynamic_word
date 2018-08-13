const app = getApp()
var navigateToObject = require('../../utils/navigate.js');
var httpUtil = require('../../utils/httpUtil.js');
var commUtil = require('../../utils/common.js');
var x, y, x1, y1, x2, y2, index, currindex, n, yy;
var array = [];
var bmove = false;

var id = 1;
// pages/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    array = [];

    this.setData({
      content: array
    })
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
  
  },
  movestart: function (e) {
    console.log('movestart')
    currindex = e.target.dataset.index;

    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
    x1 = e.currentTarget.offsetLeft;
    y1 = e.currentTarget.offsetTop;


    //console.log('x:' + x)
    //console.log('y:' + y)
    //console.log('x1:' + x1)
    console.log('y1:' + y1)
  },
  move: function (e) {
    console.log('move')
    yy = e.currentTarget.offsetTop;
    x2 = e.touches[0].clientX - x + x1;
    console.log('move x2:' + x2)

    if (x2 < 9) {
      x2 = 7;
    }
    if (x2 > 9) {
      x2 = 7;
    }

    y2 = e.touches[0].clientY - y + y1;

    if (y2 < -5) {
      y2 = -4;
    }
    console.log('move y2:' + y2)
    this.setData({
      mainx: currindex,
      opacity: 0.7,
      start: { x: x2, y: y2 }
    })
    bmove = true;
  },
  moveend: function () {
    console.log('moveend')
    if (bmove) {
      var arr = [];
      for (var i = 0; i < this.data.content.length; i++) {
        arr.push(this.data.content[i]);
      }


      var nx = this.data.content.length;
      n = 1;
      for (var k = 2; k < nx; k++) {
        if (y2 > (57 * (k - 1) + k * 2 - 29)) {
          n = k;
        }
      }
      if (y2 > (57 * (nx - 1) + nx * 2 - 29)) {
        n = nx;
      }
      //console.log(arr);
      arr.splice((currindex - 1), 1);
      arr.splice((n - 1), 0, array[currindex - 1]);
      array = [];
      for (var m = 0; m < this.data.content.length; m++) {
        //console.log(arr[m]);
        arr[m].id = m + 1;
        array.push(arr[m]);
      }
      // console.log(array);
      this.setData({ mainx: "", content: arr, opacity: 1 });
      bmove = false;
    }
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
          if (resultObject.result == 200) {

            console.log('===============' + resultObject.data);

            var dataObject = {
              content: resultObject.data,
              id :id
            }
            id = id +1;
            array.push(dataObject);
            that.setData({
              content: array
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
var msgList = new Array();
var pvList = new Array();
var msgCount = 0;
var audioList = new Array();

const audioCtx = wx.createInnerAudioContext('myAudio');

var dWord = function (info, color, size, animate, type) {
  this.info = info;
  if (null == color) {
    this.color = '#fff';
  } else {
    this.color = color;
  }
  this.size = size + 'px';
  this.animate = animate;
  //0是向左倒 1是向右倒 2是文字
  if (null == type) {
    this.type = 2;
  } else {
    this.type = type;
  }
}

var pageView = function (paragraphArray,type){
  //0是向左倒 1是向右倒
  this.type = type;
  this.paragraphArray = paragraphArray;
}

// pages/play.js
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
    msgList.push(new dWord('我是一个乖孩子', '#fff', 20, 'bounceInRight'));
    msgList.push(new dWord('好好学习', '#fff', 100, 'bounceInUp'));
    msgList.push(new dWord('天天向上', '#fff', 50, 'zoomIn'));
    msgList.push(new dWord('妈妈对我说', '#fff', 20, 'flipInX'));
    //msgList.push(new dWord('你独自去广东工作', '#fff', 30, 'flipInX'));
    //msgList.push(new dWord('到自己创业', '#fff', 100, 'flipInX'));
    //msgList.push(new dWord('经历了很多的坎坷', '#fff', 20, 'flipInX'));
    //msgList.push(new dWord('', '', 20, '', 0));
    //msgList.push(new dWord('经历了很多的坎坷', '#fff', 20, 'flipInX'));

    audioList.push('http://test.party-time.cn/voice/guahaizi.mp3');
    audioList.push('http://test.party-time.cn/voice/haohao.mp3');
    audioList.push('http://test.party-time.cn/voice/mamaduiwoshuo.mp3');
    audioList.push('http://test.party-time.cn/voice/mingtiannadiyi.mp3');
    audioList.push('http://test.party-time.cn/voice/yiwankuai.mp3');
    let father = this;
    audioCtx.autoplay = true;
    

    audioCtx.onPlay(() => {
      console.log('开始播放')
    })
    audioCtx.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    audioCtx.onEnded(() => {
      if (audioList.length>0){
        audioCtx.src = audioList.shift();
        drawDWord(father);
      }
      console.log('播放结束')
    })

    drawDWord(father);
    setTimeout(function () {
      father.setData({
        content: pvList
      })
      audioCtx.src = audioList.shift();
    }, 1000);
  
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



var drawDWord = function (father) {
  var dWord = msgList.shift();
  //当无法取得弹幕对象 就退出
  if (null == dWord) {
    return;
  }
  ++msgCount;
  if (msgCount==1){
    var tempList = new Array();
    dWord.marginTop='200px';
    tempList.push(dWord);
    var pv = new pageView(tempList, 0);
    pvList.push(pv);
  }else{
    if(dWord.type==0){

    }else if(dWord.type==1){

    }else{
      dWord.marginTop = '20px';
      pvList[pvList.length - 1].paragraphArray.push(dWord);
      father.setData({
        content: pvList
      })
    }
  }
  
  
  
}

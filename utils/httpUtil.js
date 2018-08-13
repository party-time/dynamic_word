

var post = function (url, method, data, success, fail, complete) {
  wx.request({
    url: url,
    data: data,
    method: method,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    dataType: "json",
    success: success,
    fail: fail,
    complete: complete
  })
};



var httpRequest = function (url, method, data, header, success, fail, complete) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: header,
      dataType:"json",
      success: success,
      fail: fail,
      complete: complete
    })
};

module.exports = {  
  httpRequest: httpRequest,
  post:post
}
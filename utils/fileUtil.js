var setFileToLocal = function (key, data, success, fail, complete){
  wx.setStorage({
    key: key,
    data:data,
    success: success,
    fail: fail,
    complete: complete
  })
}

var setFileToLocalSync=function(key,data){
  wx.setStorageSync(key,data);
}

var getLocalDataSync =function(key){
  return wx.getStorageSync(key);
}

var getLocalData = function(key,success,fail){
  wx.getStorage({
    key: key,
    success:success,
    fail:fail
  })
}

var removeLocalData = function (key, success, fail){
  wx.removeStorage({
    key: key,
    success: success,
    fail: fail
  })
}

var removeLocalDataSync = function (key) {
  wx.removeStorageSync(key);
}



module.exports = {  
  setFileToLocal: setFileToLocal,
  setFileToLocalSync: setFileToLocalSync,
  getLocalDataSync: getLocalDataSync,
  getLocalData: getLocalData,
  removeLocalData: removeLocalData,
  removeLocalDataSync: removeLocalDataSync
}
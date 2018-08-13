

var  lodingShow = function(that){
  that.setData({logdingShow: true});
}


var lodingHide = function (that) {
  that.setData({ logdingShow: false });
}


module.exports = {
  lodingShow: lodingShow,
  lodingHide: lodingHide
}
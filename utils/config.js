
module.exports = {
  mpConfig: {
    "domain": "https://www.party-time.cn",
    "indexUrlConfig":{
      "findPartyInfoUrl":"/v1/api/wechatMini/findPartyInfo",
      "sendDanmuUrl": "/v1/api/wechatMini/wechartSend",
      "sendExpressUrl": "/v1/api/wechatMini/sendExpression",
      "loginUrl":"/v1/api/wechatMini/login",
      "updateWechatUser":"/v1/api/wechatMini/updateWechatUser",
      "findAddressList":"/v1/api/wechatMini/findAddressList",
      "findPartyInfoByLocation": "/v1/api/wechatMini/findPartyInfoByLocation",
      "dashangUrl": "/v1/api/wechatMini/wxBingPay",
    }
  }
}
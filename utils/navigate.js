
function navigateToPage(page){
    console.log(page);
    wx.navigateTo({
      url: '../'+page+'/'+page
    })
}

function navigateToPageWithParam(page,paramArray) {
  console.log(page);
  var temUrl = '../' + page + '/' + page+'?';
  if (paramArray != null && paramArray.length>0){
    for (var i = 0; i < paramArray.length; i++){
        var object = paramArray[i];
        if (i == paramArray.length-1){
          temUrl = temUrl + object.name + "=" + object.data;
        }else{
          temUrl = temUrl + object.name + "=" + object.data +"&";
        }
        
    }
  }
  console.log(temUrl);
  wx.navigateTo({
    url: temUrl
  })
}

function navigateToDirectoryPageWithParam(pageDirectory, page, paramArray) {
  console.log(page);
  wx.navigateTo({
    url: '../' + pageDirectory + '/' + page
  })
}

module.exports = {
    navigateToPage:navigateToPage,
    navigateToPageWithParam: navigateToPageWithParam
}
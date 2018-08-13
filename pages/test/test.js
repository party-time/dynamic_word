var app = getApp();
var x, y, x1, y1, x2, y2, index, currindex, n, yy;
var array = [];
var bmove = false;
Page({
  data: {
    mainx: 0,
    content: [],
    start: { x: 0, y: 0 }
  },
  onLoad: function () {
    array = [
      { content: 11, id: 1 },
      { content: 22, id: 2 },
      { content: 33, id: 3 },
      { content: 44, id: 4 },
      { content: 55, id: 5 }];

    this.setData({
      content:array
    })
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
      console.log('move x2:'+x2)

      if(x2<9){
        x2=7;
      }
    if (x2 > 9) {
      x2 = 7;
    }

    y2 = e.touches[0].clientY - y + y1;

    if(y2 <-5){
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
      this.setData({mainx: "",content: arr,opacity: 1});
      bmove = false;
    }
  }
})
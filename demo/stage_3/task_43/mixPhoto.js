/**
* 以下为封装好的拼图布局相册JavaScript库，通过mixPhoto来调用
* 可以使用的方法包括
* init初始化相册布局
* setUrl更换图片
* display改变相册布局
*/

var mixPhoto = {
  /**
  * 设置显示方式
  */

  display: function(number) {
    // 获取所需的图片元素
    var img_1 = document.getElementById('img_1');
    var img_2 = document.getElementById('img_2');
    var img_3 = document.getElementById('img_3');
    var img_4 = document.getElementById('img_4');
    var img_5 = document.getElementById('img_5');
    var img_6 = document.getElementById('img_6');
    // 私有函数，用于设置图片的属性
    function setSize(ele, hidden, clip, width, height, float, position) {
      ele.style.width = width;
      ele.style.height = height;
      ele.style.float = float;
      ele.style.position = position;
      ele.style.display = 'block';
      ele.style.webkitClipPath = 'none';
      ele.style.clipPath = 'none';
      ele.style.overflow = 'hidden';
      if (hidden) {
        ele.style.display = 'none';
      }
      if (clip) {
        ele.style.webkitClipPath = 'polygon(0 0, 66.6% 0, 33.3% 100%, 0% 100%)';
        ele.style.clipPath = 'polygon(0 0, 66.6% 0, 33.3% 100%, 0% 100%)';
      }
    }
    // 根据传入参数不同对图片进行不同的摆放
    switch (number) {
      case 'photo_one':
        setSize(img_1, false, false, '100%', '100%', 'none', 'absolute');
        setSize(img_2, true, false);
        setSize(img_3, true, false);
        setSize(img_4, true, false);
        setSize(img_5, true, false);
        setSize(img_6, true, false);
        break;
      case 'photo_two':
        setSize(img_1, false, true, '100%', '100%', 'none', 'absolute');
        setSize(img_2, false, false, '100%', '100%', 'none');
        setSize(img_3, true, false);
        setSize(img_4, true, false);
        setSize(img_5, true, false);
        setSize(img_6, true, false);
        break;
      case 'photo_three':
        setSize(img_1, false, false, '66.6%', '100%', 'left', 'static');
        setSize(img_2, false, false, '33.4%', '50%','left');
        setSize(img_3, false, false, '33.4%', '50%','left');
        setSize(img_4, true, false);
        setSize(img_5, true, false);
        setSize(img_6, true, false);
        break;
      case 'photo_four':
        setSize(img_1, false, false, '50%', '50%', 'left', 'static');
        setSize(img_2, false, false, '50%', '50%', 'left');
        setSize(img_3, false, false, '50%', '50%', 'right');
        setSize(img_4, false, false, '50%', '50%', 'right');
        setSize(img_5, true, false);
        setSize(img_6, true, false);
        break;
      case 'photo_five':
        setSize(img_1, false, false, '66.6%', '66.6%', 'left', 'static');
        setSize(img_2, false, false, '33.3%', '33.3%', 'left');
        setSize(img_3, false, false, '33.4%', '66.7%', 'right');
        setSize(img_4, false, false, '33.3%', '33.4%', 'right');
        setSize(img_5, false, false, '33.3%', '33.4%', 'right');
        setSize(img_6, true, false);
        break;
      case 'photo_six':
        setSize(img_1, false, false, '66.66%', '66.66%' ,'left', 'static');
        setSize(img_2, false, false, '33.33%', '33.33%', 'left');
        setSize(img_3, false, false, '33.33%', '33.33%', 'left');
        setSize(img_4, false, false, '33.33%', '33.33%', 'right');
        setSize(img_5, false, false, '33.33%', '33.33%', 'right');
        setSize(img_6, false, false, '33.33%', '33.33%', 'right');
        break;
      default:
        return ;
    }
  },
  /**
  * 设置照片的url
  */

  setUrl: function(ele, url) {
      ele.style.backgroundSize = 'cover';
      ele.style.backgroundImage = 'url(' + url + ')';
  },
  /**
  * 初始化相册布局，默认六张图片
  * 默认显示图片的div的id为img_1到img_6
  * 默认相册读取的图片来自img中的img_1.jpg到img_6.jpg
  * 默认相册绝对定位
  * 默认切换布局的参数为photo_one到photo_six
  */

  init: function(number, width, height, imgUrl, album) {
    var container = document.getElementsByClassName(album)[0];
    for (var i = 1; i <= 6; i++) {
      var div = document.createElement('div');
      var divImg = document.createElement('div');
      var url = imgUrl[i-1];
      div.id = 'img_' + i;
      this.setUrl(divImg, url);
      divImg.style.height = '100%';
      divImg.style.width = '100%';
      div.appendChild(divImg);
      container.appendChild(div);
    }
    container.style.width = width;
    container.style.height = height;
    container.style.position = 'absolute';
    this.display(number);
  }
}

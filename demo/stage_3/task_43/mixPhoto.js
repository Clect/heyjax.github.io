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

  display: function(number, album) {
    // 获取所需的图片元素
    var img_1 = document.getElementById((album + 'img_1'));
    var img_2 = document.getElementById((album + 'img_2'));
    var img_3 = document.getElementById((album + 'img_3'));
    var img_4 = document.getElementById((album + 'img_4'));
    var img_5 = document.getElementById((album + 'img_5'));
    var img_6 = document.getElementById((album + 'img_6'));
    var container = document.getElementsByClassName(album)[0];
    var containerWidth = window.getComputedStyle(container).getPropertyValue('width').slice(0,-2);
    var containerHeight = window.getComputedStyle(container).getPropertyValue('height').slice(0,-2);
    // 私有函数，用于设置图片的属性
    function setSize(ele, hidden, clip, width, height, float, position) {
      ele.style.width = width;
      ele.style.height = height;
      ele.style.float = float;
      ele.style.position = position;
      ele.style.display = 'block';
      ele.style.webkitClipPath = 'none';
      ele.style.clipPath = 'none';
      ele.style.webkitClipPath = 'none';
      ele.style.overflow = 'hidden';
      ele.firstChild.firstChild.style.textAlign = 'left';
      if (hidden) {
        ele.style.display = 'none';
      }
      if (clip) {
        ele.style.webkitClipPath = 'polygon(66.6% 0, 100% 0, 100% 100%, 33.3% 100%)';
        ele.style.clipPath = 'polygon(66.6% 0, 100% 0, 100% 100%, 33.3% 100%)';
        ele.firstChild.firstChild.style.textAlign = 'right';
      }
    }
    // 设置不同场景下的正方形
    function setSquare(number, ele, width, height) {
      switch (number) {
        case 'photo_three':
          ele.style.height = (containerHeight * height) + 'px';
          ele.style.width = window.getComputedStyle(ele).getPropertyValue('height');
          break;
        case 'photo_five':
          ele.style.height = window.getComputedStyle(ele).getPropertyValue('width');
          break;
        default:

      }
    }
    // 修复由于正方形造成的空白
    function fixSquare(number) {
      switch (number) {
        case 'photo_three':
          var img_2Width = window.getComputedStyle(img_2).getPropertyValue('width').slice(0,-2);
          img_1.style.width = (containerWidth - img_2Width) + 'px';
          break;
        case 'photo_five':
          var img_1Height = window.getComputedStyle(img_1).getPropertyValue('height').slice(0,-2);
          var img_2Height = window.getComputedStyle(img_2).getPropertyValue('height').slice(0,-2);
          img_3.style.height = (containerHeight - img_2Height) + 'px';
          if (parseInt(img_2Height) > parseInt(img_1Height)){
            img_1.style.height = img_2Height + 'px';
          }
          break;
        default:
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
        setSize(img_1, false, false, '100%', '100%', 'none', 'absolute');
        setSize(img_2, false, true, '100%', '100%', 'none');
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
        setSquare('photo_three', img_2, 0.5, 0.5);
        setSquare('photo_three', img_3, 0.5, 0.5);
        fixSquare('photo_three');
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
        setSize(img_2, false, false, '33.3%', '66.6%', 'left');
        setSize(img_3, false, false, '33.4%', '33.4%', 'right');
        setSize(img_4, false, false, '33.3%', '33.4%', 'right');
        setSize(img_5, false, false, '33.3%', '33.4%', 'right');
        setSize(img_6, true, false);
        setSquare('photo_five', img_2, 0.33, 0.33);
        fixSquare('photo_five');
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
  * 设置图片的url
  */

  setUrl: function(ele, url, content) {
      ele.style.backgroundSize = 'cover';
      ele.style.backgroundImage = 'url(' + url + ')';
      ele.firstChild.textContent = content;
  },
  /**
  * 初始化相册布局，默认六张图片
  * 默认显示图片的div的id为输出框类名加img_1到img_6
  * 默认相册读取的图片来自img中的img_1.jpg到img_6.jpg
  * 默认相册绝对定位
  * 默认切换布局的参数为photo_one到photo_six
  */

  init: function(number, imgData, album) {
    var container = document.getElementsByClassName(album)[0];
    for (var i = 1; i <= 6; i++) {
      var div = document.createElement('div');
      var divImg = document.createElement('div');
      var divDetail = document.createElement('div');
      var url = imgData[i-1][0];
      var content = imgData[i-1][1];
      div.id = album + 'img_' + i;
      divImg.style.height = '100%';
      divImg.style.width = '100%';
      divDetail.style.height = '20%';
      divDetail.style.width = '100%';
      divImg.appendChild(divDetail);
      div.appendChild(divImg);
      this.setUrl(divImg, url, content);
      container.appendChild(div);
    }
    this.display(number, album);
  }
}

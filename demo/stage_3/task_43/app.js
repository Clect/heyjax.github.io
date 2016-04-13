/**
* pop函数做一个弹窗接受url
*/
function pop() {
  var number = document.getElementById('number');
  var url = document.getElementById('url');
  var confirm = document.getElementById('urlConfirm');
  var cancel = document.getElementById('urlCancel');
  var popDiv = document.getElementsByClassName('pop')[0];
  popDiv.style.display = 'block';
  confirm.addEventListener('click', function() {
    mixPhoto.setUrl(document.getElementById(number.value).firstChild, url.value, content.value);
    popDiv.style.display = 'none';
  }, false)
  cancel.addEventListener('click', function() {
    popDiv.style.display = 'none'
  }, false)
}

/**
* 初始化所有事件
*/
function eventInit() {
  var currentState;
  var button = document.getElementsByClassName('button')[0];
  var container = document.getElementsByClassName('mixPhotoContainer')[0];
  button.addEventListener('click', function(event) {
    if (event.target.id === 'setUrl') {
      pop();
    }
    mixPhoto.display(event.target.id, 'mixPhotoContainer');
    currentState = event.target.id;
  }, false)
  window.addEventListener('resize', function(event) {
    if (currentState === 'photo_three' || currentState === 'photo_five') {
      mixPhoto.display(currentState, 'mixPhotoContainer');
    }
  }, false)
}

function init() {
  /**
  * 初始化相册
  * 参数：初始化照片布局，图片url，相册类名
  */
  var imgData = [
    ['img/img_1.jpg','The descrioption of img1'],
    ['img/img_2.jpg','The descrioption of img2'],
    ['img/img_3.jpg','The descrioption of img3'],
    ['img/img_4.jpg','The descrioption of img4'],
    ['img/img_5.jpg','The descrioption of img5'],
    ['img/img_6.jpg','The descrioption of img6']
    ]
  mixPhoto.init('photo_six', imgData, 'mixPhotoContainer');
  eventInit();
}

init();

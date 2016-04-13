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
    mixPhoto.setUrl(document.getElementById(number.value).firstChild, url.value);
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
  var button = document.getElementsByClassName('button')[0];
  button.addEventListener('click',function(event) {
    if (event.target.id === 'setUrl') {
      pop();
    }
    mixPhoto.display(event.target.id);
  }, false)
}

function init() {
  /**
  * 初始化相册
  * 参数：初始化照片布局，图片url，相册类名
  */
  var imgData = [
    'img/img_1.jpg',
    'img/img_2.jpg',
    'img/img_3.jpg',
    'img/img_4.jpg',
    'img/img_5.jpg',
    'img/img_6.jpg'
    ]
  mixPhoto.init('photo_six', imgData, 'mixPhotoContainer');
  eventInit();
}



init();

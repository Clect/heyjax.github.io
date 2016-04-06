/**
* 面向对象简单工厂模式
* 创建一个可复用的对象给tag以及hobby
*/
var createTag = (function() {
  // 创建类
  function _tag(input,output) {
    // 私有变量
    var number;
    // 特权方法
    this.getNumber = function() {
      return number;
    }
    this.setNumber = function(newNumber) {
      number = newNumber;
    }
    // 公有属性
    this.input = document.getElementById(input);
    this.output = document.getElementsByClassName(output)[0];
    // 公有方法
    this.getData = function() {
      if (input === 'tag') {
        var value = this.input.value.match(/(^[^,\， ]*)/)[0];
        return value;
      }
      else if (input === 'hobby') {
        var value = this.input.value.trim().split(/,|，|、|\s|\n|\r|\t/);
        return value;
      }
    }
    this.render = function(value) {
      if (value === '' || value === ',' || value === '，') {
        return ;
      }
      var wrap = document.createElement('div');
      wrap.textContent = value;
      this.output.appendChild(wrap);
      number ++;
    }
    // 构造器
    this.setNumber(0);
  }
  // 构造原型，相同方法放一起
  _tag.prototype = {
    // 检测输入数据是否有重复
    repeatData: function(data) {
      for (var i = 0; i < this.output.children.length; i++) {
        if (this.output.children[i].textContent.localeCompare(data) === 0) {
          this.input.value = '';
          this.setNumber(this.output.children.length);
          return true;
        }
      }
    },
    // 删除特定的数据
    delData: function(ele) {
      this.output.removeChild(ele);
      this.setNumber(this.output.children.length);
    }
  }
  // 返回类
  return _tag;
})();

/**
* 实例化tag和hobby
*/
var tag = new createTag('tag','tagContainer');
var hobby = new createTag('hobby','hobbyContainer');
var button = document.getElementById('confirm');

/**
* 绑定所有事件
*/
function init() {
  document.addEventListener('keyup',function(event) {
    if (/(,| |\，)$/.test(tag.input.value) || event.keyCode===13) {
      tag.repeatData(tag.getData().trim()) || tag.render(tag.getData().trim());
      tag.input.value = '';
      if (tag.getNumber() > 10) {
        tag.delData(tag.output.firstChild);
      }
    }
  })
  tag.output.addEventListener('mouseover',function(event) {
    event.target.textContent = '删除：' + event.target.textContent;
  })
  tag.output.addEventListener('mouseout',function(event) {
    event.target.textContent = event.target.textContent.replace(/删除：/,'');
  })
  tag.output.addEventListener('click', function(event) {
    tag.delData(event.target);
  })
  button.addEventListener('click',function() {
    for (var i = 0; i < hobby.getData().length; i++) {
      hobby.repeatData(hobby.getData()[i]) || hobby.render(hobby.getData()[i]);
      if (hobby.getNumber() > 10) {
        hobby.delData(hobby.output.firstChild);
      }
    }
    hobby.input.value = '';
  })
}

init();

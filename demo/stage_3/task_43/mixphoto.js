;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root['Mixphoto'] = factory();
  }
}(this, function() {

  'use strict';

  /**
    * @param {Object} opts - options used in plugin
    * @constructor
    */

  var Mixphoto = function(opts) {

    var opts = opts || {};
    var containerSelector = opts.containerSelector || '.mixphotoContainer';
    var boxSelector = opts.boxSelector || '.mixphotoBox';
    var boxes = document.querySelector(containerSelector).querySelectorAll(boxSelector);

    this.container = document.querySelector(containerSelector);

    // if we need a square for the number 2 images when the length is 3 or 5, then we add a method for them
    if (boxes.length === 3) {
      this.setSquare = function() {
        var sideLength = parseInt(this.container.clientHeight) / 2
        boxes[0].style.width = (this.container.clientWidth - sideLength) + 'px';
        boxes[1].style.height = sideLength + 'px';
        boxes[1].style.width = sideLength + 'px';
        boxes[2].style.height = sideLength + 'px';
        boxes[2].style.width = sideLength + 'px';
      }
    } else if (boxes.length === 5) {
      this.setSquare = function() {
        var sideLength = parseInt(this.container.clientWidth / 3);
        boxes[0].style.width = parseInt(this.container.clientWidth - sideLength) + 'px';
        boxes[1].style.width = sideLength + 'px';
        boxes[1].style.height = sideLength + 'px';
        boxes[2].style.width = sideLength + 'px';
        boxes[2].style.height = parseInt(this.container.clientHeight - sideLength) + 'px';
      }
    }

    // init the mixphoto
    this.init(boxes.length);
    if (this.setSquare) this.setSquare()
  }

  Mixphoto.prototype = {

    /**
      * @desc swtich the different display with css and className according the number
      * @param {Number} imageNum
      */

    init: function(imageNum) {
      this.container.className += ' mixphoto-' + imageNum;
    }

  }

  return Mixphoto;
}));

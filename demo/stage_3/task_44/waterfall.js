/**
  *
  * Waterfall v0.0.1
  * Description, by StevenYu.
  *
  */

;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root['Waterfall'] = factory();
  }
}(this, function() {

  'use strict';

  /**
    * @param {Object} opts - options used in plugin
    * @constructor
    */

  var Waterfall = function(opts) {

    var opts = opts || {};
    var containerSelector = opts.containerSelector || 'waterfallContainer';
    var boxSelector = opts.boxSelector || 'waterfallBox';
    this.column = opts.column || 1;
    this.container = document.querySelector(containerSelector);
    this.boxes = this.container ? Array.prototype.slice.call(this.container.querySelectorAll(boxSelector)) : [];
    // init waterfall
    this.compose();
    // make box in order due to the first init the first column has the highest height
    setTimeout(this.compose(true),500);
  }

  /**
    * @desc Plugin prototype definition.
    */

  Waterfall.prototype = {

    /**
      * @desc init columns
      * @param {Number} columnNum - the numbers of the column
      */

    initColumn: function(columnNum) {
      // create column div
      this.columns = [];
      for (var i = 0; i < columnNum; i++) {
        var columnDiv = document.createElement('div');
        columnDiv.style.width = (100/columnNum) + '%';
        columnDiv.style.padding = parseFloat(columnGutter.slice(0, -2) / 2, 2) + 'px';
        columnDiv.setAttribute('class','wf-column');
        this.columns.push(columnDiv);
        this.container.appendChild(columnDiv);
      }
    },

    /**
      * @desc get the indx of shortest column
      * @return {Number} index
      */

    getMinHeightIndex: function() {
      var min = this.columns[0].clientHeight;
      var index = 0;
      for (var i = 0; i < this.columns.length; i++) {
        if (this.columns[i].clientHeight < min) {
          min = this.columns[i].clientHeight;
          index = i;
        }
      }
      return index;
    },

    /**
      * @desc init columns and add boxes
      * @param {Boolean} choose whether to remove the old columns
      */

    compose: function(force) {
      // remove old columns
      if (force) {
        for (var i = 0; i < this.columns.length; i++) {
          this.columns[i].remove();
        }
      }
      // init new column
      this.initColumn(this.column);
      // compose
      for (var i = 0, l = this.boxes.length; i < l; i++) {
          var box = this.boxes[i];
          this.addBox(box);
        }
    },

    /**
      * @desc compose all boxs in column
      * @param - the element which add in the box
      */

    addBox: function(ele) {
        var index = this.getMinHeightIndex();
        var column = this.columns[index];
        column.appendChild(ele);
    }
  }

  return Waterfall;
}));

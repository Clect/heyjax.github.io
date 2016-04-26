/**
 *
 * pxgallery v0.0.1
 * Description, by StevenYu.
 * @desc use with pxgallery.css
 * @author StevenYu
 */

;(function (root, factory) {
  
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.pxgallery = factory();
  }
  
}(this, function() {

  'use strict';

  /**
   * @param {Object} opts - options used in plugin
   * @constructor
   */

  var pxgallery = function(opts) {

    
    opts = opts || {};
    var fullscreenSelector = opts.fullscreenSelector || '.pxfullscreen'; 
    
    this.containerSelector = opts.containerSelector || '.pxgalleryContainer';
    this.boxSelector = opts.boxSelector || '.pxgalleryBox'; 
    this.container = document.querySelector(this.containerSelector);
    this.fullscreen = document.querySelector(fullscreenSelector);
    
    this.layout = {
      NONE: 0,      // no layout
      PUZZLE: 1,    // puzzle layout
      WATERFALL: 2, // waterfall layout
      BARREL: 3     // barrel layout
    };
 
  };
  
  /** 
   * @private 
   */
  
   var _layout;
   var _column;
   var _gutter;
   var _fullscreenState;
   // create a fullscreen for images
   var _createFullscreen = function(event) {
     var div = document.createElement('div');
     var img = document.createElement('img');
     div.className = 'pxfullscreen';
     img.setAttribute('src', event.target.getAttribute('src'));
     div.addEventListener('click', function() {
       this.remove();
     }, false)
     div.appendChild(img);
     this.parentNode.appendChild(div);
   };
   // add the box into column or row
   var _addBox = function(_this, ele, container, index) {
    var container = (container === 'columns') ? _this.columns : _this.rows;
    container[index].appendChild(ele);
  }
   
   
  /**
   * @desc init the album
   * It will replace the photos
   * @param {(stirng | string[])} image - the URL of the photo or the URL array of the photos
   * @param {object} opts - layout options
   */

  pxgallery.prototype.setImage = function(image, opts) {
    
    if (typeof image === 'string') {
      this.setImage([image]);
      return;
    }
    
    _layout = opts.layout || 2; 
    _fullscreenState = opts.fullscreenState || false;
    _column = opts.column || 3;
    var _this = this;

    this.addImage(image);
    this.setLayout(_layout)
    
    if (_fullscreenState) {
      this.enableFullscreen();
    } else {
      this.disableFullscreen();
    }
    if (_layout === 3) {
      window.onload = function() {
        _this.setLayout(_layout);
      }  
    }
  };
  
  /**
   * @desc get the DOM elements which contain the images
   * @return {HTMLelement[]} boxes   
   */
  
  pxgallery.prototype.getImageDomElements = function() {
    
    var boxes = Array.prototype.slice.call(this.container.querySelectorAll(this.boxSelector));
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].ratio = boxes[i].clientWidth / boxes[i].clientHeight;
    }
    return boxes;
  };
  
  /**
   * @desc add images to the container
   * @param {(string | string[])} image - the URL of the photo or the URL array of the photos
   */
  
  pxgallery.prototype.addImage = function(image) {
        
    if (typeof image === 'string') {
      this.setImage([image]);
      return;
    }
    
    if (_layout === 1 || _layout === 3 ) {
      var html = '';
      for (var i = 0; i < image.length; i++) { 
        var imageHtml = '<div class="pxgalleryBox"><img src=' + image[i] + '></div>';
        html += imageHtml;
      }
      this.container.innerHTML += html;
      // this.setLayout(1);
    } 
    
    if (_layout === 2) {
      for (var i = 0; i < image.length; i++) {
        var div = document.createElement('div');
        var img = document.createElement('img');
        div.className = 'pxgalleryBox';
        img.setAttribute('src', image[i]);
        div.appendChild(img);
        _addBox(this, div, 'columns', this.getWaterfallHeightMin());
      }
    }
  };
  
  /**
   * @desc remove the images
   * @param {(HTMLelement|HTMLelement[])} image - the images that need to be removed
   */
  
  pxgallery.prototype.removeImage = function(image) {
    
    image.remove();
    
  };
  
  /**
   * @desc set the layout
   * @param {number}
   */
  
  pxgallery.prototype.setLayout = function(layoutValue) {
    
    var boxes = this.getImageDomElements(); 
    this.clearLayout();
    _layout = layoutValue;
    
    switch (layoutValue) {
      
      case 0:
      break;
      
      case 1:
      if (boxes.length > 6) {
        console.error('PUZZLE layout only can contain 6 photos'); 
        break;
      } 
      this.container.className = this.containerSelector.slice(1) + ' puzzle-' + boxes.length;
      this.setPuzzleSquare(boxes.length);
      break;
        
      case 2:
      this.container.className = this.containerSelector.slice(1) + ' waterfall';
      this.initWaterfallColumn(_column);
      for (var i = 0; i < boxes.length; i++) {
        _addBox(this, boxes[i], 'columns', this.getWaterfallHeightMin());
      }   
      break;
      
      case 3:
      this.container.className = this.containerSelector.slice(1) + ' barrel';
      var rows = this.calcBarrelBin(3, 6);
      this.initBarrelBin(rows);
      var index = 0;
      for (var i = 0; i < boxes.length; i++) {
        if (i > rows[index].number) index ++;
        boxes[i].style.height = '100%';
        boxes[i].style.width = '';
        _addBox(this, boxes[i], 'rows', index);
      }
      break;
    }
  };
  
  pxgallery.prototype.getLayout = function() {
    return _layout;
  }
  
  pxgallery.prototype.clearLayout = function() {
    
    var boxes = this.getImageDomElements();
    this.container.className = this.containerSelector.slice(1);

    for (var i = 0; i < boxes.length; i++) {
      boxes[i].style.width = '';
      boxes[i].style.height = '';
    }  
    if (this.columns) {
      for (var i = 0; i < this.columns.length; i++) {
        this.columns[i].remove();
      }
      for (var j = 0; j < boxes.length; j++) {
        this.container.appendChild(boxes[j]);
      }  
    }
    
    if (this.rows) {
      for (var i = 0; i < this.rows.length; i++) {
        this.rows[i].remove();
      }
      for (var j = 0; j < boxes.length; j++) {
        this.container.appendChild(boxes[j]);
      }  
    }
    _layout = 0; 
  }
  
  pxgallery.prototype.setGutter = function() {
    
  };
  
  pxgallery.prototype.enableFullscreen = function() {
    _fullscreenState = true;
    this.container.addEventListener('click', _createFullscreen, false);
  };
  
  pxgallery.prototype.disableFullscreen = function() {
    _fullscreenState = false;
    this.container.removeEventListener('click', _createFullscreen, false);
  };
  
  /**
   * @return {boolean} weather eenable fullscreen view
   */
  
  pxgallery.prototype.isFullscreenEnabled = function() {
    return _fullscreenState;
  };
  
  /**
   * @desc set the 2nd image square
   * @param {number} length -the number of the images
   */
  
  pxgallery.prototype.setPuzzleSquare = function(length) {
    
    var boxes = this.getImageDomElements();
    if (length === 3) {
      var sideLength = parseFloat(this.container.clientHeight) / 2;
      boxes[0].style.width = (this.container.clientWidth - sideLength) + 'px';
      boxes[1].style.height = sideLength + 'px';
      boxes[1].style.width = sideLength + 'px';
      boxes[2].style.height = sideLength + 'px';
      boxes[2].style.width = sideLength + 'px';
    } else if (length === 5) {
      var sideLength = parseFloat(this.container.clientWidth / 3);
      boxes[0].style.width = parseFloat(this.container.clientWidth - sideLength) + 'px';
      boxes[1].style.width = sideLength + 'px';
      boxes[1].style.height = sideLength + 'px';
      boxes[2].style.width = sideLength + 'px';
      boxes[2].style.height = parseFloat(this.container.clientHeight - sideLength) + 'px';
    } else {
      return;
    }
  }
  
  pxgallery.prototype.setColumnNum = function(columnNum) {
    _column = columnNum;
    this.setLayout(2);
  }
  
  pxgallery.prototype.initWaterfallColumn = function(columnNum) {
    // create column div
    this.columns = [];
    for (var i = 0; i < columnNum; i++) {
      var columnDiv = document.createElement('div');
      columnDiv.style.width = (100/columnNum) + '%';
      columnDiv.setAttribute('class','waterfallColumn');
      this.columns.push(columnDiv);
      this.container.appendChild(columnDiv);
    }
  };
  
  pxgallery.prototype.getWaterfallHeightMin = function() {
    
    var min = this.columns[0].clientHeight;
    var index = 0;
    for (var i = 0; i < this.columns.length; i++) {
      if (this.columns[i].clientHeight < min) {
        min = this.columns[i].clientHeight;
        index = i;
      }
    }
    return index;
  };
  
  pxgallery.prototype.initBarrelBin = function(row) {
    
    this.rows = [];
    for (var i = 0; i < row.length; i++) {
      var rowDiv = document.createElement('div');
      rowDiv.className = 'rowphotoRow';
      rowDiv.style.height = row[i].height + 'px';
      this.rows.push(rowDiv);
      this.container.appendChild(rowDiv);
    }
  }
  
  pxgallery.prototype.calcBarrelBin = function(min, max) {
    
    var boxes = this.getImageDomElements();
    var height = 200;
    var rows = [];
    var width = 0;
    var count = 0; 
    var ratio;
    var totalWidth;
    var totalHeight;
    var i;
    
    // compare the total width with the container width
    // if the total width is grater than container width
    // than push to the row array which include the number and height
    // clear data and loop again until end
    for (i = 0; i < boxes.length; i++) {
      boxes[i].style.height = height + 'px';
      boxes[i].style.width = (height * boxes[i].ratio) + 'px';
      width += height * boxes[i].ratio;
      count ++;
      if ((width > this.container.clientWidth && count > min) || count > max) {
        totalWidth = width - boxes[i].clientWidth;
        ratio = height / totalWidth;
        totalHeight = this.container.clientWidth * ratio;
        rows.push({number: i-1, height: totalHeight});
        width = boxes[i].clientWidth;
        count = 1;
      }
    }
    rows.push({number: i, height: 200});

    return rows;

  }
  
  pxgallery.prototype.setBarrelBin = function(min, max) {
    
  };
  
  pxgallery.prototype.getBarrelBin = function() {
    
  };
  
  pxgallery.prototype.setBarrelHeight = function(min, max) {
    
  };  
  
  pxgallery.prototype.getBarrelHeightMax = function() {
    
  };
  
  pxgallery.prototype.getBarrelHeightMin = function() {
    
  };

  return pxgallery;
}));

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
      BARREL: 3,    // barrel layout
      SQUARE: 4     // square layout
    };
    
  };
  
  /** 
   * @private 
   */
   var _options = {
     layout : '',
     puzzleHeight:'',
     coulumn : '',
     binMax : '',
     binMin : '',
     heightMax : '',
     heightMin : '',
     gutter : '',
     fullscreenState : ''
   }   
   
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
   var _addBox = function(ele, index) {
    switch (_options.layout) {
      case 1:
      this.container.appendChild(ele);
      this.setLayout(1);
      break;
      case 2:
      this.columns[index].appendChild(ele);
      break;
      case 3:
      this.rows ? this.rows[index].appendChild(ele) : this.container.appendChild(ele);
      break;
    }
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
    
    _options.layout = opts.layout || 2; 
    _options.puzzleHeight = opts.puzzleHeight || 400;
    _options.fullscreenState = opts.fullscreenState || false;
    _options.column = opts.column || 3;
    _options.binMin = opts.binMin || 3;
    _options.binMax = opts.binMax || 6;
    _options.heightMin = opts.heightMin || 150;
    _options.heightMax = opts.heightMax || 300;
    var _this = this;
    
    this.setLayout(_options.layout);
    this.addImage(image);
    _options.fullscreenState ? this.enableFullscreen() : this.disableFullscreen();
    
    window.onload = function() {
      _this.setLayout(_options.layout);
    }
    
    window.onresize = function() {
      _this.setLayout(_options.layout);
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
      this.addImage([image]);
      return;
    }
    if (_options.layout === 2) var index = this.getWaterfallHeightMin();
    if (_options.layout === 3) var index = (this.rows.length - 1);
    
    for (var i = 0; i < image.length; i++) { 
      var div = document.createElement('div');
      var img = new Image();
      div.className = 'pxgalleryBox';
      img.src = image[i];
      div.appendChild(img);
      (_options.layout === 2 || _options.layout === 3 ) ? _addBox.call(this, div, index) : _addBox.apply(this, [div]);
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
    _options.layout = layoutValue;
    
    switch (layoutValue) {
      
      case 0:
      break;
      
      case 1:
      if (boxes.length > 6) {
        console.error('PUZZLE layout only can contain 6 photos'); 
        break;
      }
      this.container.style.height = _options.puzzleHeight + 'px'; 
      this.container.className = this.containerSelector.slice(1) + ' puzzle-' + boxes.length;
      this.setPuzzleSquare(boxes.length);
      break;
        
      case 2:
      this.container.className = this.containerSelector.slice(1) + ' waterfall';
      this.initWaterfallColumn(_options.column);
      for (var i = 0; i < boxes.length; i++) {
        _addBox.call(this, boxes[i], this.getWaterfallHeightMin());
      }   
      break;
      
      case 3:
      this.container.className = this.containerSelector.slice(1) + ' barrel';
      var rows = this.setBarrelBin();
      this.initBarrelBin(rows);
      var index = 0;
      for (var i = 0; i < boxes.length; i++) {
        if (i > rows[index].number) index ++;
        boxes[i].style.height = '100%';
        boxes[i].style.width = '';
        _addBox.call(this, boxes[i], index);
      }
      break;
    }
  };
  
  pxgallery.prototype.getLayout = function() {
    return _options.layout;
  };
  
  pxgallery.prototype.clearLayout = function() {
    
    var boxes = this.getImageDomElements();
    this.container.className = this.containerSelector.slice(1);
    this.container.style.height = '';
    
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
    _options.layout = 0; 
  };
  
  pxgallery.prototype.setGutter = function() {
    
  };
  
  pxgallery.prototype.enableFullscreen = function() {
    _options.fullscreenState = true;
    this.container.addEventListener('click', _createFullscreen, false);
  };
  
  pxgallery.prototype.disableFullscreen = function() {
    _options.fullscreenState = false;
    this.container.removeEventListener('click', _createFullscreen, false);
  };
  
  /**
   * @return {boolean} weather eenable fullscreen view
   */
  
  pxgallery.prototype.isFullscreenEnabled = function() {
    return _options.fullscreenState;
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
  };
  
  pxgallery.prototype.setColumnNum = function(columnNum) {
    _options.column = columnNum;
    if (_options.layout === 2) this.setLayout(2);
  };
  
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
      rowDiv.className = 'barrelRow';
      rowDiv.style.height = row[i].height + 'px';
      this.rows.push(rowDiv);
      this.container.appendChild(rowDiv);
    }
  };
  
  pxgallery.prototype.setBarrelBin = function(min, max) {
    
    var boxes = this.getImageDomElements();
    var height = _options.heightMin;
    var rows = [];
    var width = 0;
    var count = 0; 
    var ratio;
    var totalWidth;
    var totalHeight;
    var restWidth;
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
      if (width > this.container.clientWidth) {
        totalWidth = width - boxes[i].clientWidth;
        ratio = height / totalWidth;
        totalHeight = this.container.clientWidth * ratio;
        rows.push({number: i-1, height: totalHeight});
        width = boxes[i].clientWidth;
        count = 1;
      }
    }
    rows.push({number: i, height: _options.heightMin});

    return rows;

  };

  pxgallery.prototype.getBarrelBinMax = function() {
    return _options.binMax;
  };
  
  pxgallery.prototype.getBarrelBinMin = function() {
    return _options.binMin;
  };
  
  pxgallery.prototype.setBarrelHeight = function(min, max) {
    _options.heightMin = min;
    _options.heightMax = max;
    if (_options.layout === 3) this.setLayout(3);
  };  
  
  pxgallery.prototype.getBarrelHeightMax = function() {
    return _options.heightMax;
  };
  
  pxgallery.prototype.getBarrelHeightMin = function() {
    return _options.heightMin;
  };

  return pxgallery;
}));

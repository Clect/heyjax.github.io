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
    
    this.containerSelector = opts.containerSelector || '.pxgalleryContainer';
    this.boxSelector = opts.boxSelector || '.pxgalleryBox';  
    this.container = document.querySelector(this.containerSelector);
        
    this.layout = {
      PUZZLE: 1,    // puzzle layout
      WATERFALL: 2, // waterfall layout
      BARREL: 3     // barrel layout
    };
 
  };

  /**
   * @desc init the album
   * It will replace the photos
   * @param {(stirng | string[])} image - the URL of the photo or the URL array of the photos
   * @param {object} opts - layout options(require)
   */

  pxgallery.prototype.setImage = function(image, opts) {
    
    if (typeof image === 'string') {
      this.setImage([image]);
      return;
    }
    
    var layout = opts.layout; 
    this.addImage(image);
    console.log(layout);
    this.setLayout(layout);
  };
  
  /**
   * @desc get the DOM elements which contain the images
   * @return {HTMLelement[]} boxes   
   */
  
  pxgallery.prototype.getImageDomElements = function() {
    
    var boxes = Array.prototype.slice.call(this.container.querySelectorAll(this.boxSelector));
    return boxes;
  };
  
  /**
   * @desc add images to the container
   * @param {(string | string[])} image - the URL of the photo or the URL array of the photos
   */
  
  pxgallery.prototype.addImage = function(image) {
    
    var html = '';
    for (var i = 0; i < image.length; i++) { 
      var imageHtml = '<div class="pxgalleryBox"><img src=' + image[i] + '></div>';
      html += imageHtml;
    }
    this.container.innerHTML += html;
  };
  
  /**
   * @desc remove the images
   * @param {(HTMLelement|HTMLelement[])} image - the images that need to be removed
   */
  
  pxgallery.prototype.removeImage = function(image) {
    
    var boxes = this.getImageDomElements();
    boxes =  boxes.filter(function(item) {
      return image.indexOf(item) === -1;
    });
  };
  
  
  
  pxgallery.prototype.setLayout = function(layout) {
    
    var boxes = this.getImageDomElements(); 
      
    switch (layout) {
      
      case 'PUZZLE':
      this.container.className = this.containerSelector.slice(1) + ' puzzle-' + boxes.length;
      this.setPuzzleSquare(boxes.length);
      break;
        
      case 'WATERFALL':
      this.container.className = this.containerSelector.slice(1) + ' waterfall';
      this.setWaterfallColumn(3);
      for (var i = 0; i < boxes.length; i++) {
          var box = boxes[i];
          this.addBox(box, 'columns', this.getWaterfallHeightMin());
        }
      break;
      
      case 'BARREL':
      this.container.className = this.containerSelector.slice(1) + ' barrel';
      
      break;
    }
  };
  
  pxgallery.prototype.setGutter = function() {
    
  };
  
  pxgallery.prototype.enableFullscreen = function() {
    
  };
  
  pxgallery.prototype.disableFullscreen = function() {
    
  };
  
  pxgallery.prototype.isFullscreenEnabled = function() {
    
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
  
  pxgallery.prototype.setWaterfallColumn = function(columnNum) {
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
  
  pxgallery.prototype.addBox = function(ele, container, index) {
    
    var container = (container === 'columns') ? this.columns : this.rows;
    container[index].appendChild(ele);
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

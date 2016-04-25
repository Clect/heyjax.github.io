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
    var containerSelector = opts.containerSelector || '.pxgalleryContainer';
    
    this.boxSelector = opts.boxSelector || '.pxgalleryBox';  
    this.container = document.querySelector(containerSelector);
        
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
    
  };
  
  /**
   * @desc get the DOM elements which contain the images
   * @return {HTMLelement[]} boxes   
   */
  
  pxgallery.prototype.getImageDomElements = function() {
    var boxes = this.container.querySelectorAll(this.boxSelector);
    return boxes;
  };
  
  /**
   * @desc add images to the container
   * @param {(string | string[])} image - the URL of the photo or the URL array of the photos
   */
  
  pxgallery.prototype.addImage = function(image) {
    for (var i = 0; i < image.length; i++) {
      var imageHtml = '<div class="' + layout.toLowerCase() + 'box"><img src="' + image[i] + '"></div>';
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
    
  function setSquare () {
    var boxes = this.getImageDomElements();
    // if we need a square for the number 2 images when the length is 3 or 5, then we add a method for them
    if (boxes.length === 3) {
      this.setSquare = function() {
        var sideLength = parseFloat(this.container.clientHeight) / 2;
        boxes[0].style.width = (this.container.clientWidth - sideLength) + 'px';
        boxes[1].style.height = sideLength + 'px';
        boxes[1].style.width = sideLength + 'px';
        boxes[2].style.height = sideLength + 'px';
        boxes[2].style.width = sideLength + 'px';
      };
    } else if (boxes.length === 5) {
      this.setSquare = function() {
        var sideLength = parseFloat(this.container.clientWidth / 3);
        boxes[0].style.width = parseFloat(this.container.clientWidth - sideLength) + 'px';
        boxes[1].style.width = sideLength + 'px';
        boxes[1].style.height = sideLength + 'px';
        boxes[2].style.width = sideLength + 'px';
        boxes[2].style.height = parseFloat(this.container.clientHeight - sideLength) + 'px';
      };
    }
  }
    
    switch (layout) {
    case 'PUZZLE':
      this.container.className += 'puzzle-' + boxes.length;
      setSquare();
      break;
    case 'WATERFALL':
      this.container.className += 'waterfall';
      break;
    case 'BARREL':
      this.container.className += 'barrel';
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
  
  pxgallery.prototype.setBarrelBin = function() {
    
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

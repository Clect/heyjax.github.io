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
    var boxSelector = opts.boxSelector || '.pxgalleryBox';
    var boxes = document.querySelector(containerSelector).querySelectorAll(boxSelector);

    this.container = document.querySelector(containerSelector);
        
    this.LAYOUT = {
      PUZZLE: 1,    // puzzle layout
      WATERFALL: 2, // waterfall layout
      BARREL: 3     // barrel layout
    };

  
  };

  /**
    * @desc Plugin prototype definition.
    */

  pxgallery.prototype.setImage = function() {
    
  };
  
  pxgallery.prototype.getImageDomElements = function() {
    
  };
  
  pxgallery.prototype.addImage = function() {
    
  };
  
  pxgallery.prototype.removeImage = function() {
    
  };
  
  pxgallery.prototype.setLayout = function() {
    
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

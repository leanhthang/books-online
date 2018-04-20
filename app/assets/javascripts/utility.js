utilityLib = new function(){
  this.is_mobile = function(){
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  this.add3Dots = function(string, limit){
    var dots = "...";
    if(string.length > limit){
      string = string.substring(0,limit) + dots;
    }
    return string;
  }
  this.fullScreen = function(){
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
    }
    else {
      cancelFullScreen.call(doc);
    }
  }
  this.detectMsBrowser = function(){
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
      return true
    }
    return false
  }

  this.delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

  this.buildModalBox = function(box_selector, full_screen){
    full_screen = full_screen || false;
    _box = $(box_selector)
    if (full_screen == true){
      _box.height(window.innerHeight)
    }
    if(utilityLib.is_mobile()){
      _top = 0
    }else{
      _top = (window.innerHeight - _box.innerHeight())/2
    }
    _left = (window.innerWidth - _box.innerWidth())/2;
    _box.css({ top: _top, left: _left })
  }

  this.buildCenterBox = {
    show: function(box_selector, full_screen){
      $(box_selector).show()
      full_screen = full_screen || false;
      _box = $(box_selector)
      if (full_screen == false){
          _top = (window.innerHeight - _box.innerHeight())/2
      }else{
          _top = 0;
      }
      _left = (window.innerWidth - _box.innerWidth())/2;
      _box.css({ top: _top, left: _left })
    }, hide: function(box_selector){
      $(box_selector).hide()
    }

  }
}
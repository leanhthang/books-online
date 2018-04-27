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
      if(_box.attr("data-modal-type") == 'modal-form'){
        _top = 20
      }else{
        _top = 0
      }
    }else{
      _top = (window.innerHeight - _box.innerHeight())/4
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

  this.exec = function(func_name, params){
    params = params || null
    var fn = window[func_name];
    if(typeof fn !== 'function')
        return;
    fn.apply(window, params);
  }

  this.timeNow = function(){
    let date = new Date();
    let options = {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    return date.toLocaleTimeString("vi-VN", options)
  }

  // {text: _text, top: px, left: true/false, right: true/false}
  this.toast = {
    setPosition: function(func_params){
      toast = $(".toast")
      if(func_params.top){ toast.css('top', func_params.top +'px'); }
      if(func_params.left){ toast.css('left', func_params.left +'px'); }
      if(func_params.right){ toast.css('right', func_params.right +'px'); }
    },
    show: function(func_params){
      html = "<div class='toast'>"+func_params.text+"</div>"
      $("body").append(html)
      utilityLib.buildCenterBox.show(".toast")
      utilityLib.toast.setPosition(func_params)
    },
    hide: function(){
      $(".toast").remove()
    }
  }


}

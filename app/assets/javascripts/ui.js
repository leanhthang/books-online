var UI = new function() {
  this.menuLists = {
    genList: function(el, current_chap){
      return "<li data-chap-id='"+el.id+"'><div onclick='cmUI.goToChap(this, {})' data-url='/chapter/"+el.id+"/"+cmUI.post_id+"?json=1'>"+el.title+"</div></li>"
    },
    pinchCurrentId: function(){
      current_chap_pin = $("[data-chap-id='"+$("#chapter-id").val()+"']")
      $("li").removeClass('current-chap-active')
      if(current_chap_pin.length > 0){
        _scroll_distance = current_chap_pin.index()*40
        current_chap_pin.addClass('current-chap-active')
        $("#list-chapter-modal .cm-modal-body").scrollTop(_scroll_distance)
      }
    },
    init: function(data){
      html = "<ul>"
      for (var i = data.length - 1; i >= 0; i--) {
        html += UI.menuLists.genList(data[i])
      };
      html += "<span class='end-of-menu-list'></span>"
      $("#list-chapter-modal .cm-modal-body").html(html)
      UI.menuLists.pinchCurrentId()
    }
  }
  // Build ui for checkbox when load DOM
  this.checkBox = {
    act: function(){
      $(".cstm-ckb").each(function(index, el) {
        _el = $(el)
        _el_ckb = _el.find("input[type='checkbox'], input[type='radio']")
        if(_el_ckb.length > 0){
          if(_el_ckb.val() == "1") { _el.find("span").addClass('icon-check ckb-active') }
          if(_el.attr('data-disable') == "true"){
            _el.addClass('disable')
            _el.find("span").addClass("disable")
          }
        }
      });
      $(".cstm-ckb").on('click', function(event) {
        event.preventDefault();
        if($(this).attr('data-disable') == "true") return false;
        _ckb = $(this).find("input[type='checkbox']")
        _ckradio = $(this).find("input[type='radio']")
        _ck_icon = $(this).find("span")
        if(_ckb.length > 0){
          if(_ckb.val() == "1"){
            _ckb.val(0)
            _ck_icon.removeClass('icon-check ckb-active')
          }else{
            _ckb.val(1)
            _ck_icon.addClass('icon-check ckb-active')
          }
        }
        if(_ckradio.length > 0){
          _ckradio_name = _ckradio[0].name
          $("input[name='"+_ckradio_name+"'] + .ckradio").removeClass('icon-check ckb-active').prop('checked', false)
          _ckradio.prop('checked', true)
          _ck_icon.addClass('icon-check ckb-active')
        }
      });
    },
    init: function(){
      UI.checkBox.act()
    }
  }
  // End checkbox

  // Start Layout
  // 1 frame chua nhieu lo
  this.frame = new function(){
    this._frame = null;
    this.init = function(frame_id){
      this._frame = new Slider(frame_id, '.frame-item', {
          // interval: 12,
          minPercentToSlide: 0.25,
          duration: 0.3,
          autoplay: false, // autoplay?
          // direction: 'left', // autoplay direction
        });
      this._frame;
    }

    this.act = {
      frame: function(_this){return $(_this).parents(".frame-group")},
      close: function(_this){
        Frame.act.frame(_this).fadeOut(300)
      },
      remove: function(_this){
        Frame.act.frame(_this).fadeOut(300)
        Frame.act.frame(_this).remove()
      },
      goTo: function(current_frame, target_frame){
        if(current_frame){
          _loop = $(target_frame).index() - $(current_frame).index()
          direction = "left"
          if(_loop < 0){
            direction = "right";
            _loop = -_loop;
          }
          for (var i = _loop; i >= 0; i--) {
            Frame._frame.slide(direction)
          }
        }else{
          Frame._frame.slide("left")
        }
      },
    }
  }
  this.LO = new function(){
    this.obj = {
        countLoop: 0,
        setWidth: function(){
          cofgwidth = $("[ui-width]");
          for (var i = cofgwidth.length - 1; i >= 0; i--) {
            _hCofg = $(cofgwidth[i])
            _h = _hCofg.attr("ui-width")
            _hCofg.css('width', _h);
          }
        },
        setHeight: function(_this){
          let _h = 0
          // Set LO height by config
          cofgHeight = $("[ui-height]");
          for (var i = cofgHeight.length - 1; i >= 0; i--) {
            _hCofg = $(cofgHeight[i])
            if(_hCofg.attr("ui-height") == "full")
              {_h = $(window).height()+"px";}
            else
              {_h = _hCofg.attr("ui-height")}
            _hCofg.css('height', _h);
          }
          // set height of lo
          $(_this).each(function(index, el) {
            if(!$(el).is("[ui-height]")){
              $(el).css('height', window.innerHeight);
            }
            headerTopPos = 0
            if($(el).is("[ui-parent]")){
              _parent = $(el).attr("ui-parent")
              if(($(_parent).height() + 2) > $(window).height()){
                headerTopPos = $(_parent).position().top
              }else{
                headerTopPos =  0
              }
              wrapperH = $(_parent).height() - headerTopPos - 1
              $(el).height(wrapperH);
            }else{
              wrapperH = $(el).height()
            }
            // set LO-body height
            headerH = $(el).find(".lo-header").height() || 0
            footerH = $(el).find(".lo-footer").height() || 0
            _bodyTopPos = $(el).offset().top
            _body = $(el).find(".lo-body")
            _body.css('top', headerH+"px");
            if(!_body.hasClass('free-height')){
              _body.innerHeight(wrapperH - headerH - footerH -1)
            }
          });
        },
        setPosition: function(_t_l_r_b){
          // Handle width
          if($(_this).is("[ui-pos]")){
            let _w = $(_this).attr("ui-pos");
            $(_this).css('pos', _w);
          }
        },
    }
    this.init = function(_this){
        _this = _this || ".lo"
        let _obj = UI.LO.obj
        _obj.setHeight(_this)
        _obj.setWidth(_this)
      }
  }
  // End Layout

  this.init = function() {
    UI.sideNav.fixedMenuHeight()
    UI.sideNav.init()
    UI.checkBox.init()
  }
  this.runOnLoad = function() {
    document.addEventListener('DOMContentLoaded',function(){
      UI.init()
    })
  }
  this.runOnResize = function() {
      if(this.resizeState) clearTimeout(this.resizeState);
      this.resizeState = setTimeout(function(){
        UI.init()
      }, 50);
  }

}


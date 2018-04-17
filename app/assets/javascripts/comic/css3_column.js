// production
$(document).keydown(function (event) {
    if (event.keyCode == 123) { // Prevent F12
        return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I
        return false;
    }
});

$(document).on("contextmenu", function (e) {
    e.preventDefault();
});

$(window).resize(function() {
  if(this.resizeState) clearTimeout(this.resizeState);
  this.resizeState  = setTimeout(function(){
      comicUI.detectChangeDefaultOrientation()
    },200)
})

$(document).ready(function() {
  comicUI.init()
  comicUI.comicBoxAction()
});

comicUI = new function(){
  this.endOfColFirst = null;
  this.is_mobile = utilityLib.is_mobile();
  this.padding = 20;
  this.scrollPosition = 0;
  this.endOfCol = 0;
  this.currentPage = 1;
  this.totalPage = 0;
  this.boxWidthState = window.innerWidth
  this.boxHeightState = window.innerHeight
  this.cstmCSSColumnContext = function(){
    if(userSS.baseData().displayOption == "page"){
      $(comicUI.contentBox).css({
        '-webkit-column-width': comicUI.comicBoxWidth + "px",
        '-moz-column-width': comicUI.comicBoxWidth + "px",
        'column-width': comicUI.comicBoxWidth + "px",

        '-webkit-column-gap': comicUI.margin + 'px',
        '-moz-column-gap': comicUI.margin + 'px',
        'column-gap': comicUI.margin + 'px',
      });

      $("#comic-box").css({
        'padding-left': comicUI.margin + "px",
        'padding-right': comicUI.margin + "px",
      });
      $("#comic-footer, #cm-nav-right, #cm-nav-left").show()
      $("#hide-footer").prop('disabled', false);
    }else{
      $(comicUI.contentBox).css({
        'padding': "10px "+comicUI.margin + "px",
      });
      new SimpleBar($("#comic-box")[0])
      $("#hide-footer").prop('disabled', true);
    }

    $("#cm-nav-top .mask").height(window.innerHeight - 55)
    // Setting style
    userSS.settingInit()
  }

  this.fullScreen = function(){
    if(comicUI.fullScreenState){
      clearTimeout(comicUI.fullScreenState);
      clearTimeout(comicUI.fullScreenUpdateView);
    };
    comicUI.fullScreenState = setTimeout(function(){
      utilityLib.fullScreen()
    },50);
    comicUI.fullScreenUpdateView = setTimeout(function(){
      comicUI.detectChangeDefaultOrientation(true)
    },300);
  }

  this.leftClick = function(duration){
    duration = duration ? duration : 50
    if(comicUI.scrollPosition > 0){
      comicUI.currentPage -= 1
      comicUI.scrollPosition -= (comicUI.comicBoxWidth - comicUI.margin)
      comicUI.transformClick(duration)
    }
  }
  this.rightClick = function(duration, loop){
    duration = duration ? duration : 50
    comicUI.endOfCol = $(".end-of-col").last().position();
    if(comicUI.endOfCol.left > 0){
      comicUI.currentPage += 1
      comicUI.scrollPosition += (comicUI.comicBoxWidth - comicUI.margin)
      comicUI.transformClick(duration)
    }
  }

  this.transformClick = function(duration){
    $(comicUI.contentBox).scrollTo(comicUI.scrollPosition, {duration: duration, interrupt:true});
    comicUI.drawFooter()
  }

  this.detectChangeDefaultOrientation = function(alway_loading){
    alway_loading = alway_loading || false
    if( alway_loading == true || comicUI.is_mobile == false ){
      comicUI.initWhenResize();
      console.log(comicUI.is_mobile +" =>mobile full screen")
    }else if(comicUI.boxWidthState != window.innerWidth && comicUI.is_mobile){
      console.log(comicUI.is_mobile +" =>mobile screen")
      comicUI.initWhenResize()
      modalUI.hide()
    }
    comicUI.boxWidthState = window.innerWidth
    comicUI.boxHeightState = $(comicUI.contentBox).innerHeight()
  }

  this.comicBoxAction = function(){
    if (userSS.baseData().displayOption == "page"){
      $("#cm-nav-right").on("swipeleft click", function(){
        comicUI.rightClick()
      })
      $(comicUI.contentBox+", #cm-nav-left").on("swipeleft", function(){
        comicUI.rightClick()
      })
      $("#cm-nav-left").on("swiperight click", function(){
        comicUI.leftClick()
      })
      $(comicUI.contentBox+", #cm-nav-right").on("swiperight", function(){
        comicUI.leftClick()
      })
      $("#btn-next-chapter, #btn-prev-chapter").on("click", function(event){
        comicUI.init()
      })
      // Swipe up
      $("#cm-nav-right, #cm-nav-left,"+comicUI.contentBox).on("swipeup", function(){
        comicUI.rightClick()
      })
      $("#cm-nav-right, #cm-nav-left,"+comicUI.contentBox).on("swipedown", function(){
        comicUI.leftClick()
      })

      // wheel
      $(comicUI.contentBox).on('wheel', function(event) {
        if(event.originalEvent.wheelDelta/120 < 0) {
           comicUI.leftClick()
         }else {
           comicUI.rightClick()
         }
      });
    }

    $(".mask").on('click', function(event) {
      comicUI.showToolBox()
    });
    // Button
    $("[data-toggle='modal']").on('click', function(event) {
      target = $(this).data("target")
      modalUI.show(target)
    });

    // Setting action
    userSS.setSettingConf()
  }

  this.showToolBox = function(){
    if($("#cm-nav-top").is(":visible")){
      comicUI.hideNavBar()
      modalUI.hide()
    }else{
      $("#cm-nav-top, #cm-nav-bottom, #btn-next-chapter, #btn-prev-chapter").show()
    }
  }


  this.drawFooter = function(){
    page_detail = comicUI.currentPage +"/"+comicUI.countTotalPage()
    title = comicUI.add3Dots("pham nhan tu tien v2 1234567890")
    chapTitle = "<span class='f-right'>"+title+" &nbsp;(10%)</span>"
    $("#comic-footer").html(page_detail+chapTitle)
  }

  this.countTotalPage = function(){
    return Math.ceil(comicUI.endOfColFirst/(comicUI.comicBoxWidth-comicUI.margin)) + 1
  }

  this.hideNavBar = function(){
    $("#cm-nav-top, #cm-nav-bottom, #btn-next-chapter, #btn-prev-chapter").hide()
  }

  // display_option: scroll / page
  this.addComicBody = function(display_option){
    display_option = display_option || "page"
    display_option = userSS.baseData().displayOption
    $("#comic-box").height(window.innerHeight)
    comicUI.contentBox = "#comicContent";
    $(comicUI.contentBox).append(comicUI.originalText)
    $(comicUI.contentBox).append('<div class="ads-box"></div>')
    $(comicUI.contentBox).append('<div class="end-of-col"></div>')

    comicUI.comicBoxWidth = $("#comic-box").innerWidth()

    comicUI.cstmCSSColumnContext()

    if(display_option == "page"){

      // comicUI.loadAds()
      // comicUI.test()
      comicUI.endOfColFirst = $(".end-of-col").last().position().left;
      comicUI.drawFooter()
    }
  }

  this.init = function(){
    comicUI.originalText = $(comicUI.contentBox).html()
    comicUI.destroy()
    comicUI.currentPage = 1;
    comicUI.margin = userSS.baseData().margin;
    comicUI.scrollPosition = 0;
    comicUI.addComicBody()
    userSS.limitAccessPerDay()
  }

  this.initWhenResize = function(){
    oldPageWidth = comicUI.endOfColFirst
    oldPageIndex = comicUI.currentPage
    comicUI.init()
    target_page_index = (oldPageIndex * comicUI.endOfColFirst)/oldPageWidth
    for(var i = target_page_index; i > 0; i--){
      if(oldPageIndex < comicUI.currentPage){
        comicUI.leftClick(0)
      }else{
        comicUI.rightClick(0)
      }
    }
    modalUI.hide()
  }

  this.loadAds = function(){
    // Init ads thread
    comicUI.ads = comicUI.ads ? comicUI.ads : null
    // Destroy old process
    clearTimeout(comicUI.ads)
    // Start process
    comicUI.ads = setTimeout(function(){
      $(".ads-box").append(adsData)
      $(".ads-box").append('<div class="end-of-col"></div>')
      console.log("ads loading...")
    },2500);
  }

  this.destroy = function(){
    $(comicUI.contentBox).html('')
  }


  this.add3Dots = function(string){
      _boxW = comicUI.comicBoxWidth
      limit = 25;
      if(_boxW < 400 ){
        limit = 25
      }else if (_boxW < 560 ) {
        limit = 30
      }else if (_boxW < 760 ) {
        limit = 40
      }else{
        limit = 65
      }
      return utilityLib.add3Dots(string, limit)
  }

  this.test = function(){
    setInterval(function(){
      html = comicUI.endOfColFirst+" => "+comicUI.scrollPosition+" => "+(comicUI.scrollPosition/(comicUI.comicBoxWidth - 20)).toFixed(4)+" => "+comicUI.comicBoxWidth+" => "+$("#comic-box").innerWidth()+" => "+(comicUI.endOfCol.left)

      $("#comic-footer .f-right").html(html)
    }, 200)

  }
}

var modalUI = new function(){
  this.cssCstm = function(modal_id){
    modal = $(modal_id)
    modal.show()
    if(modal.attr('data-screen') == "modal-full"){
      utilityLib.buildCenterBox(modal_id, true)
      modal.find(".modal-body").height(window.innerHeight - 76)
    }else{
      utilityLib.buildCenterBox(modal_id)
    }
    comicUI.transformClick()
  }
  this.hide = function(){
    $(".modal").hide()
  }
  this.btnCloseModal = function(){
    $(".modal-header .btn-close, #comicContent, #cm-nav-left, #cm-nav-right").on('click', function() {
      modalUI.hide()
    });
  }
  this.show = function(modal_id){
    modalUI.cssCstm(modal_id)
    comicUI.hideNavBar()
    modalUI.btnCloseModal()
  }
}

userSS = new function(){
  this.clear =  function(){
    localStorage.clear();
  }

  this.baseData = function(){
    return_data = {}
    return_data.margin      = localStorage.getItem("margin") || 15
    return_data.footer      = localStorage.getItem("footer") || "show"
    return_data.background  = localStorage.getItem("background") || "bg-style1"
    return_data.fontSize    = localStorage.getItem("fontSize") || 1.4
    return_data.displayOption     = localStorage.getItem("displayOption") || "page"
    return return_data
  }

  this.setFontSize = function(increase_or_decrease){
    if(increase_or_decrease == 0) return false;
    increase_or_decrease = increase_or_decrease || -1
    increase_or_decrease = parseInt(increase_or_decrease)
    font_size = parseFloat(userSS.baseData().fontSize)
    if(font_size > 0.7 && font_size < 2.7){
      font_size += increase_or_decrease*0.1
    }else if (font_size <= 0.7 ) {
      font_size = 0.8
    }else if (font_size >= 2.7) {
      font_size = 2.6
    }

    localStorage.setItem("fontSize", font_size);
    $(comicUI.contentBox+", .setting-site-label").css("font-size", font_size +"em");
    if (userSS.baseData().displayOption == "page"){
      comicUI.drawFooter()
    }
  }

  this.setFontType = function(){

  }
  this.setFooter = function(){

  }

  this.setBackground = function(){
    $(".btn-modal[data-bg*='bg-style']").on('click', function(event) {
      html = "<span class='icon-check'></span>"
      bg = $(this).attr("data-bg")
      $("div[data-bg*='bg-'] > span").remove()
      $("#wrap-container[class*='bg-']").removeClass()
      localStorage.setItem("background", bg);
      $("#wrap-container").addClass(bg)
      $(this).append(html)
    });
  }

  this.setMargin = function(){

  }
  this.setDisplayOption = function(display_option){
    localStorage.setItem("displayOption", display_option)
    comicUI.init()
    window.location.reload(true)
  }

  this.setSettingConf = function(){
    userSS.setFontSize(0)
    userSS.setBackground()
  }

  this.settingInit = function(){
    bg = userSS.baseData().background;
    $("#wrap-container").addClass(bg)

    fontSize = userSS.baseData().fontSize;
    $(comicUI.contentBox+", .setting-site-label").css("font-size", fontSize +"em");
  }
  // 300
  this.limitAccessPerDay = function(){
    // access_count = cookie.getCookie("limitAccessPerDay") || 0
    // access_count = parseInt(access_count) + 1
    // cookie.setCookie("limitAccessPerDay", access_count, 1)
  }
}

cmUI = new function(){
  this.post_id = $("#post-id").val();
  this.endOfColFirst = null;
  this.firstInit = true;
  this.is_mobile = utilityLib.is_mobile();
  this.padding = 20;
  this.scrollPosition = 0;
  this.endOfCol = 0;
  this.currentPage = 1;
  this.totalPage = 0;
  this.originalText = "";
  this.boxWidthState = $(window).width()
  this.boxHeightState = $(window).height()

  this.cstmCSSColumnContext = function(){
    if(userSS.baseData().displayOption == "page"){
      $(cmUI.contentBox).css({
        '-webkit-column-width': cmUI.comicBoxWidth + "px",
        '-moz-column-width': cmUI.comicBoxWidth + "px",
        'column-width': cmUI.comicBoxWidth + "px",

        '-webkit-column-gap': cmUI.margin + 'px',
        '-moz-column-gap': cmUI.margin + 'px',
        'column-gap': cmUI.margin + 'px',
      });

      $("#comicContent").css({
        'padding': cmUI.margin + "px",
      });
      $("#comic-footer, #cm-nav-right, #cm-nav-left").show()
      $("#hide-footer").prop('disabled', false);
    }else{
      $(cmUI.contentBox).css({
        'padding': "10px "+cmUI.margin + "px",
      });
      $("#comicContent").css('overflow-y', 'auto');
      $("#hide-footer").prop('disabled', true);
    }

    $("#cm-nav-top .mask").height($(window).height() - 50)
    // Setpting style
    userSS.settingInit()
  }

  this.fullScreen = function(){
    clearTimeout(cmUI.fullScreenState);
    cmUI.fullScreenState = setTimeout(function(){
      utilityLib.fullScreen()
      clearTimeout(cmUI.fullScreenUpdateView);
      cmUI.fullScreenUpdateView = setTimeout(function(){
        cmUI.detectChangeDefaultOrientation()
      },50);
      clearTimeout(cmUI.fullScreenState);
    },100);
  }

  this.leftClick = function(duration, loop){
    loop = loop ? loop : 0
    $("#comicContent").css('right', "0px");
    if(cmUI.scrollPosition > 0 || loop > 0){
      if(loop > 0){
        cmUI.scrollPosition = (cmUI.comicBoxWidth - cmUI.margin)*(loop - 1)
      }else{
        cmUI.currentPage -= 1
        cmUI.scrollPosition -= (cmUI.comicBoxWidth - cmUI.margin)
      }
      cmUI.transformClick(duration)
    }
  }

  this.rightClick = function(duration, loop){
    loop = loop ? loop : 0
    cmUI.endOfCol = $(".end-of-col").last().position();
    if(cmUI.endOfCol.left > 0 && cmUI.currentPage < cmUI.countTotalPage()){
      if(loop > 0){
        cmUI.scrollPosition = (cmUI.comicBoxWidth - cmUI.margin)*(loop - 1)
      }else{
        cmUI.currentPage += 1
        cmUI.scrollPosition += (cmUI.comicBoxWidth - cmUI.margin)
      }
      if(cmUI.endOfCol.left <= cmUI.comicBoxWidth){
        $("#comicContent").css('right', cmUI.margin+'px');
      }
      cmUI.transformClick(duration)
    }
  }

  this.transformClick = function(duration, scroll_length){
    duration      = duration || 30
    scroll_length = scroll_length || cmUI.scrollPosition
    $(cmUI.contentBox).scrollTo(scroll_length, {duration: duration, interrupt:true});
    // if($(window).height() < $(window).innerHeight()){
    //   cmUI.detectChangeDefaultOrientation()
    // }
    cmUI.drawFooter()
  }

  this.detectChangeDefaultOrientation = function(){
    cmUI.hideToolBox()
    cmUI.initWhenResize()
    console.log("resize")
    cmUI.boxWidthState = $(window).width()
    cmUI.boxHeightState = $(cmUI.contentBox).innerHeight()
  }

  this.swipeComic = function(){
    threshold = 40
    cmUI.endOfCol = $(".end-of-col").last().position();
    $("#cm-nav-right, #cm-nav-left, "+cmUI.contentBox).swipe({
        swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData){
          if( cmUI.scrollPosition > 0 && (direction == 'right' || direction == "down") ){
            cmUI.transformClick(10, cmUI.scrollPosition - distance)
          }else if(cmUI.endOfCol.left >= 0 && (direction == 'left' || direction == "up")){
            cmUI.transformClick(10, cmUI.scrollPosition + distance)
          }
          if( (phase == 'end' || phase == 'cancel') && distance < threshold) {
            cmUI.transformClick(50)
          }
        },
        swipe: function(event, direction, distance, duration, fingerCount) {
            if(direction == 'left' || direction == 'up') {
              cmUI.rightClick(0);
            }else{
              cmUI.leftClick(0)
            }
        },
        threshold: threshold
      })
  }

  this.comicBoxAction = function(){
    if (userSS.baseData().displayOption == "page"){
      cmUI.swipeComic()

      $("#cm-nav-right").on(" click", function(event){
        cmUI.rightClick(0)
      })
      $("#cm-nav-left").on("click", function(){
        cmUI.leftClick(0)
      })

      // wheel
      $(cmUI.contentBox).on('wheel', function(event) {
        if(event.originalEvent.wheelDelta/120 < 0) {
           cmUI.leftClick()
         }else {
           cmUI.rightClick()
         }
      });
    }
    $(".mask").on('click', function(event) {
      cmUI.showToolBox()
    });
    $(".modal-wrapper").on('click', function(event) {
      modalUI.hide()
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
      cmUI.hideToolBox()
      modalUI.hide()
    }else{
      if(screen.height == cmUI.boxHeightState && cmUI.is_mobile == true){
        utilityLib.toast.show({text: utilityLib.timeNow(), top: 50, left: 0})
      }
      $("#cm-nav-top, #cm-nav-bottom, #btn-next-chapter, #btn-prev-chapter").show()
    }
  }

  this.hideToolBox = function(){
    utilityLib.toast.hide()
    $("#cm-nav-top, #cm-nav-bottom, #btn-next-chapter, #btn-prev-chapter").hide()
  }

  this.goToChap = function(_this, params){
    params = params || {post_id: cmUI.post_id, id: $("#chapter-id").val()}
    $.ajax({
      beforeSend: function(){
        utilityLib.buildCenterBox.show(".loading")
      },
      url: $(_this).attr("data-url"),
      type: 'GET',
      dataType: 'JSON',
      data: params,
    })
    .done(function(resp) {
      if(!resp){ utilityLib.buildCenterBox.hide(".loading"); return false; }

      $("#chapter-id").val(resp.id)
      cmUI.currentPostChap = {post_id: cmUI.post_id, id: resp.id}
      $("#current-order-chapter").val(resp.order_c)
      $("#chapter-title").val(resp.title)
      cmUI.originalText = resp.origin_content
      cmUI.init()
      $("#chapter-tiltle-header").html(resp.title)
      cmUI.chapterFooter = ('<div class="text-danger col text-center">Hết chương<p>'+resp.title+'</p></div>')
      $(cmUI.contentBox+" #chapter-footer").html(cmUI.chapterFooter)
      modalUI.hide()
      utilityLib.buildCenterBox.hide(".loading")
      // userSS.setPostChapID()
    })
    .fail(function() {
      utilityLib.buildCenterBox.hide(".loading")
    })
  }

  this.drawFooter = function(){
    page_detail = cmUI.currentPage +"/"+cmUI.countTotalPage()
    title = cmUI.add3Dots($("#chapter-title").val())
    read_progress = $("#current-order-chapter").val() +"/"+$("#chapter-count").val()
    chapTitle = "<span class='f-right'>"+title+" &nbsp;("+read_progress+")</span>"
    $("#comic-footer").html(page_detail+chapTitle)
  }

  this.countTotalPage = function(){
    return Math.ceil(cmUI.endOfColFirst/(cmUI.comicBoxWidth-cmUI.margin)) //+ 1
  }

  // display_option: scroll / page
  this.addComicBody = function(display_option){
    cmUI.currentPostChap = userSS.baseData().currentPostChap
    display_option = display_option || "page"
    display_option = userSS.baseData().displayOption
    $(".comic-box").height($(window).height())
    cmUI.contentBox = "#comicContent";
    if(cmUI.originalText.length > 0) {
      $("#chapter-header").html(cmUI.chapterHeader)
      $("#chapter-footer").html(cmUI.chapterFooter)
      $("#comicData").html(cmUI.originalText)
    }
    $(cmUI.contentBox).append('<div class="ads-box"></div>')
    $(cmUI.contentBox).append('<div class="end-of-col"></div>')

    cmUI.comicBoxWidth = $(".comic-box").innerWidth()

    cmUI.cstmCSSColumnContext()

    if(display_option == "page"){
      // cmUI.loadAds()
      // cmUI.test()
      setTimeout(function(){
        cmUI.endOfColFirst = $(".end-of-col").last().position().left;
        cmUI.drawFooter()
      }, 50)
    }
  }

  this.init = function(){
    cmUI.hideToolBox()
    cmUI.destroy()
    cmUI.currentPage = 1;
    cmUI.margin = userSS.baseData().margin;
    cmUI.scrollPosition = 0;
    cmUI.addComicBody()
    userSS.limitAccessPerDay()
    if(cmUI.is_mobile == false){ cmUI.transformClick() }
  }

  this.initWhenResize = function(){
    $("#comicData").html("")
    modalUI.hide()
    cmUI.oldTotalPage = cmUI.countTotalPage()
    cmUI.oldPageIndex = cmUI.currentPage
    cmUI.init()
    $("#comicContent").css('right', 0);
    // cmUI.currentPage = Math.round((cmUI.countTotalPage() * cmUI.oldPageIndex)/cmUI.oldTotalPage)
    // if(cmUI.currentPage > cmUI.countTotalPage()){
    //   cmUI.currentPage = cmUI.countTotalPage() - 1
    // }else{

    //   $("#comicContent").css('right', 0);
    // }
    // if(cmUI.oldPageIndex < cmUI.currentPage){
    //   cmUI.leftClick(100, cmUI.currentPage)
    // }else{
    //   cmUI.rightClick(100, cmUI.currentPage)
    // }
    // cmUI.drawFooter()
  }

  this.loadAds = function(){
    // Init ads thread
    cmUI.ads = cmUI.ads ? cmUI.ads : null
    // Destroy old process
    clearTimeout(cmUI.ads)
    // Start process
    cmUI.ads = setTimeout(function(){
      $(".ads-box").append(adsData)
      $(".ads-box").append('<div class="end-of-col"></div>')
    },1500);
  }

  this.destroy = function(){
    $(cmUI.contentBox).html('')
    $(cmUI.contentBox).html("<div id='chapter-header'></div><div id='comicData' onclick='cmUI.showToolBox()'></div><div id='chapter-footer'></div>")
  }

  this.add3Dots = function(string){
      _boxW = cmUI.comicBoxWidth
      if(_boxW < 320 ){
        return ""
      }else if (_boxW < 400 ) {
        limit = 27
      }else if (_boxW < 560 ) {
        limit = 40
      }else if (_boxW < 760 ) {
        limit = 55
      }else{
        limit = 70
      }
      return utilityLib.add3Dots(string, limit)
  }

  this.test = function(){
    // setInterval(function(){
    //   html = cmUI.endOfColFirst+" => "+cmUI.scrollPosition+" => "+(cmUI.scrollPosition/(cmUI.comicBoxWidth - 20)).toFixed(4)+" => "+cmUI.comicBoxWidth+" => "+$(".comic-box").innerWidth()+" => "+(cmUI.endOfCol.left)

    //   $("#comic-footer .f-right").html(html)
    // }, 200)
  }
}

cmUI = new function(){
  this.post_id = $("#post-id").val()
  this.endOfColFirst = null;
  this.is_mobile = utilityLib.is_mobile();
  this.padding = 20;
  this.scrollPosition = 0;
  this.endOfCol = 0;
  this.currentPage = 1;
  this.totalPage = 0;
  this.originalText = "";
  this.boxWidthState = window.innerWidth
  this.boxHeightState = window.innerHeight
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

      $("#comic-box").css({
        'padding-left': cmUI.margin + "px",
        'padding-right': cmUI.margin + "px",
      });
      $("#comic-footer, #cm-nav-right, #cm-nav-left").show()
      $("#hide-footer").prop('disabled', false);
    }else{
      $(cmUI.contentBox).css({
        'padding': "10px "+cmUI.margin + "px",
      });
      new SimpleBar($("#comic-box")[0])
      $("#hide-footer").prop('disabled', true);
    }

    $("#cm-nav-top .mask").height(window.innerHeight - 55)
    // Setting style
    userSS.settingInit()
  }

  this.fullScreen = function(){
    if(cmUI.fullScreenState){
      clearTimeout(cmUI.fullScreenState);
      clearTimeout(cmUI.fullScreenUpdateView);
    };
    cmUI.fullScreenState = setTimeout(function(){
      utilityLib.fullScreen()
    },50);
    cmUI.fullScreenUpdateView = setTimeout(function(){
      cmUI.detectChangeDefaultOrientation(true)
    },300);
  }

  this.leftClick = function(duration, loop){
    loop = loop ? loop : 0
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
    if(cmUI.endOfCol.left > 0){
      if(loop > 0){
        cmUI.scrollPosition = (cmUI.comicBoxWidth - cmUI.margin)*(loop - 1)
      }else{
        cmUI.currentPage += 1
        cmUI.scrollPosition += (cmUI.comicBoxWidth - cmUI.margin)
      }
      cmUI.transformClick(duration)
    }
  }

  this.transformClick = function(duration){
    duration = duration || 350
    $(cmUI.contentBox).scrollTo(cmUI.scrollPosition, {duration: duration, interrupt:true});
    cmUI.drawFooter()
  }

  this.detectChangeDefaultOrientation = function(alway_loading){
    alway_loading = alway_loading || false
    if( alway_loading == true || cmUI.is_mobile == false ){
      cmUI.initWhenResize();
    }else if(cmUI.boxWidthState != window.innerWidth && cmUI.is_mobile){
      cmUI.initWhenResize()
      modalUI.hide()
    }
    cmUI.boxWidthState = window.innerWidth
    cmUI.boxHeightState = $(cmUI.contentBox).innerHeight()
  }

  this.comicBoxAction = function(){
    if (userSS.baseData().displayOption == "page"){
      $("#cm-nav-right").on("swipeleft click", function(){
        cmUI.rightClick()
      })
      $(cmUI.contentBox+", #cm-nav-left").on("swipeleft", function(event){
        cmUI.rightClick()
      })
      $("#cm-nav-left").on("swiperight click", function(){
        cmUI.leftClick()
      })
      $(cmUI.contentBox+", #cm-nav-right").on("swiperight", function(){
        cmUI.leftClick()
      })
      $("#btn-next-chapter, #btn-prev-chapter").on("click", function(event){
        cmUI.init()
      })
      // Swipe up
      $("#cm-nav-right, #cm-nav-left,"+cmUI.contentBox).on("swipeup", function(){
        cmUI.rightClick()
      })
      $("#cm-nav-right, #cm-nav-left,"+cmUI.contentBox).on("swipedown", function(){
        cmUI.leftClick()
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
      cmUI.hideNavBar()
      modalUI.hide()
    }else{
      $("#cm-nav-top, #cm-nav-bottom, #btn-next-chapter, #btn-prev-chapter").show()
    }
  }
  // in_or_decrease: +1/-1
  this.getChapter = function(_this, in_or_decrease){
    // debugger
    console.log(atob($("#chapter-id").val()))
    $.ajax({
      beforeSend: function(){
        utilityLib.buildCenterBox.show(".loading")
      },
      url: $(_this).attr("data-url"),
      type: 'GET',
      dataType: 'JSON',
      data: {post_id: cmUI.post_id, id: $("#chapter-id").val()},
    })
    .done(function(data) {

      utilityLib.buildCenterBox.hide(".loading")
      $("#chapter-id").val(btoa(data.id))
      $("#current-order-chapter").val(data.order_c)
      $("#chapter-title").val(data.title)
      cmUI.originalText = data.origin_content
      cmUI.init()
      $("#chapter-tiltle-header").html(data.title)
    })
    .fail(function() {
      console.log("error");
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
    return Math.ceil(cmUI.endOfColFirst/(cmUI.comicBoxWidth-cmUI.margin)) + 1
  }

  this.hideNavBar = function(){
    $("#cm-nav-top, #cm-nav-bottom, #btn-next-chapter, #btn-prev-chapter").hide()
  }

  // display_option: scroll / page
  this.addComicBody = function(display_option){
    display_option = display_option || "page"
    display_option = userSS.baseData().displayOption
    $("#comic-box").height(window.innerHeight)
    cmUI.contentBox = "#comicContent";
    if(cmUI.originalText.length > 0) {
      $(cmUI.contentBox+" #chapter-header").html(cmUI.chapterHeader)
      $(cmUI.contentBox+" #comicData").html(cmUI.originalText)
    }
    $(cmUI.contentBox).append('<div class="ads-box"></div>')
    $(cmUI.contentBox).append('<div class="end-of-col"></div>')

    cmUI.comicBoxWidth = $("#comic-box").innerWidth()

    cmUI.cstmCSSColumnContext()

    if(display_option == "page"){

      // cmUI.loadAds()
      // cmUI.test()
      cmUI.endOfColFirst = $(".end-of-col").last().position().left;
      cmUI.drawFooter()
    }
  }

  this.init = function(){
    cmUI.destroy()
    cmUI.currentPage = 1;
    cmUI.margin = userSS.baseData().margin;
    cmUI.scrollPosition = 0;
    cmUI.addComicBody()
    userSS.limitAccessPerDay()
  }

  this.initWhenResize = function(){
    modalUI.hide()
    oldTotalPage = cmUI.countTotalPage()
    oldPageIndex = cmUI.currentPage
    cmUI.init()
    cmUI.currentPage = Math.round((cmUI.countTotalPage() * oldPageIndex)/oldTotalPage)
    if(cmUI.currentPage > cmUI.countTotalPage()){
      cmUI.currentPage = cmUI.countTotalPage()
    }
    if(oldPageIndex < cmUI.currentPage){
      cmUI.leftClick(0, cmUI.currentPage)
    }else{
      cmUI.rightClick(0, cmUI.currentPage)
    }
    cmUI.drawFooter()
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
      console.log("ads loading...")
    },2500);
  }

  this.destroy = function(){
    $(cmUI.contentBox).html('')
    $(cmUI.contentBox).html("<div id='chapter-header'></div><div id='comicData' onclick='cmUI.showToolBox()'></div><div id='chpter-end'></div>")
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
    setInterval(function(){
      html = cmUI.endOfColFirst+" => "+cmUI.scrollPosition+" => "+(cmUI.scrollPosition/(cmUI.comicBoxWidth - 20)).toFixed(4)+" => "+cmUI.comicBoxWidth+" => "+$("#comic-box").innerWidth()+" => "+(cmUI.endOfCol.left)

      $("#comic-footer .f-right").html(html)
    }, 200)

  }
}

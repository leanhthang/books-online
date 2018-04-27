userSS = new function(){
  this.clear =  function(){
    localStorage.clear();
  }

  // post_id: {
  //   menu_items: [],
  //   next_chapters: [],
  //   prev_chapters: [],
  // }
  this.data = {}

  this.baseData = function(){
    return_data = {}
    return_data.margin        = localStorage.getItem("margin") || 20
    return_data.currentPostChap   = localStorage.getItem("currentPostChap") || cmUI.currentPostChap
    return_data.footer        = localStorage.getItem("footer") || "show"
    return_data.background    = localStorage.getItem("background") || "bg-style1"
    return_data.fontSize      = localStorage.getItem("fontSize") || 1.4
    return_data.fontColor     = localStorage.getItem("fontColor") || "cl-style5"
    return_data.displayOption = localStorage.getItem("displayOption") || "page"
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
    $(cmUI.contentBox+", .setting-site-label").css("font-size", font_size +"em");
    if (userSS.baseData().displayOption == "page"){
      cmUI.init()
    }
  }

  this.setCurrentPostChapId = function(){

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
  this.setTextColor = function(){
    $(".btn-modal[data-cl*='cl-style']").on('click', function(event) {
      html = "<span class='icon-check'></span>"
      cl = $(this).attr("data-cl")
      $("div[data-cl*='cl-'] > span").remove()
      $("#comicData[class*='cl-']").removeClass()
      localStorage.setItem("fontColor", cl);
      $("#comicData").addClass(cl)
      $(this).append(html)
    });
  }

  this.setMargin = function(){

  }
  this.setDisplayOption = function(display_option){
    localStorage.setItem("displayOption", display_option)
    cmUI.init()
    window.location.reload(true)
  }

  this.setSettingConf = function(){
    userSS.setFontSize(0)
    userSS.setBackground()
    userSS.setTextColor()
  }

  this.settingInit = function(){
    // auto set setting has created
    bg = userSS.baseData().background;
    $("#wrap-container").addClass(bg)
    cl = userSS.baseData().fontColor;
    $("#comicData").addClass(cl)

    fontSize = userSS.baseData().fontSize;
    $(cmUI.contentBox+", .setting-site-label").css("font-size", fontSize +"em");
    // auto set status for modal setting
    // background
    $(".setting-option > ."+bg).html("<span class='icon-check'></span>")
    $(".setting-option > ."+cl).html("<span class='icon-check'></span>")
    displayOption = userSS.baseData().displayOption
    if(displayOption == "page"){
      $(".setting-view > .setting-view-page").css('background', '#999');
    }else{
      $(".setting-option > .setting-view-scroll").css('background', '#999');
    }
  }
  // 300
  this.limitAccessPerDay = function(){
    // access_count = cookie.getCookie("limitAccessPerDay") || 0
    // access_count = parseInt(access_count) + 1
    // cookie.setCookie("limitAccessPerDay", access_count, 1)
  }
}

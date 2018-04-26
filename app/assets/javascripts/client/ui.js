var UI = new function() {
  this.menuLists = {
    genList: function(el, current_chap){
      return "<li data-chap-id='"+el.id+"'><div onclick='cmUI.getChapter(this, {})' data-url='/chapter/"+el.id+"/"+cmUI.post_id+"?json=1'>"+el.title+"</div></li>"
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
}

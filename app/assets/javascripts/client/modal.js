var modalUI = new function(){
  this.cssCstm = function(modal_id){
    modal = $(modal_id)
    modal.show()
    if(modal.attr('data-screen-width') == "full"){
      modal.width(cmUI.comicBoxWidth)
    }
    if(modal.attr('data-screen') == "modal-full"){
      utilityLib.buildModalBox(modal_id, true)
    }else{
      utilityLib.buildModalBox(modal_id)
    }
    if (modal.find('.cm-modal-footer').height()){
      modal_body_height = window.innerHeight - modal.find(".cm-modal-header").height() - footerH + 20
      modal.find(".cm-modal-body").css("height", modal_body_height)
    }

  }
  this.hide = function(){
    $(".cm-modal").hide()
    $(".modal-wrapper").hide()
  }
  this.btnCloseModal = function(){
    $(".cm-modal-header .btn-close, #comicContent, #cm-nav-left, #cm-nav-right").on('click', function() {
      modalUI.hide()
    });
  }

  this.loadMenu = function(modal_id){
    if( modal_id != "#list-chapter-modal") return false
    post_id = $(modal_id).attr("data-post-id")
    userSS.data["post_id_"+post_id] = {}
    $.ajax({
      beforeSend: function(){
        utilityLib.buildCenterBox.show(".loading")
      },
      url: "/get_menu_items/"+post_id,
      type: 'GET',
      dataType: 'json',
    })
    .done(function(data) {
      utilityLib.buildCenterBox.hide(".loading")
      $(modal_id+" .cm-modal-body").html((data))
      userSS.data["post_id_"+post_id]['menu_items'] = data
      UI.menuLists.init(data)
    }).fail(function(){
      utilityLib.buildCenterBox.hide(".loading")
    })
  }
  this.action = function(modal_id){
    $("#nav-btn-list-chapter").c
  }

  this.show = function(modal_id){
    $(".modal-wrapper").show()
    modalUI.cssCstm(modal_id)
    cmUI.hideToolBox()
    modalUI.btnCloseModal()
    modalUI.loadMenu(modal_id)
  }
}

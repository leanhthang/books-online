var modalUI = new function(){
  this.cssCstm = function(modal_id){
    modal = $(modal_id)
    modal.show()
    if(modal.attr('data-screen-width') == "full"){
      modal.width(cmUI.comicBoxWidth)
    }
    if(modal.attr('data-screen') == "modal-full"){
      utilityLib.buildModalBox(modal_id, true)
      modal.find(".cm-modal-body").height(window.innerHeight - 76)
    }else{
      utilityLib.buildModalBox(modal_id)
    }
    // cmUI.transformClick()
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
    $.ajax({
      beforeSend: function(){
        utilityLib.buildCenterBox.show(".loading")
      },
      url: "/get_menu_chapters/"+post_id,
      type: 'GET',
      dataType: 'html',
    })
    .done(function(data) {
      utilityLib.buildCenterBox.hide(".loading")
      $(modal_id+" .cm-modal-body").html((data))
      modalUI.listMenus = data
    })
  }
  this.action = function(modal_id){
    $("#nav-btn-list-chapter").c
  }

  this.show = function(modal_id){
    $(".modal-wrapper").show()
    modalUI.cssCstm(modal_id)
    cmUI.hideNavBar()
    modalUI.btnCloseModal()
    modalUI.loadMenu(modal_id)
  }
}

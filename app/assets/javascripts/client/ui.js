var UI = new function() {
  this.menuLists = {
    genList: function(el){
      return "<li><div onclick='cmUI.getChapter(this, {})' data-url='/chapter/"+btoa(el.id)+"/"+cmUI.post_id+"?json=1'>"+el.title+"</div></li>"
    },
    init: function(data){
      html = "<ul>"
      for (var i = data.length - 1; i >= 0; i--) {
        html += UI.menuLists.genList(data[i])
      };
      $("#list-chapter-modal .cm-modal-body").html(html)
    }
  }
}

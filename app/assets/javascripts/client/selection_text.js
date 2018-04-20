var textSelect = new function(){
  this.mouseXPosition = 0
  this.init = function(selector){
    textSelect.selector = selector
    $(textSelect.selector).mousedown(function(e1) {
      mouseXPosition = e1.pageX; //register the mouse down position
    });
     $(textSelect.selector).mouseup(function(e2) {
       var highlighted = false;
       var selection = window.getSelection();
       var selectedText = selection.toString();
       var startPoint = window.getSelection().getRangeAt(0).startOffset;
       var endPoint = window.getSelection().getRangeAt(0).endOffset;
       var anchorTag = selection.anchorNode.parentNode;
       var focusTag = selection.focusNode.parentNode;
       if ((e2.pageX - mouseXPosition) < 0) {
           focusTag = selection.anchorNode.parentNode;
           anchorTag = selection.focusNode.parentNode;
       }
       if (selectedText.length === (endPoint - startPoint)) {
           highlighted = true;

           if (anchorTag.className !== "highlight") {
               textSelect.highlightSelection();
           } else {
               var afterText = selectedText + "<span class = 'highlight'>" + anchorTag.innerHTML.substr(endPoint) + "</span>";
               anchorTag.innerHTML = anchorTag.innerHTML.substr(0, startPoint);
               anchorTag.insertAdjacentHTML('afterend', afterText);
           }
       } else {
           if (anchorTag.className !== "highlight" && focusTag.className !== "highlight") {
               textSelect.highlightSelection();
               highlighted = true;
           }
       }
       if (anchorTag.className === "highlight" && focusTag.className === 'highlight' && !highlighted) {
           highlighted = true;
           var afterHtml = anchorTag.innerHTML.substr(startPoint);
           var outerHtml = selectedText.substr(afterHtml.length, selectedText.length - endPoint - afterHtml.length);
           var anchorInnerhtml = anchorTag.innerHTML.substr(0, startPoint);
           var focusInnerHtml = focusTag.innerHTML.substr(endPoint);
           var focusBeforeHtml = focusTag.innerHTML.substr(0, endPoint);
           selection.deleteFromDocument();
           anchorTag.innerHTML = anchorInnerhtml;
           focusTag.innerHTml = focusInnerHtml;
           var anchorafterHtml = afterHtml + outerHtml + focusBeforeHtml;
           anchorTag.insertAdjacentHTML('afterend', anchorafterHtml);
       }
       if (anchorTag.className === "highlight" && !highlighted) {
           highlighted = true;
           var Innerhtml = anchorTag.innerHTML.substr(0, startPoint);
           var afterHtml = anchorTag.innerHTML.substr(startPoint);
           var outerHtml = selectedText.substr(afterHtml.length, selectedText.length);
           selection.deleteFromDocument();
           anchorTag.innerHTML = Innerhtml;
           anchorTag.insertAdjacentHTML('afterend', afterHtml + outerHtml);
       }
       if (focusTag.className === 'highlight' && !highlighted) {
           highlighted = true;
           var beforeHtml = focusTag.innerHTML.substr(0, endPoint);
           var outerHtml = selectedText.substr(0, selectedText.length - beforeHtml.length);
           selection.deleteFromDocument();
           focusTag.innerHTml = focusTag.innerHTML.substr(endPoint);
           outerHtml += beforeHtml;
           focusTag.insertAdjacentHTML('beforebegin', outerHtml);
       }
       if (!highlighted) {
           textSelect.highlightSelection();
       }
       $('.highlight').each(function() {
           if ($(this).html() == '') {
               $(this).remove();
           }
       });
       selection.removeAllRanges();
   });
  }
  this.highlightSelection = function(){
    var selection;
     //Get the selected stuff
     if (window.getSelection)
         selection = window.getSelection();
     else if (typeof document.selection != "undefined")
         selection = document.selection;
     //Get a the selected content, in a range object
     var range = selection.getRangeAt(0);

     //If the range spans some text, and inside a tag, set its css class.
     if (range && !selection.isCollapsed) {
         if (selection.anchorNode.parentNode == selection.focusNode.parentNode) {
             var span = document.createElement('span');
             span.className = 'highlight';
             span.textContent = selection.toString();
             selection.deleteFromDocument();
             range.insertNode(span);
             //                        range.surroundContents(span);
         }
     }
  }
}

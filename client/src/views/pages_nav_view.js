var PagesNavView = function(container, noOfPages){
  this.container = container
  this.pageNumbers = noOfPages
}

PagesNavView.prototype = {
  renderNav: function(pageNumbers){
    for (var i = 1; i <= pageNumbers; i++){
      var pTag = document.createElement('p')
      pTag.innerText = i
      this.container.appendChild(pTag)
    }
  }
}

module.exports = PagesNavView


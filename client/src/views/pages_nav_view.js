var PagesNavView = function(container){
  this.container = container
  this.pageNumbers
}

PagesNavView.prototype = {
  renderNav: function(pageNumbers){
    this.pageNumbers = pageNumbers
    for (var i = 1; i <= pageNumbers; i++){
      var pTag = document.createElement('p')
      pTag.innerText = i
      this.container.appendChild(pTag)
    }
  }
}

module.exports = PagesNavView


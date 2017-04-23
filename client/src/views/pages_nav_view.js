var PagesNavView = function(container){
  this.container = container
  this.pageNumbers
  this.currentPage = 1
}

PagesNavView.prototype = {
  renderNav: function(pageNumbers){
    this.pageNumbers = pageNumbers

    var first = document.createElement('p')
    first.innerText = 'First'
    this.container.appendChild(first)

    for (var i = 1; i <= pageNumbers; i++){
      var pTag = document.createElement('p')
      pTag.innerText = i
      this.container.appendChild(pTag)
    }

    var last = document.createElement('p')
    last.innerText = 'Last'
    this.container.appendChild(last)
  }
}

module.exports = PagesNavView


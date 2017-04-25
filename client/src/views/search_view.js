var SearchView = function(container){
  this.container = container
}

SearchView.prototype = {
  render: function(){
    var searchBox = document.createElement('input')
    searchBox.id = 'search-box'
    searchBox.placeholder = 'Search'
    searchBox.setAttribute('type', 'text')

    // searchBox.backgroundImage = '/search.png'
    
    // searchBox.style.backgroundColor = 'transparent'

  
    this.container.appendChild(searchBox)
  }
}

module.exports = SearchView
var SearchView = function(container){
  this.container = container
  this.searchBox
}

SearchView.prototype = {
  render: function(){
    this.searchBox = document.createElement('input')
    this.searchBox.id = 'search-box'
    this.searchBox.placeholder = 'Search'
    this.searchBox.setAttribute('type', 'text')
    
  
    this.container.appendChild(this.searchBox)
  },

  attachListener: function(films, planetQuery, planetListView){
    this.searchBox.addEventListener('keydown', function(e){
      if (e.key === 'Enter'){
        var searchText = this.searchBox.value.split(' ')[0]
        console.log(searchText)
        //STRIP OUT SPECIAL CHARS AND WHITESPACE
        var url = 'https://swapi.co/api/planets/?search=' + searchText
        console.log(url)
        planetQuery.getData(url, films, function(planetList){
          planetListView.populateList(planetList)
        })
        
      }
      
    }.bind(this))
  }
}

module.exports = SearchView
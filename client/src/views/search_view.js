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
        //takes the first word of the search input before converting to lower case and stripping special characters. Planets with two-word names are accessed by searching for the first name only.
        var searchText = this.searchBox.value.split(' ')[0].toLowerCase().replace(/\W/g, '')
        var url = 'https://swapi.co/api/planets/?search=' + searchText
      
        planetQuery.getData(url, films, function(planetList){
          planetListView.populateList(planetList)
        })
      }
    }.bind(this))
  }
}

module.exports = SearchView
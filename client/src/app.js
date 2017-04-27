var PlanetQuery = require('./models/planet_query.js')
var FilmQuery = require('./models/film_query.js')
var PlanetListView = require('./views/planet_list_view.js')
var PagesNavView = require('./views/pages_nav_view.js')
var SearchView = require('./views/search_view.js')

app = function(){
  
  var planetQuery = new PlanetQuery()
  var filmQuery = new FilmQuery()

  var searchSection = document.querySelector('#search-section')
  var searchView = new SearchView(searchSection)
  searchView.render()

  var planetListContainer = document.querySelector('#planet-list')
  var sortableColumnHeaders = ['name', 'population', 'diameter', 'rotation period', 'orbital period']
  var unsortableColumnHeaders = ['terrain', 'films']
  var planetListView = new PlanetListView(planetListContainer, sortableColumnHeaders, unsortableColumnHeaders)

  var pagesNavContainer = document.querySelector('#pages-nav')
  var pagesNavView = new PagesNavView(pagesNavContainer)
  
  //RETRIEVES FILM NAMES FROM API, BEFORE RETRIEVING PLANET DETAILS AND POPULATING THE PAGE
  filmQuery.getFilmData(function(films){
    planetQuery.getData('http://swapi.co/api/planets', films, function(planetList, noOfPages){
      planetListView.populateList(planetList, planetQuery, films)
      pagesNavView.renderNav(noOfPages)
      pagesNavView.attachListeners(films, planetQuery, planetListView)
      searchView.attachListener(films, planetQuery, planetListView, pagesNavView)
    })
  })
  
}


window.onload = app
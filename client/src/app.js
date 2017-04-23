var PlanetQuery = require('./models/planet_query.js')
var FilmQuery = require('./models/film_query.js')
var PlanetListView = require('./views/planet_list_view.js')

app = function(){
  console.log('running')
  var planetQuery = new PlanetQuery()
  var filmQuery = new FilmQuery()

  var planetListContainer = document.querySelector('#planet-list')
  var planetListView = new PlanetListView(planetListContainer)
  
  
  filmQuery.getFilmData(function(films){
    planetQuery.getData('http://swapi.co/api/planets', films, function(planetList){
      planetListView.populateList(planetList)
    })
  })


}


window.onload = app
var PlanetQuery = require('./models/planet_query.js')
var FilmQuery = require('./models/film_query.js')

app = function(){
  console.log('running')
  var planetQuery = new PlanetQuery()
  var filmQuery = new FilmQuery()
  
  
  filmQuery.getFilmData(function(films){
    planetQuery.getData('http://swapi.co/api/planets', films)
  })
}


window.onload = app
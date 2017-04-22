var PlanetQuery = require('./models/planet_query.js')

app = function(){
  console.log('running')
  var planetQuery = new PlanetQuery('http://swapi.co/api/planets')
  planetQuery.getInitialData()
}


window.onload = app
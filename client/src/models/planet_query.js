var Planet = require('./planet.js')
var PlanetList = require('./planet_list.js')


var PlanetQuery = function(){
  this.processedPlanets = []
  this.allPlanetLists = []
  this.url = 'http://swapi.co/api/planets'
  this.pages = 1
}

PlanetQuery.prototype = {
  getInitialData: function(filmInfo){
    var request = new XMLHttpRequest()
    request.open('GET', this.url)
    request.onload = function(){
      if (request.status === 200){
        var response = request.responseText
        var planetInfo = JSON.parse(response)
        var planetsWithoutFilmTitles = this.convertJsonObjectsToPlanets(planetInfo.results)
        this.populateFilmNames(planetsWithoutFilmTitles, filmInfo)

        this.pages = Math.ceil(planetInfo.count / 10)
      }
    }.bind(this)
    request.send()
  },

  populateFilmNames: function(planets, filmData){
    var planetList = new PlanetList([])
    planets.forEach(function(planet){
      for (var i = 0; i < planet.films.length; i++){
        var filmLink = planet.films[i]
        planet.films[i] = filmData[filmLink] 
      }
      planetList.planets.push(planet)
    }.bind(this))
    this.allPlanetLists.push(planetList)
    console.log(this.allPlanetLists)
  },

  convertJsonObjectsToPlanets: function(jsonPlanets){
    var planets = []
    jsonPlanets.forEach(function(planetInfo){
      var planet = new Planet(planetInfo)
      planets.push(planet)
    }.bind(this))
    return planets
  }
}

module.exports = PlanetQuery
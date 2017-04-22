var Planet = require('./planet.js')


var PlanetQuery = function(url){
  this.allPlanetLists = []
  this.url = url
}

PlanetQuery.prototype = {
  getData: function(){
    var request = new XMLHttpRequest()
    request.open('GET', this.url)
    request.onload = function(){
      if (request.status === 200){
        var response = request.responseText
        var planetInfo = JSON.parse(response)
        this.planets = this.convertJsonObjectsToPlanets(planetInfo.results)
        console.log(this.planets)
      }
    }.bind(this)
    request.send()
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
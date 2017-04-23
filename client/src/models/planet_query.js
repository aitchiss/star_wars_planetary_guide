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

        //processPlanets function guides the retrieved planets through the process of obtaining film titles.

        //it then adds a processed PlanetList to its array of PlanetLists, and clears the processed planets array, ready to be used for processing further planets
        // this.processPlanets(unprocessedPlanets, function(processedPlanets){
        //   this.allPlanetLists.push(new PlanetList(this.processedPlanets))
        //   this.processedPlanets = []
        // }.bind(this))
        // this.allPlanetLists.push(new PlanetList(unprocessedPlanets))
        // console.log(this.allPlanetLists)
        this.pages = Math.ceil(planetInfo.count / 10)
      }
    }.bind(this)
    request.send()
  },

  populateFilmNames: function(planets, filmData){
    console.log('working with: ', planets, filmData)
    
  },

  // checkFilmTitles: function(planetList, callback, newPlanetList){
  //   for (var planet of planetList){
  //     planet.films.forEach(function(film, index){
  //       this.retrieveFilmTitle(film, newPlanetList, function(title, newPlanetList){
  //         planet.films[index] = title
  //         console.log('film title: ', title)
  //         this.processedPlanets.push(planet)
  //         console.log('processed planets', this.processedPlanets)
  //       }.bind(this))
        
  //     }.bind(this))
      
  //   }
  //   console.log(newPlanetList)
  //   callback(newPlanetList)
  // },

  // retrieveFilmTitle: function(filmUrl, newPlanetList, callbackToAddTitle){
  //   var request = new XMLHttpRequest()
  //   request.open('GET', filmUrl)
  //   request.onload = function(){
  //     if (request.status === 200){
  //       var response = request.responseText
  //       var filmInfo = JSON.parse(response)
  //       console.log('api response', filmInfo.title)
  //       callbackToAddTitle(filmInfo.title, newPlanetList)
  //     }
  //   }.bind(this)
  //   request.send()
  // },
 

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
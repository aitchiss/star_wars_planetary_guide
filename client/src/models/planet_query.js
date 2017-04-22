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
        var planets = JSON.parse(response)
        this.planets = planets.results
        console.log(this.planets)
      }
    }.bind(this)
    request.send()
  }
}

module.exports = PlanetQuery
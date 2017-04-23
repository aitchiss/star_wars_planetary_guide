var PlanetListView = function(container){
  this.container = container
}

PlanetListView.prototype = {
  populateList: function(planetList){
    planetList.planets.forEach(function(planet){
      var pTag = document.createElement('p')
      pTag.innerText = planet.name
      this.container.appendChild(pTag)
    }.bind(this))
  }
}

module.exports = PlanetListView
var PlanetList = function(planetsArray){
  this.planets = planetsArray
}

PlanetList.prototype = {
  sortAscending: function(sortKey){
      if (sortKey === 'name'){
        this.planets.sort(function(a, b){
          return a.name = b.name
        })
      }
  }
}


module.exports = PlanetList
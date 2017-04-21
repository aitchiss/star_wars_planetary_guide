var PlanetList = function(planetsArray){
  this.planets = planetsArray
}

PlanetList.prototype = {
  sortAscending: function(sortKey){
      if (sortKey === 'name'){
        this.planets.sort(this.compareNamesAsc)
      } else if (sortKey === 'population'){
        this.planets.sort(function(a, b){
          return a.population - b.population
        })
      }
  },

  sortDescending: function(sortKey){
    if (sortKey === 'name'){
      this.planets.sort(this.compareNamesDesc)
    }
  },

  compareNamesAsc: function(a, b){
    var nameA = a.name.toLowerCase()
    var nameB = b.name.toLowerCase()
    if (nameA < nameB){
      return -1
    } else if (nameA > nameB){
      return 1
    } else {
      return 0
    }
  },

  compareNamesDesc: function(a, b){
    var nameA = a.name.toLowerCase()
    var nameB = b.name.toLowerCase()
    if (nameA < nameB){
      return 1
    } else if (nameA > nameB){
      return -1
    } else {
      return 0
    }
  }

}


module.exports = PlanetList
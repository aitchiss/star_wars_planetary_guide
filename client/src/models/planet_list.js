var PlanetList = function(planetsArray){
  this.planets = planetsArray
}

PlanetList.prototype = {
  sortAscending: function(sortKey){

    switch (sortKey){
      case 'name':
        this.planets.sort(this.compareNamesAsc)
        break
      case 'population':
        this.planets.sort(function(a, b){
          if (a.population === 'unknown'){
            return 1
          } else if (b.population === 'unknown'){
            return -1
          } else {
            return a.population - b.population
          }
          
        })
        break
      case 'diameter':
        this.planets.sort(function(a, b){
          if (a.diameter === 'unknown'){
            return 1
          } else if (b.diameter === 'unknown'){
            return -1
          } else {
            return a.diameter - b.diameter
          }
          
        })
        break
      case 'rotation period':
        this.planets.sort(function(a, b){
          if (a.rotationPeriod === 'unknown'){
            return 1
          } else if (b.rotationPeriod === 'unknown'){
            return -1
          } else {
            return a.rotationPeriod - b.rotationPeriod
          }
          
        })
        break
      case 'orbital period':
        this.planets.sort(function(a, b){
          if (a.orbitalPeriod === 'unknown'){
            return 1
          } else if (b.orbitalPeriod === 'unknown'){
            return -1
          } else {
            return a.orbitalPeriod - b.orbitalPeriod
          }
          
        })
        break
    }
     
  },

  sortDescending: function(sortKey){

    switch (sortKey){
      case 'name':
        this.planets.sort(this.compareNamesDesc)
        break
      case 'population':
        this.planets.sort(function(a, b){
          if (a.population === 'unknown'){
            return 1
          } else if (b.population === 'unknown'){
            return -1
          } else {
            return b.population - a.population
          }
          
        })
        break
      case 'diameter':
        this.planets.sort(function(a, b){
          if (a.diameter === 'unknown'){
            return 1
          } else if (b.diameter === 'unknown'){
            return -1
          } else {
            return b.diameter - a.diameter
          }
        })
        break
      case 'rotation period':
        this.planets.sort(function(a, b){
          if (a.rotationPeriod === 'unknown'){
            return 1
          } else if (b.rotationPeriod === 'unknown'){
            return -1
          } else {
            return b.rotationPeriod - a.rotationPeriod
          }
        })
        break
      case 'orbital period':
        this.planets.sort(function(a, b){
          if(a.orbitalPeriod === 'unknown'){
            return 1
          } else if (b.orbitalPeriod === 'unknown'){
            return -1
          } else {
            return b.orbitalPeriod - a.orbitalPeriod
          }
          
        })
        break
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
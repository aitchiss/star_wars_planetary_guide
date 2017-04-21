var Planet = function(params){
  this.name = params.name
  this.population = parseInt(params.population) || 'unknown'
  this.diameter = parseInt(params.diameter) || 'unknown'
  this.rotationPeriod = parseInt(params.rotation_period) || 'unknown'
  this.orbitalPeriod = parseInt(params.orbital_period) || 'unknown'
  this.terrains = this.parseTerrains(params.terrain)
  this.films = params.films
}

Planet.prototype = {
  parseTerrains: function(terrainString){
    var terrainArray = terrainString.split(',')
    return terrainArray
  }
}

module.exports = Planet
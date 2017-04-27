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
  },

  checkAllAttributesUnknown: function(){
    if (this.name !== 'unknown') return false
    if (this.population !== 'unknown') return false
    if (this.diameter !== 'unknown') return false
    if (this.rotationPeriod !== 'unknown') return false
    if (this.orbitalPeriod !== 'unknown') return false
    if (this.terrains[0] !== 'unknown') return false
    if (this.films.length > 0) return false
    return true
  }
}

module.exports = Planet
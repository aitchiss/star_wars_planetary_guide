var Planet = function(params){
  this.name = params.name
  this.population = parseInt(params.population) || 'unknown'
  this.diameter = parseInt(params.diameter) || 'unknown'
}

module.exports = Planet
var assert = require('assert')
var Planet = require('../planet.js')

describe('Planet tests:', function(){

  var planet
  var unknownValuesPlanet

  beforeEach(function(){
    planet = new Planet({
      name: 'Tatooine',
      population: '200',
      diameter: '4500'
    })

    unknownValuesPlanet = new Planet({
      name: 'unknown',
      population: 'unknown',
      diameter: 'unknown'
    })
  })

  it('has a name', function(){
    assert.strictEqual('Tatooine', planet.name)
  })

  it('has a population', function(){
    assert.strictEqual(200, planet.population)
  })

  it('reflects unknown population value if no numeric population given', function(){
    assert.strictEqual('unknown', unknownValuesPlanet.population)
  })

  it('has a diameter', function(){
    assert.strictEqual(4500, planet.diameter)
  })

})
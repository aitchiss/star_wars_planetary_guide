var assert = require('assert')
var Planet = require('../planet.js')

describe('Planet tests:', function(){

  var planet
  var unknownValuesPlanet

  beforeEach(function(){
    planet = new Planet({
      name: 'Tatooine',
      population: '200',
      diameter: '4500',
      rotation_period: '42'
    })

    unknownValuesPlanet = new Planet({
      name: 'unknown',
      population: 'unknown',
      diameter: 'unknown',
      rotation_period: 'unknown'
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

  it('reflects unknown diameter value if no numeric diameter given', function(){
    assert.strictEqual('unknown', unknownValuesPlanet.diameter)
  })

  it('has a rotation period, if known', function(){
    assert.strictEqual(42, planet.rotationPeriod)
  })

  it('reflects unknown rotation period value if no value given', function(){
    assert.strictEqual('unknown', unknownValuesPlanet.rotationPeriod)
  })

})
var assert = require('assert')
var Planet = require('../planet.js')

describe('Planet tests:', function(){

  var planet

  beforeEach(function(){
    planet = new Planet({
      name: 'Tatooine',
      population: '200'
    })
  })

  it('has a name', function(){
    assert.strictEqual('Tatooine', planet.name)
  })

  it('has a population', function(){
    assert.strictEqual('200', planet.population)
  })

})
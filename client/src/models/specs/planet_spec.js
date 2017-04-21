var assert = require('assert')
var Planet = require('../planet.js')

describe('Planet tests:', function(){

  var planet

  beforeEach(function(){
    planet = new Planet({
      name: 'Tatooine'
    })
  })

  it('has a name', function(){
    assert.strictEqual('Tatooine', planet.name)
  })

})
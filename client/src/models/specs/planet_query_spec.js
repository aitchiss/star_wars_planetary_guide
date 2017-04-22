var assert = require('assert')
var Planet = require('../planet.js')
var PlanetList = require('../planet_list.js')
var PlanetQuery = require('../planet_query.js')

describe('PlanetQuery tests:', function(){

  var planetQuery

  beforeEach(function(){
    planetQuery = new PlanetQuery()
  })

  it('starts with empty array of planet lists', function(){
    assert.deepEqual([], planetQuery.allPlanetLists)
  })

})
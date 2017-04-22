var assert = require('assert')
var Planet = require('../planet.js')
var PlanetList = require('../planet_list.js')
var PlanetQuery = require('../planet_query.js')

describe('PlanetQuery tests:', function(){

  var planetQuery

  beforeEach(function(){
    planetQuery = new PlanetQuery('http://swapi.co/api/planets')
  })

  it('starts with empty array of planet lists', function(){
    assert.deepEqual([], planetQuery.allPlanetLists)
  })

  it('initializes with a reference to required API url', function(){
    assert.strictEqual('http://swapi.co/api/planets', planetQuery.url)
  })

  // it('can retrieve a page of planets from API', function(){
  //   planetQuery.getData()
  // })

})
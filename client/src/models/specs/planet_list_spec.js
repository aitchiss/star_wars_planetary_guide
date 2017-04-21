var assert = require('assert')
var Planet = require('../planet.js')
var PlanetList = require('../planet_list.js')

describe('PlanetList tests: ', function(){

  var planetList

  beforeEach(function(){

    var planet1 = new Planet({
      name: 'Tatooine',
      population: '200',
      diameter: '4500',
      rotation_period: '42',
      orbital_period: '321',
      terrain: 'rainforests, rivers, mountains',
      films: ['Clone Wars', 'A New Hope']
    })

    var planet2 = new Planet({
      name: 'Alderaan',
      population: '500',
      diameter: '2500',
      rotation_period: '4',
      orbital_period: '183',
      terrain: 'desert',
      films: ['Empire Strikes Back', 'Clone Wars', 'A New Hope']
    })

    var planet3 = new Planet({
      name: 'Endor',
      population: '20',
      diameter: '3200',
      rotation_period: '182',
      orbital_period: '431',
      terrain: 'rainforests, rivers',
      films: ['Return of the Jedi']
    })

    var planets = []
    planets.push(planet1)
    planets.push(planet2)
    planets.push(planet3)

    planetList = new PlanetList(planets)
  })

  it('holds an array of planets', function(){
    assert.strictEqual(3, planetList.planets.length)
  })

  it('can sort planets by name a-z', function(){
    planetList.sortAscending('name')
    assert.strictEqual('Alderaan', planetList.planets[0].name)
    assert.strictEqual('Endor', planetList.planets[1].name)
  })

  it('can sort by name z-a', function(){
    planetList.sortDescending('name')
    assert.strictEqual('Alderaan', planetList.planets[2].name)
    assert.strictEqual('Endor', planetList.planets[1].name)
  })

  it('can sort by population - ascending', function(){
    planetList.sortAscending('population')
    assert.strictEqual('Endor', planetList.planets[0].name)
    assert.strictEqual('Tatooine', planetList.planets[1].name)
  })

  it('can sort by population - descending', function(){
    planetList.sortDescending('population')
    assert.strictEqual('Endor', planetList.planets[2].name)
    assert.strictEqual('Tatooine', planetList.planets[1].name)
  })

  it('can sort by diameter - ascending', function(){
    planetList.sortAscending('diameter')
    assert.strictEqual('Alderaan', planetList.planets[0].name)
    assert.strictEqual('Endor', planetList.planets[1].name)
  })

  it('can sort by diameter - descending', function(){
    planetList.sortDescending('diameter')
    assert.strictEqual('Tatooine', planetList.planets[0].name)
    assert.strictEqual('Endor', planetList.planets[1].name)
  })

})
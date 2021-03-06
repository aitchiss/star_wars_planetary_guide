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

    var unknownValuesPlanet = new Planet({
      name: 'unknown',
      population: 'unknown',
      diameter: 'unknown',
      rotation_period: 'unknown',
      orbital_period: 'unknown',
      terrain: 'unknown'
    })

    var planets = []
    planets.push(planet1)
    planets.push(planet2)
    planets.push(planet3)
    planets.push(unknownValuesPlanet)

    planetList = new PlanetList(planets)
  })

  it('holds an array of planets', function(){
    assert.strictEqual(4, planetList.planets.length)
  })

  ///SORTING BY  NAME

  it('can sort planets by name a-z', function(){
    planetList.sortAscending('name')
    assert.strictEqual('Alderaan', planetList.planets[0].name)
    assert.strictEqual('Endor', planetList.planets[1].name)
  })

  it('can sort by name z-a', function(){
    planetList.sortDescending('name')
    assert.strictEqual('Alderaan', planetList.planets[3].name)
    assert.strictEqual('Endor', planetList.planets[2].name)
  })

  ///SORTING BY POPULATION

  it('can sort by population - ascending', function(){
    planetList.sortAscending('population')
    assert.strictEqual('Endor', planetList.planets[0].name)
    assert.strictEqual('Tatooine', planetList.planets[1].name)
  })

  it('places unknown population last when sorted asc', function(){
    planetList.sortAscending('population')
    assert.strictEqual('unknown', planetList.planets[3].name)
  })

  it('can sort by population - descending', function(){
    planetList.sortDescending('population')
    assert.strictEqual('Endor', planetList.planets[2].name)
    assert.strictEqual('Tatooine', planetList.planets[1].name)
  })

  it('places unknown population last when sorted desc', function(){
    planetList.sortDescending('population')
    assert.strictEqual('unknown', planetList.planets[3].name)
  })

  ///SORTING BY DIAMETER

  it('can sort by diameter - ascending', function(){
    planetList.sortAscending('diameter')
    assert.strictEqual('Alderaan', planetList.planets[0].name)
    assert.strictEqual('Endor', planetList.planets[1].name)
  })

  it('places unknown diameter last when sorting ascending', function(){
    planetList.sortAscending('diameter')
    assert.strictEqual('unknown', planetList.planets[3].name)
  })

  it('can sort by diameter - descending', function(){
    planetList.sortDescending('diameter')
    assert.strictEqual('Tatooine', planetList.planets[0].name)
    assert.strictEqual('Endor', planetList.planets[1].name)
  })

  it('places unknown diameter last when sorting descending', function(){
    planetList.sortDescending('diameter')
    assert.strictEqual('unknown', planetList.planets[3].name)
  })

 ///SORTING BY ROTATION PERIOD

 it('can sort by rotation period - ascending', function(){
   planetList.sortAscending('rotation period')
   assert.strictEqual('Alderaan', planetList.planets[0].name)
   assert.strictEqual('Tatooine', planetList.planets[1].name)
 })

 it('places unknown rotation period last when sorting ascending', function(){
   planetList.sortAscending('rotation period')
   assert.strictEqual('unknown', planetList.planets[3].name)
 })

 it('can sort by rotation period - descending', function(){
   planetList.sortDescending('rotation period')
   assert.strictEqual('Endor', planetList.planets[0].name)
   assert.strictEqual('Tatooine', planetList.planets[1].name)
 })

 it('places unknown rotation period last when sorting descending', function(){
   planetList.sortDescending('rotation period')
   assert.strictEqual('unknown', planetList.planets[3].name)
 })


 ///SORTING BY ORBITAL PERIOD

 it('can sort by orbital period - ascending', function(){
   planetList.sortAscending('orbital period')
   assert.strictEqual('Alderaan', planetList.planets[0].name)
   assert.strictEqual('Tatooine', planetList.planets[1].name)
 })

 it('places unknown orbital period last when sorting ascending', function(){
   planetList.sortAscending('orbital period')
   assert.strictEqual('unknown', planetList.planets[3].name)
 })

 it('can sort by orbital period - descending', function(){
   planetList.sortDescending('orbital period')
   assert.strictEqual('Endor', planetList.planets[0].name)
   assert.strictEqual('Tatooine', planetList.planets[1].name)
 })

 it('places unknown orbital period last when sorting descending', function(){
   planetList.sortDescending('orbital period')
   assert.strictEqual('unknown', planetList.planets[3].name)
 })

})
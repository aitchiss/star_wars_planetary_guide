var PlanetListView = function(container){
  this.container = container
}

PlanetListView.prototype = {
  populateList: function(planetList){
    this.createTable(planetList)
    
  },

  createTable: function(planetList){
    var table = document.createElement('div')
    table.id = 'planet-flex-grid'

    var colHeaders = ['name', 'population', 'diameter', 'rotation period', 'orbital period', 'terrain', 'films']

    colHeaders.forEach(function(colHeader){
      var column = document.createElement("div")
      column.classList.add('col')
      var id = colHeader.replace(/\s/g,'')
      column.id = id
      var heading = document.createElement('h5')
      heading.innerText = colHeader
      column.appendChild(heading)
      table.appendChild(column)
    }.bind(this))

    this.container.appendChild(table)

    planetList.planets.forEach(function(planet){
      //add name to name column
      this.addPlanetName(planet.name)
      //add pop to pop column
      this.addPopulation(planet.population)
      //add diameter to diameter column
      this.addDiameter(planet.diameter)
      //add rotation period to rotation column
      this.addRotationPeriod(planet.rotationPeriod)
      //add orbital period to orbital column
      this.addOrbitalPeriod(planet.orbitalPeriod)
      //add terrains to terrain column
      this.addTerrains(planet.terrains)
      //add films
      this.addFilms(planet.films)
    }.bind(this))

    
  },

  addFilms: function(films){
    var column = document.querySelector('#films')
    var ul = document.createElement('ul')
    films.forEach(function(film){
      var li = document.createElement('li')
      li.innerText = film
      ul.appendChild(li)
    })
    column.appendChild(ul)
  },

  addTerrains: function(terrains){
    var column = document.querySelector('#terrain')
    var ul = document.createElement('ul')
    terrains.forEach(function(terrain){
      var li = document.createElement('li')
      li.innerText = terrain
      ul.appendChild(li)
    })
    column.appendChild(ul)
  },

  addOrbitalPeriod: function(orbitalPeriod){
    var column = document.querySelector('#orbitalperiod')
    var pTag = document.createElement('p')
    pTag.innerText = orbitalPeriod
    column.appendChild(pTag)
  },

  addRotationPeriod: function(rotationPeriod){
    var column = document.querySelector('#rotationperiod')
    var pTag = document.createElement('p')
    pTag.innerText = rotationPeriod
    column.appendChild(pTag)
  },

  addDiameter: function(diameter){
    var column = document.querySelector('#diameter')
    var pTag = document.createElement('p')
    pTag.innerText = diameter
    column.appendChild(pTag)
  },

  addPlanetName: function(name){
    var column = document.querySelector('#name')
    var pTag = document.createElement('p')
    pTag.innerText = name
    column.appendChild(pTag)
  },

  addPopulation: function(population){
    var column = document.querySelector('#population')
    var pTag = document.createElement('p')
    pTag.innerText = population
    column.appendChild(pTag)
  },

  

}

module.exports = PlanetListView
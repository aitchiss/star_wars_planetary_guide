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

    var headingRow = document.createElement('div')
    headingRow.classList.add('row')

    colHeaders.forEach(function(colHeader){
      var heading = document.createElement('p')
      heading.innerText = colHeader
      headingRow.appendChild(heading)
      
    }.bind(this))

    table.appendChild(headingRow)
    this.container.appendChild(table)

    planetList.planets.forEach(function(planet){
      var planetRow = document.createElement('div')
      planetRow.classList.add('row')
      //add planet details to each row
      this.addPlanetName(planet.name, planetRow)
      this.addPopulation(planet.population, planetRow)
      this.addDiameter(planet.diameter, planetRow)
      this.addRotationPeriod(planet.rotationPeriod, planetRow)
      this.addOrbitalPeriod(planet.orbitalPeriod, planetRow)
      this.addTerrains(planet.terrains, planetRow)
      this.addFilms(planet.films, planetRow)

      table.appendChild(planetRow)
    }.bind(this))

    
  },

  addFilms: function(films, planetRow){
    var ul = document.createElement('ul')
    films.forEach(function(film){
      var li = document.createElement('li')
      li.innerText = film
      ul.appendChild(li)
    })
    planetRow.appendChild(ul)
  },

  addTerrains: function(terrains, planetRow){
    var ul = document.createElement('ul')
    terrains.forEach(function(terrain){
      var li = document.createElement('li')
      li.innerText = terrain
      ul.appendChild(li)
    })
    planetRow.appendChild(ul)
  },

  addOrbitalPeriod: function(orbitalPeriod, planetRow){
    var pTag = document.createElement('p')
    pTag.innerText = orbitalPeriod
    planetRow.appendChild(pTag)
  },

  addRotationPeriod: function(rotationPeriod, planetRow){
    var pTag = document.createElement('p')
    pTag.innerText = rotationPeriod
    planetRow.appendChild(pTag)
  },

  addDiameter: function(diameter, planetRow){
    var pTag = document.createElement('p')
    pTag.innerText = diameter
    planetRow.appendChild(pTag)
  },

  addPlanetName: function(name, planetRow){
    var pTag = document.createElement('p')
    pTag.innerText = name
    planetRow.appendChild(pTag)
  },

  addPopulation: function(population, planetRow){
    var pTag = document.createElement('p')
    pTag.innerText = population
    planetRow.appendChild(pTag)
  },

  

}

module.exports = PlanetListView
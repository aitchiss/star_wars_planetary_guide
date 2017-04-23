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
      column.id = colHeader
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
    }.bind(this))

    
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
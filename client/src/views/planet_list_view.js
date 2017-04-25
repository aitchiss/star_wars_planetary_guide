var PlanetListView = function(container){
  this.container = container
  this.planetList 
}

PlanetListView.prototype = {
  populateList: function(planetList){
    //CLEAR ANY PREVIOUS DATA
    while (this.container.hasChildNodes()){
      this.container.removeChild(this.container.firstChild)
    }

    //RENDER NEW DATA
    this.createTable(planetList)
    
  },

  refreshWithSortedData: function(planetList){
    //CLEAR THE TABLE
    var table = document.querySelector('#planet-flex-grid')
    var tableChildren = table.childNodes

    while(table.childNodes.length > 1){
      table.removeChild(table.lastChild)
    }

    //SET UP ONLY THE ELEMENT WE WANT TO REFRESH
    planetList.planets.forEach(function(planet, index){
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

      if (index % 2 === 0){
        planetRow.classList.add('contrast-color')
      } else {
        planetRow.classList.add('no-contrast')
      }

      table.appendChild(planetRow)
    }.bind(this))
  },

  createTable: function(planetList){
    this.planetList = planetList
    var table = document.createElement('div')
    table.id = 'planet-flex-grid'

    var colHeaders = ['name', 'population', 'diameter', 'rotation period', 'orbital period', 'terrain', 'films']

    var headingRow = document.createElement('div')
    headingRow.classList.add('row')
    headingRow.classList.add('heading')

    colHeaders.forEach(function(colHeader){
      var heading = document.createElement('p')
      heading.innerText = colHeader
      heading.classList.add('asc-false')
      this.addSortingEventListeners(heading)
      headingRow.appendChild(heading)
      
    }.bind(this))

    table.appendChild(headingRow)
    this.container.appendChild(table)

    planetList.planets.forEach(function(planet, index){
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

      if (index % 2 === 0){
        planetRow.classList.add('contrast-color')
      } else {
        planetRow.classList.add('no-contrast')
      }


      table.appendChild(planetRow)
    }.bind(this))

    table.lastChild.classList.add('final-row')
    
  },

  addSortingEventListeners: function(heading){
    //ADD EVENT LISTENER FOR SORTING
    heading.addEventListener('click', function(){
      if (heading.classList.toggle('asc-false')){
        this.planetList.sortDescending(heading.innerText.toLowerCase())
        this.refreshWithSortedData(this.planetList)
      } else {
        this.planetList.sortAscending(heading.innerText.toLowerCase())
        this.refreshWithSortedData(this.planetList)
      }
      
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
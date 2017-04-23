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
    }.bind(this))

    
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

  // addPlanetData: function(planet, table){
  //   //create a row div
  //   var planetRow = document.createElement('div')
  //   planetRow.classList.add('planet-row')

  //   //populate the single elements, add to a row div
  //   var singleTextElements = ['name', 'population', 'diameter', 'rotationPeriod', 'orbitalPeriod']
  //   singleTextElements.forEach(function(element){
  //     //create a box for the info
  //     var dataDiv = document.createElement('div')
  //     //add a text element
  //     var text = document.createElement('p')
  //     text.innerText = planet[element]
  //     //append the text element to the box
  //     dataDiv.appendChild(text)
  //     //append the box to the planet row
  //     planetRow.appendChild(dataDiv)
  //   }.bind(this))

  //   //populate the multiple elements, add to the row div

  //   //attach the row div to the table div
  //   table.appendChild(planetRow)
  // },

  // addTableHeaders: function(tableDiv){
  //   var elements = ['name', 'population', 'diameter', 'rotation period', 'orbital period', 'terrain', 'films']
  //   var row = document.createElement('div')
  //   row.classList.add('headings')
  //   elements.forEach(function(element){
  //     var elementDiv = document.createElement('div')
  //     elementDiv.classList.add('indivdual-heading')
  //     var text = document.createElement('p')
  //     text.innerText = element
  //     elementDiv.appendChild(text)
  //     row.appendChild(elementDiv)
  //   }.bind(this))
  //   tableDiv.appendChild(row)
  // },

}

module.exports = PlanetListView
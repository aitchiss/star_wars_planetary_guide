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

    while(table.childNodes.length > 2){
      table.removeChild(table.lastChild)
    }

    //SET UP ONLY THE ELEMENT WE WANT TO REFRESH
    planetList.planets.forEach(function(planet, index){
      var planetRow = this.createPlanetDataRow(planet, index)
      // var planetRow = document.createElement('div')
      // planetRow.classList.add('row')
      // //add planet details to each row
      // this.addPlanetName(planet.name, planetRow)
      // this.addPopulation(planet.population, planetRow)
      // this.addDiameter(planet.diameter, planetRow)
      // this.addRotationPeriod(planet.rotationPeriod, planetRow)
      // this.addOrbitalPeriod(planet.orbitalPeriod, planetRow)
      // this.addTerrains(planet.terrains, planetRow)
      // this.addFilms(planet.films, planetRow)

      // if (index % 2 === 0){
      //   planetRow.classList.add('contrast-color')
      // } else {
      //   planetRow.classList.add('no-contrast')
      // }

      table.appendChild(planetRow)

    }.bind(this))
    table.lastChild.classList.add('final-row')
  },

  createTable: function(planetList){
    this.planetList = planetList
    var table = document.createElement('div')
    table.id = 'planet-flex-grid'

    //CREATE THE HEADERS
    var colHeaders = ['name', 'population', 'diameter', 'rotation period', 'orbital period', 'terrain', 'films']

    var headingRow = document.createElement('div')
    headingRow.classList.add('row')
    headingRow.classList.add('heading')

    colHeaders.forEach(function(colHeader){
      var heading = document.createElement('p')
      heading.innerText = colHeader
      heading.classList.add('asc-false')

      if(colHeader !== 'terrain' && colHeader !== 'films'){
        heading.classList.add('sortable')
        this.addSortingEventListeners(heading)
        headingRow.appendChild(heading)
        
      } else {
        headingRow.appendChild(heading)

      }
      
      
      
    }.bind(this))

    //add alternative heading for mobile layout
    var altHeading = document.createElement('div')
    altHeading.classList.add('alt-heading')
    altHeadingText = document.createElement('p')
    altHeadingText.innerText = 'PLANETS'
    altHeading.appendChild(altHeadingText)
    table.appendChild(altHeading)

    //append the normal heading and add everything to table

    table.appendChild(headingRow)
    this.container.appendChild(table)



    //add planet info

    planetList.planets.forEach(function(planet, index){
      //create the div that holds the mobile header and the data row
      var headerAndDataDiv = document.createElement('div')
      headerAndDataDiv.classList.add('header-and-data')

      //create a header row
      var mobileHeader = document.createElement('div')
      mobileHeader.classList.add('mobile-header'
        )

      //attach the non-list item headers
      var colHeaders = ['name', 'population', 'diameter', 'rotation period', 'orbital period']
      colHeaders.forEach(function(element){
        var heading = document.createElement('p')
        heading.innerText = element
        mobileHeader.appendChild(heading)
      }.bind(this))

      //attach the list item headers individually
      var terrainHeading = document.createElement('p')
      terrainHeading.innerText = 'terrain'
      terrainHeading.id = 'terrain-mobile-heading'
      mobileHeader.appendChild(terrainHeading)

      var filmsHeading = document.createElement('p')
      filmsHeading.innerText = 'films'
      filmsHeading.id = 'films-mobile-heading'
      mobileHeader.appendChild(filmsHeading)

      //add the mobile header to the header and data div
      headerAndDataDiv.appendChild(mobileHeader)

      var planetRow = this.createPlanetDataRow(planet, index)
      
      headerAndDataDiv.appendChild(planetRow)
      table.appendChild(headerAndDataDiv)
    }.bind(this))

    table.lastChild.lastChild.classList.add('final-row')
    
  },

  createPlanetDataRow: function(planet, index){
    var planetRow = document.createElement('div')
    planetRow.classList.add('row')
    //add planet details to each row
    this.createPTagAndAppend(planet.name, planetRow)
    this.createPTagAndAppend(planet.population, planetRow)
    this.createPTagAndAppend(planet.diameter, planetRow)
    this.createPTagAndAppend(planet.rotationPeriod, planetRow)
    this.createPTagAndAppend(planet.orbitalPeriod, planetRow)
    this.createListAndAppend(planet.terrains, planetRow)
    this.createListAndAppend(planet.films, planetRow)

    if (index % 2 === 0){
      planetRow.classList.add('contrast-color')
    } else {
      planetRow.classList.add('no-contrast')
    }

    return planetRow
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


  //TAKES A SET OF ITEMS, CREATES A LIST AND APPENDS TO THE ROW GIVEN
  createListAndAppend: function(items, planetRow){
    var ul = document.createElement('ul')
    items.forEach(function(item){
      var li = document.createElement('li')
      li.innerText = item
      ul.appendChild(li)
    })
    planetRow.appendChild(ul)
  },


  //TAKES TEXT, CREATES A <P> ELEMENT AND APPENDS TO THE ROW GIVEN
  createPTagAndAppend: function(text, planetRow){
    var pTag = document.createElement('p')
    pTag.innerText = text
    planetRow.appendChild(pTag)
  }

}

module.exports = PlanetListView
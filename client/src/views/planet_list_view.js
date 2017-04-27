var PlanetListView = function(container, sortableColumnHeaders, unsortableColumnHeaders){
  this.container = container
  this.sortableColHeaders = sortableColumnHeaders
  this.unsortableColHeaders = unsortableColumnHeaders
  this.planetList 
}

PlanetListView.prototype = {
    //CALLED BY THE PLANETQUERY ONCE DATA RECEIVED FROM API
  populateList: function(planetList){
    //saves the planet list
    this.planetList = planetList
    //clears any previous data
    while (this.container.hasChildNodes()){
      this.container.removeChild(this.container.firstChild)
    }

    if (this.planetList.planets.length === 0){
      //displays error message if no data found for search, and after 3 seconds reloads the page
      var nothingFound = 'Sorry, no planets matched your search'
      this.createPTagAndAppend(nothingFound, this.container, 'empty-search-result')
      setTimeout(function(){ location.reload() }, 3000)
    } else {
      //renders new data
      this.createTable()
    }
    
  },

  //CREATES THE WHOLE TABLE FROM THE PLANETLIST
  createTable: function(){
    var table = document.createElement('div')
    table.id = 'planet-flex-grid'

    //creates the standard (larger screen size) header row first, and then the alternative heading for mobile layout
    var headingRow = this.createStandardHeadingRow()
    var altHeading = this.createAlternativeHeadingRow()
    
    //appends both headings and adds the table to the overall page section
    table.appendChild(headingRow)
    table.appendChild(altHeading)
    this.container.appendChild(table)

    //adds all of the data cells to the table
    this.addPlanetDataCellsToTable(table)
    
    //gives the last row of the table a class to allow it to be styled differently
    table.lastChild.lastChild.classList.add('final-row')
  },

  //CREATES THE HEADING ROW VISIBLE ON LARGER/DESKTOP SCREENS
  createStandardHeadingRow: function(){
    var headingRow = document.createElement('div')
    headingRow.classList.add('row')
    headingRow.classList.add('heading')

    this.sortableColHeaders.forEach(function(colHeader){
      var heading = document.createElement('p')
      heading.innerText = colHeader
      heading.classList.add('asc-false')
      heading.classList.add('sortable')
      this.addSortingEventListeners(heading)
      headingRow.appendChild(heading) 
    }.bind(this))

    this.unsortableColHeaders.forEach(function(colHeader){
      this.createPTagAndAppend(colHeader, headingRow)
    }.bind(this))

    return headingRow
  },

  //ADDS EVENT LISTENERS TO HEADER FOR SORTING
  addSortingEventListeners: function(heading){
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

  //CALLED WHEN THE USER CLICKS TO SORT PLANETS 
  refreshWithSortedData: function(planetList){
    //first clears the table
    var table = document.querySelector('#planet-flex-grid')
    this.clearDataTable(table)

    //refresh the data rows in the new order
    planetList.planets.forEach(function(planet, index){
      var planetRow = this.createPlanetDataRow(planet, index)
      table.appendChild(planetRow)
    }.bind(this))

    //allocate the 'final-row' class to ensure proper styling
    table.lastChild.classList.add('final-row')
  },

  //CREATES THE ALTERNATIVE HEADING 'PLANETS' DISPLAYED FOR SMALL SCREEN SIZES/MOBILE
  createAlternativeHeadingRow: function(){
    var altHeading = document.createElement('div')
    altHeading.classList.add('alt-heading')
    this.createPTagAndAppend('PLANETS', altHeading)
    return altHeading
  },

  //HANDLES THE ADDITION OF ALL ITEMS TO THE TABLE, EXCEPT THE TOP HEADER
  addPlanetDataCellsToTable: function(table){
    this.planetList.planets.forEach(function(planet, index){

      //creates a div to hold the mobile data headers and the data row
      //(to allow for a side-by-side flexbox styling on mobile views)
      var headerAndDataDiv = document.createElement('div')
      headerAndDataDiv.classList.add('header-and-data')

      // create a mobile header (which lists the data labels)
      var mobileHeader = this.createMobileHeader()
      //create the planet data row
      var planetRow = this.createPlanetDataRow(planet, index)
      
      //append both elements to the header and data div, and then append the whole header/data div to the table
      headerAndDataDiv.appendChild(mobileHeader)
      headerAndDataDiv.appendChild(planetRow)
      table.appendChild(headerAndDataDiv)
     
    }.bind(this))
  },

  //CREATES DATA LABELS FOR MOBILE VIEW, TO SIT SIDE BY SIDE WITH DATA
  createMobileHeader: function(){
    //create a header row
    var mobileHeader = document.createElement('div')
    mobileHeader.classList.add('mobile-header')

    //attach the non-list item headers
    this.sortableColHeaders.forEach(function(element){
      this.createPTagAndAppend(element, mobileHeader)
    }.bind(this))

    //attach the list item headers individually, so that they can be given inidvidual ids to help with styling
    this.createPTagAndAppend('terrain', mobileHeader, 'terrain-mobile-heading')
    this.createPTagAndAppend('films', mobileHeader, 'films-mobile-heading')
    return mobileHeader
  },

  //CREATES THE DATA ROWS FOR EACH PLANET
  createPlanetDataRow: function(planet, index){
    //creates the row element
    var planetRow = document.createElement('div')
    planetRow.classList.add('row')

    //adds planet details to each row
    this.createPTagAndAppend(planet.name, planetRow)
    this.createPTagAndAppend(planet.population, planetRow)
    this.createPTagAndAppend(planet.diameter, planetRow)
    this.createPTagAndAppend(planet.rotationPeriod, planetRow)
    this.createPTagAndAppend(planet.orbitalPeriod, planetRow)
    this.createListAndAppend(planet.terrains, planetRow)
    this.createListAndAppend(planet.films, planetRow)

    //applies class to ensure contrasting row colours
    if (index % 2 === 0){
      planetRow.classList.add('contrast-color')
    } else {
      planetRow.classList.add('no-contrast')
    }

    return planetRow
  },

  //CLEARS ALL OF THE DATA ROWS OUT OF THE TABLE, LEAVING THE HEADER
  clearDataTable: function(table){
    while(table.childNodes.length > 2){
      table.removeChild(table.lastChild)
    }
  },

  //HELPER METHOD - TAKES A SET OF ITEMS, CREATES A LIST AND APPENDS TO THE ROW GIVEN
  createListAndAppend: function(items, planetRow){
    var ul = document.createElement('ul')
    items.forEach(function(item){
      var li = document.createElement('li')
      li.innerText = item
      ul.appendChild(li)
    })
    planetRow.appendChild(ul)
  },

  //HELPER METHOD - TAKES TEXT, CREATES A <P> ELEMENT AND APPENDS TO THE ROW GIVEN. OPTIONALLY TAKES AN ID TO GIVE TO THE ELEMENT
  createPTagAndAppend: function(text, planetRow, optionalId){
    var pTag = document.createElement('p')
    pTag.innerText = text
    if (optionalId){
      pTag.id = optionalId
    }
    planetRow.appendChild(pTag)
  }

}

module.exports = PlanetListView
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {



var FilmQuery = function(){
  this.films = {}
}

FilmQuery.prototype = {
  getFilmData: function(callback){
    var request = new XMLHttpRequest()
    request.open('GET', 'http://swapi.co/api/films/')
    request.onload = function(){
      if (request.status === 200){
        var response = request.responseText
        var filmInfo = JSON.parse(response).results
        this.addToFilms(filmInfo)
        callback(this.films)
      }
    }.bind(this)
    request.send()
  },

  addToFilms: function(filmInfo){
    filmInfo.forEach(function(film){
      this.films[film.url] = film.title
    }.bind(this))
  }


}



module.exports = FilmQuery

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

var Planet = __webpack_require__(5)
var PlanetList = __webpack_require__(6)


var PlanetQuery = function(){
  this.processedPlanets = []
  this.allPlanetLists = []
  this.pages = 1
}

PlanetQuery.prototype = {

  getData: function(url, filmInfo, callbackToRender){
    this.allPlanetLists = []
    var request = new XMLHttpRequest()
    request.open('GET', url)
    request.onload = function(){
      if (request.status === 200){
        var response = request.responseText
        var planetInfo = JSON.parse(response)
        var planetsWithoutFilmTitles = this.convertJsonObjectsToPlanets(planetInfo.results)
        this.pages = Math.ceil(planetInfo.count / 10)
        this.populateFilmNames(planetsWithoutFilmTitles, filmInfo, callbackToRender)
      }
    }.bind(this)
    request.send()
  },


  populateFilmNames: function(planets, filmData, callbackToRender){
    var planetList = new PlanetList([])
    planets.forEach(function(planet){
      for (var i = 0; i < planet.films.length; i++){
        var filmLink = planet.films[i]
        planet.films[i] = filmData[filmLink] 
      }
      planetList.planets.push(planet)
    }.bind(this))
    this.allPlanetLists.push(planetList)
    callbackToRender(this.allPlanetLists[0], this.pages)
  },

  convertJsonObjectsToPlanets: function(jsonPlanets){
    var planets = []
    jsonPlanets.forEach(function(planetInfo){
      var planet = new Planet(planetInfo)
      planets.push(planet)
    }.bind(this))
    return planets
  }
}

module.exports = PlanetQuery

/***/ },
/* 2 */
/***/ function(module, exports) {

var PagesNavView = function(container){
  this.container = container
  this.pageNumbers = []
  this.currentPage = 1
}

PagesNavView.prototype = {


  renderNav: function(pageNumbers){
    //ADD PAGE NOS TO ARRAY
    for (var i = 1; i <= pageNumbers; i++){
      this.pageNumbers.push(i)
    }

    //CREATE EACH ELEMENT THAT SITS IN THE NAV

    //FIRST

    var first = document.createElement('p')
    first.innerText = 'First'
    first.id = 'first-page'
    this.container.appendChild(first)

    //ARROW BACK
    var backArrow = document.createElement('img')
    backArrow.src = '/arrow_left.png'
    backArrow.style.height = '15px'
    backArrow.id = 'back-arrow'
    this.container.appendChild(backArrow)

    //ELIPSES
    var initialElipses = document.createElement('p')
    initialElipses.innerText = '...'
    initialElipses.classList.add('elipses')
    this.container.appendChild(initialElipses)

    //PAGE NUMBERS

    for (var i = 1; i <= pageNumbers; i++){
      var pTag = document.createElement('p')
      pTag.id = 'page' + i
      pTag.innerText = i
      pTag.classList.add('nav-number')
      this.container.appendChild(pTag)
    }

    //ELIPSES
    var lastElipses = document.createElement('p')
    lastElipses.innerText = '...'
    lastElipses.classList.add('elipses')
    this.container.appendChild(lastElipses)

    //ARROW FORWARD
    var forwardArrow = document.createElement('img')
    forwardArrow.src = '/arrow_right.png'
    forwardArrow.style.height = '15px'
    forwardArrow.id = 'forward-arrow'
    this.container.appendChild(forwardArrow)

    //LAST

    var last = document.createElement('p')
    last.innerText = 'Last'
    last.id = 'last-page'
    this.container.appendChild(last)

    this.highlightCurrentPage()
    this.collapsePageNumbers()

  },

  collapsePageNumbers(){
    var allNavNumbers = document.querySelectorAll('.nav-number')
    allNavNumbers.forEach(function(num){
      if (parseInt(num.innerText) !== this.currentPage && parseInt(num.innerText) !== this.currentPage + 1 && parseInt(num.innerText) !== this.currentPage - 1 ){
        num.style.display = 'none'
      } else {
        num.style.display = 'block'
      }
    }.bind(this))

    var initialElipses = document.querySelectorAll('.elipses')[0]
    var lastElipses = document.querySelectorAll('.elipses')[1]

    if(this.currentPage <= 2){
      initialElipses.style.display = 'none'
    } else {
      initialElipses.style.display = 'block'
    }

    if (this.currentPage >= (this.pageNumbers.length - 2)){
      lastElipses.style.display = 'none'
    } else {
      lastElipses.style.display = 'block'
    }
  },

  highlightCurrentPage: function(){
    //REMOVE HIGHLIGHT FROM OLD CURRENT
    var allNavNumbers = document.querySelectorAll('.nav-number')
    allNavNumbers.forEach(function(num){
      num.style.backgroundColor = '#FFFFFF'
    })
    //HIGHLIGHT NEW CURRENT
    var currentPageLink = document.querySelector('#page' + this.currentPage)
    currentPageLink.style.backgroundColor = '#F2F3F5'
    currentPageLink.style.borderRadius = '100%'
  },

  attachListeners: function(films, planetQuery, planetListView){
    //ATTACH LISTENER TO ELIPSES
    var initialElipses = document.querySelectorAll('.elipses')[0]

    initialElipses.addEventListener('click', function(){
      this.currentPage = this.currentPage - 2
      this.highlightCurrentPage()
      this.collapsePageNumbers()
      planetQuery.getData(('http://swapi.co/api/planets/?page=' + this.currentPage), films, function(planetList){
        planetListView.populateList(planetList)
      })
    }.bind(this))

    var lastElipses = document.querySelectorAll('.elipses')[1]

    lastElipses.addEventListener('click', function(){
      this.currentPage = this.currentPage + 2
      this.highlightCurrentPage()
      this.collapsePageNumbers()
      planetQuery.getData(('http://swapi.co/api/planets/?page=' + this.currentPage), films, function(planetList){
        planetListView.populateList(planetList)
      })
    }.bind(this))
    
    //ATTACH LISTENER TO FIRST PAGE
    var firstPage = document.querySelector('#first-page')
    firstPage.addEventListener('click', function(){
      this.currentPage = 1
      this.highlightCurrentPage()
      this.collapsePageNumbers()
      planetQuery.getData('http://swapi.co/api/planets', films, function(planetList){
        planetListView.populateList(planetList)
      })
     
    }.bind(this))

    // ATTACH LISTENER TO LAST PAGE
    var lastPage = document.querySelector('#last-page')
    var lastPageNumber = this.pageNumbers.length
    lastPage.addEventListener('click', function(){
      this.currentPage = this.pageNumbers.length
      this.highlightCurrentPage()
      this.collapsePageNumbers()
      planetQuery.getData(('http://swapi.co/api/planets/?page=' + lastPageNumber), films, function(planetList){
        planetListView.populateList(planetList)
      })
    }.bind(this))

    //ATTACH LISTENER TO BACK ARROW
    var backArrow = document.querySelector('#back-arrow')
    backArrow.addEventListener('click', function(){
      if (this.currentPage > 1){
        this.currentPage--
        this.highlightCurrentPage()
        this.collapsePageNumbers()
        planetQuery.getData(('http://swapi.co/api/planets/?page=' + this.currentPage), films, function(planetList){
          planetListView.populateList(planetList)
        })
      }
    }.bind(this))

    //ATTACH LISTERNER TO FORWARD ARROW
    var forwardArrow = document.querySelector('#forward-arrow')
    forwardArrow.addEventListener('click', function(){
      if (this.currentPage < this.pageNumbers.length){
        this.currentPage++
        this.highlightCurrentPage()
        this.collapsePageNumbers()
        planetQuery.getData(('http://swapi.co/api/planets/?page=' + this.currentPage), films, function(planetList){
          planetListView.populateList(planetList)
        })
      }
    }.bind(this))

    //ATTACH LISTENERS FOR EACH PAGE IN BETWEEN
    this.pageNumbers.forEach(function(pageNo){
      var navElement = document.querySelector('#page' + pageNo)
      var url = 'http://swapi.co/api/planets/?page=' + pageNo

      navElement.addEventListener('click', function(){
        this.currentPage = pageNo
        this.highlightCurrentPage()
        this.collapsePageNumbers()
        planetQuery.getData(url, films, function(planetList){
          planetListView.populateList(planetList)
        })
      }.bind(this))

    }.bind(this))

  }


}

module.exports = PagesNavView



/***/ },
/* 3 */
/***/ function(module, exports) {

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

      var planetRow = document.createElement('div')
      planetRow.classList.add('row')
      //add planet details to each row
      this.createPTagAndAppend(planet.name, planetRow)
      this.createPTagAndAppend(planet.population, planetRow)
      this.createPTagAndAppend(planet.diameter, planetRow)
      this.createPTagAndAppend(planet.rotationPeriod, planetRow)
      this.createPTagAndAppend(planet.orbitalPeriod, planetRow)
      this.addTerrains(planet.terrains, planetRow)
      this.addFilms(planet.films, planetRow)

      if (index % 2 === 0){
        planetRow.classList.add('contrast-color')
      } else {
        planetRow.classList.add('no-contrast')
      }


      headerAndDataDiv.appendChild(planetRow)
      table.appendChild(headerAndDataDiv)
    }.bind(this))

    table.lastChild.lastChild.classList.add('final-row')
    
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


  //TAKES TEXT, CREATES A <P> ELEMENT AND APPENDS TO THE ROW GIVEN

  createPTagAndAppend: function(text, planetRow){
    var pTag = document.createElement('p')
    pTag.innerText = text
    planetRow.appendChild(pTag)
  }


  

}

module.exports = PlanetListView

/***/ },
/* 4 */
/***/ function(module, exports) {

var SearchView = function(container){
  this.container = container
  this.searchBox
}

SearchView.prototype = {
  render: function(){
    this.searchBox = document.createElement('input')
    this.searchBox.id = 'search-box'
    this.searchBox.placeholder = 'Search'
    this.searchBox.setAttribute('type', 'text')
  
    this.container.appendChild(this.searchBox)
  },

  attachListener: function(films, planetQuery, planetListView){
    this.searchBox.addEventListener('keydown', function(e){
      if (e.key === 'Enter'){
        //takes the first word of the search input before converting to lower case and stripping special characters. Planets with two-word names are accessed by searching for the first name only.
        var searchText = this.searchBox.value.split(' ')[0].toLowerCase().replace(/\W/g, '')
        var url = 'https://swapi.co/api/planets/?search=' + searchText

        //remove the indicator that the user is on a page of the full results
        var navNumbers = document.querySelectorAll('.nav-number')
        navNumbers.forEach(function(num){
          num.style.backgroundColor = '#FFFFFF'
        })
      
        planetQuery.getData(url, films, function(planetList){
          planetListView.populateList(planetList)
        })
      }
    }.bind(this))
  }
}

module.exports = SearchView

/***/ },
/* 5 */
/***/ function(module, exports) {

var Planet = function(params){
  this.name = params.name
  this.population = parseInt(params.population) || 'unknown'
  this.diameter = parseInt(params.diameter) || 'unknown'
  this.rotationPeriod = parseInt(params.rotation_period) || 'unknown'
  this.orbitalPeriod = parseInt(params.orbital_period) || 'unknown'
  this.terrains = this.parseTerrains(params.terrain)
  this.films = params.films
}

Planet.prototype = {
  parseTerrains: function(terrainString){
    var terrainArray = terrainString.split(',')
    return terrainArray
  }
}

module.exports = Planet

/***/ },
/* 6 */
/***/ function(module, exports) {

var PlanetList = function(planetsArray){
  this.planets = planetsArray
}

PlanetList.prototype = {
  sortAscending: function(sortKey){

    switch (sortKey){
      case 'name':
        this.planets.sort(this.compareNamesAsc)
        break
      case 'population':
        this.planets.sort(function(a, b){
          if (a.population === 'unknown'){
            return 1
          } else if (b.population === 'unknown'){
            return -1
          } else {
            return a.population - b.population
          }
          
        })
        break
      case 'diameter':
        this.planets.sort(function(a, b){
          if (a.diameter === 'unknown'){
            return 1
          } else if (b.diameter === 'unknown'){
            return -1
          } else {
            return a.diameter - b.diameter
          }
          
        })
        break
      case 'rotation period':
        this.planets.sort(function(a, b){
          if (a.rotationPeriod === 'unknown'){
            return 1
          } else if (b.rotationPeriod === 'unknown'){
            return -1
          } else {
            return a.rotationPeriod - b.rotationPeriod
          }
          
        })
        break
      case 'orbital period':
        this.planets.sort(function(a, b){
          if (a.orbitalPeriod === 'unknown'){
            return 1
          } else if (b.orbitalPeriod === 'unknown'){
            return -1
          } else {
            return a.orbitalPeriod - b.orbitalPeriod
          }
          
        })
        break
    }
     
  },

  sortDescending: function(sortKey){

    switch (sortKey){
      case 'name':
        this.planets.sort(this.compareNamesDesc)
        break
      case 'population':
        this.planets.sort(function(a, b){
          if (a.population === 'unknown'){
            return 1
          } else if (b.population === 'unknown'){
            return -1
          } else {
            return b.population - a.population
          }
          
        })
        break
      case 'diameter':
        this.planets.sort(function(a, b){
          if (a.diameter === 'unknown'){
            return 1
          } else if (b.diameter === 'unknown'){
            return -1
          } else {
            return b.diameter - a.diameter
          }
        })
        break
      case 'rotation period':
        this.planets.sort(function(a, b){
          if (a.rotationPeriod === 'unknown'){
            return 1
          } else if (b.rotationPeriod === 'unknown'){
            return -1
          } else {
            return b.rotationPeriod - a.rotationPeriod
          }
        })
        break
      case 'orbital period':
        this.planets.sort(function(a, b){
          if(a.orbitalPeriod === 'unknown'){
            return 1
          } else if (b.orbitalPeriod === 'unknown'){
            return -1
          } else {
            return b.orbitalPeriod - a.orbitalPeriod
          }
          
        })
        break
    }
  
  },


  compareNamesAsc: function(a, b){
    var nameA = a.name.toLowerCase()
    var nameB = b.name.toLowerCase()
    if (nameA < nameB){
      return -1
    } else if (nameA > nameB){
      return 1
    } else {
      return 0
    }
  },

  compareNamesDesc: function(a, b){
    var nameA = a.name.toLowerCase()
    var nameB = b.name.toLowerCase()
    if (nameA < nameB){
      return 1
    } else if (nameA > nameB){
      return -1
    } else {
      return 0
    }
  }

}


module.exports = PlanetList

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

var PlanetQuery = __webpack_require__(1)
var FilmQuery = __webpack_require__(0)
var PlanetListView = __webpack_require__(3)
var PagesNavView = __webpack_require__(2)
var SearchView = __webpack_require__(4)

app = function(){
  
  var planetQuery = new PlanetQuery()
  var filmQuery = new FilmQuery()

  var searchSection = document.querySelector('#search-section')
  var searchView = new SearchView(searchSection)
  searchView.render()

  var planetListContainer = document.querySelector('#planet-list')
  var planetListView = new PlanetListView(planetListContainer)

  var pagesNavContainer = document.querySelector('#pages-nav')
  var pagesNavView = new PagesNavView(pagesNavContainer)
  
  
  filmQuery.getFilmData(function(films){
    planetQuery.getData('http://swapi.co/api/planets', films, function(planetList, noOfPages){
      planetListView.populateList(planetList)
      pagesNavView.renderNav(noOfPages)
      pagesNavView.attachListeners(films, planetQuery, planetListView)
      searchView.attachListener(films, planetQuery, planetListView)

    })
  })


}


window.onload = app

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
var PagesNavView = function(container){
  this.container = container
  this.pageNumbers = []
  this.currentPage = 1
}

PagesNavView.prototype = {

  //CALLED IN APP ONCE NUMBER OF PAGES IS RETRIEVED BY PLANETQUERY
  renderNav: function(pageNumbers){
    // add page numbers to array
    for (var i = 1; i <= pageNumbers; i++){
      this.pageNumbers.push(i)
    }

    //CREATE EACH ELEMENT THAT SITS IN THE NAV

    //FIRST
    var first = this.createNavItemWithID('First', 'first-page')
    this.container.appendChild(first)

    //ARROW BACK
    var backArrow = document.createElement('img')
    backArrow.src = '/arrow_left.png'
    backArrow.style.height = '15px'
    backArrow.id = 'back-arrow'
    this.container.appendChild(backArrow)

    //ELIPSES
    var firstElipses = this.createNavItemWithClass('...', 'elipses')
    this.container.appendChild(firstElipses)

    //PAGE NUMBERS

    for (var i = 1; i <= pageNumbers; i++){
      var page = this.createNavItemWithID(i, 'page' + i )
      page.classList.add('nav-number')
      this.container.appendChild(page)
    }

    //ELIPSES
    var lastElipses = this.createNavItemWithClass('...', 'elipses')
    this.container.appendChild(lastElipses)

    //ARROW FORWARD
    var forwardArrow = document.createElement('img')
    forwardArrow.src = '/arrow_right.png'
    forwardArrow.style.height = '15px'
    forwardArrow.id = 'forward-arrow'
    this.container.appendChild(forwardArrow)

    //LAST
    var last = this.createNavItemWithID('Last', 'last-page')
    this.container.appendChild(last)

    //sets up highlighting and collapsing of page numbers/elipses
    this.reconfigureNavDisplay()
  },

  //HELPER METHOD TO CREATE NAV ITEM
  createNavItemWithID: function(text, id){
    var element = document.createElement('p')
    element.innerText = text
    element.id = id
    return element
  },

  //HELPER METHOD TO CREATE NAV ITEM
  createNavItemWithClass: function(text, classDesc){
    var element = document.createElement('p')
    element.innerText = text
    element.classList.add(classDesc)
    return element
  },

  //ATTACHES ALL THE LISTENERS NEEDED IN NAV SECTION
  attachListeners: function(films, planetQuery, planetListView){
    //ATTACH LISTENER TO ELIPSES
    var initialElipses = document.querySelectorAll('.elipses')[0]

    initialElipses.addEventListener('click', function(){
      this.currentPage = this.currentPage - 2
      this.reconfigureNavDisplay()
      
      planetQuery.getData(('http://swapi.co/api/planets/?page=' + this.currentPage), films, function(planetList){
        planetListView.populateList(planetList)
      })
    }.bind(this))

    var lastElipses = document.querySelectorAll('.elipses')[1]

    lastElipses.addEventListener('click', function(){
      this.currentPage = this.currentPage + 2
      this.reconfigureNavDisplay()

      planetQuery.getData(('http://swapi.co/api/planets/?page=' + this.currentPage), films, function(planetList){
        planetListView.populateList(planetList)
      })
    }.bind(this))
    
    //ATTACH LISTENER TO FIRST PAGE
    var firstPage = document.querySelector('#first-page')
    firstPage.addEventListener('click', function(){
      this.currentPage = 1
      this.reconfigureNavDisplay()
     
      planetQuery.getData('http://swapi.co/api/planets', films, function(planetList){
        planetListView.populateList(planetList)
      })
     
    }.bind(this))

    // ATTACH LISTENER TO LAST PAGE
    var lastPage = document.querySelector('#last-page')
    
    lastPage.addEventListener('click', function(){
      this.currentPage = this.pageNumbers.length
      this.reconfigureNavDisplay()
      
      planetQuery.getData(('http://swapi.co/api/planets/?page=' + this.pageNumbers.length), films, function(planetList){
        planetListView.populateList(planetList)
      })
    }.bind(this))

    //ATTACH LISTENER TO BACK ARROW
    var backArrow = document.querySelector('#back-arrow')
    backArrow.addEventListener('click', function(){
      if (this.currentPage > 1){
        this.currentPage--
        this.reconfigureNavDisplay()
       
        planetQuery.getData(('http://swapi.co/api/planets/?page=' + this.currentPage), films, function(planetList){
          planetListView.populateList(planetList)
        })
      }
    }.bind(this))

    //ATTACH LISTENER TO FORWARD ARROW
    var forwardArrow = document.querySelector('#forward-arrow')
    forwardArrow.addEventListener('click', function(){
      if (this.currentPage < this.pageNumbers.length){
        this.currentPage++
        this.reconfigureNavDisplay()
        
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
        this.reconfigureNavDisplay()
       
        planetQuery.getData(url, films, function(planetList){
          planetListView.populateList(planetList)
        })
      }.bind(this))

    }.bind(this))

  },

  //CHECKS HIGHLIGHTING AND APPEARANCE OF NAV ITEMS AFTER A CHANGE TO CURRENT PAGE
  reconfigureNavDisplay: function(){
    this.clearHighlighting()
    this.highlightCurrentPage()
    this.collapsePageNumbers()
    this.collapseElipses()
  },

  //ENSURES CORRECT PAGE IS HIGHLIGHTED
  highlightCurrentPage: function(){
    //highlight the current page
    var currentPageLink = document.querySelector('#page' + this.currentPage)
    currentPageLink.style.backgroundColor = '#F2F3F5'
    currentPageLink.style.borderRadius = '100%'
  },

  //REMOVES CURRENT PAGE HIGHLIGHTING
  clearHighlighting: function(){
    var navNumbers = document.querySelectorAll('.nav-number')
    navNumbers.forEach(function(num){
      num.style.backgroundColor = '#FFFFFF'
    })
  },
 
  //CHECKS IF A PAGE NUMBER IS THE NEXT OR PREVIOUS PAGE FROM THE CURRENT ONE, IF IT ISN'T, IT HIDES IT
  collapsePageNumbers(){
    var allNavNumbers = document.querySelectorAll('.nav-number')

    allNavNumbers.forEach(function(num){
      if (parseInt(num.innerText) !== this.currentPage && parseInt(num.innerText) !== this.currentPage + 1 && parseInt(num.innerText) !== this.currentPage - 1 ){
        num.style.display = 'none'
      } else {
        num.style.display = 'block'
      }
    }.bind(this))
    
  },

  collapseElipses: function(){
    //checks whether the elipses should be displayed, based on the current page number
    var initialElipses = document.querySelectorAll('.elipses')[0]
    var lastElipses = document.querySelectorAll('.elipses')[1]

    if(this.currentPage <= 2){
      initialElipses.style.display = 'none'
    } else {
      initialElipses.style.display = 'block'
    }

    if (this.currentPage > (this.pageNumbers.length - 2)){
      lastElipses.style.display = 'none'
    } else {
      lastElipses.style.display = 'block'
    }
  }

}

module.exports = PagesNavView


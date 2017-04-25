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


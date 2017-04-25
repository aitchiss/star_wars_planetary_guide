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

    //PAGE NUMBERS

    for (var i = 1; i <= pageNumbers; i++){
      var pTag = document.createElement('p')
      pTag.id = 'page' + i
      pTag.innerText = i
      this.container.appendChild(pTag)
    }

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

  },

  attachListeners: function(films, planetQuery, planetListView){
    
    //ATTACH LISTENER TO FIRST PAGE
    var firstPage = document.querySelector('#first-page')
    firstPage.addEventListener('click', function(){

      planetQuery.getData('http://swapi.co/api/planets', films, function(planetList){
        planetListView.populateList(planetList)
      })
     
    })

    // ATTACH LISTENER TO LAST PAGE
    var lastPage = document.querySelector('#last-page')
    var lastPageNumber = this.pageNumbers.length
    lastPage.addEventListener('click', function(){
      
      planetQuery.getData(('http://swapi.co/api/planets/?page=' + lastPageNumber), films, function(planetList){
        planetListView.populateList(planetList)
      })
    })

    //ATTACH LISTENERS FOR EACH PAGE IN BETWEEN
    this.pageNumbers.forEach(function(pageNo){
      var navElement = document.querySelector('#page' + pageNo)
      var url = 'http://swapi.co/api/planets/?page=' + pageNo

      navElement.addEventListener('click', function(){
        planetQuery.getData(url, films, function(planetList){
          planetListView.populateList(planetList)
        })
      })

    }.bind(this))

  }


}

module.exports = PagesNavView


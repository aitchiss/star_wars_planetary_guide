var PlanetListView = function(container){
  this.container = container
}

PlanetListView.prototype = {
  populateList: function(planetList){
    this.createTable()
    planetList.planets.forEach(function(planet){
      var pTag = document.createElement('p')
      pTag.innerText = planet.name
      this.container.appendChild(pTag)
    }.bind(this))
  },

  createTable: function(){
    var table = document.createElement('table')
    table.id = 'planet-table'
    var tableHead = this.getTableHead()

    table.appendChild(tableHead)
    this.container.appendChild(table)
  },

  getTableHead: function(){
    var head = document.createElement('thead')
    var row = document.createElement('tr')
    var elements = ['name', 'population', 'diameter', 'rotation period', 'orbital period', 'terrain', 'films']
    elements.forEach(function(element){
      var th = document.createElement('th')
      th.innerText = element
      row.appendChild(th)
    }.bind(this))
    head.appendChild(row)
    return head
  }
}

module.exports = PlanetListView
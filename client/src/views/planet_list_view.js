var PlanetListView = function(container){
  this.container = container
}

PlanetListView.prototype = {
  populateList: function(planetList){
    this.createTable(planetList)
    
  },

  createTable: function(planetList){
    var table = document.createElement('div')
    table.id = 'planet-table-div'
    this.addTableHeaders(table)


    this.container.appendChild(table)
  },

  addTableHeaders: function(tableDiv){
    var elements = ['name', 'population', 'diameter', 'rotation period', 'orbital period', 'terrain', 'films']
    var row = document.createElement('div')
    row.classList.add('headings')
    elements.forEach(function(element){
      var elementDiv = document.createElement('div')
      elementDiv.classList.add('indivdual-heading')
      var text = document.createElement('p')
      text.innerText = element
      elementDiv.appendChild(text)
      row.appendChild(elementDiv)
    }.bind(this))
    tableDiv.appendChild(row)
  },

}

module.exports = PlanetListView
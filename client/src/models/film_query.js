

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
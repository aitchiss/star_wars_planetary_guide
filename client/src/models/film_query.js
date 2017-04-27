var FilmQuery = function(){
  this.films = {}
}

FilmQuery.prototype = {

  //MAKES AN API CALL TO GATHER FILM TITLES
  //(only utilised once per user session)
  getFilmData: function(callback){
    var request = new XMLHttpRequest()
    request.open('GET', 'http://swapi.co/api/films/')
    request.onload = function(){
      if (request.status === 200){
        var response = request.responseText
        var filmInfo = JSON.parse(response).results
        this.addToFilms(filmInfo)

        //callback passed films a long to PlanetQuery which can now obtain the planet data
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
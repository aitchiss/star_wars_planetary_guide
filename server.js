var express = require('express')
var app = express()
var path = require('path')

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(3000, function () {
  console.log('App running on port '+this.address().port)
})
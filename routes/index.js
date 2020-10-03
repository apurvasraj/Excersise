var express = require('express');
var app = express.Router();

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//PUT INSIDE YOUR index.js file (or whereever)
// Assumes DATABASE_URL in the heroku configs points to your PostGres database
// setups the url /db to connect to database and does a query from a table test_table
var pg = require('pg');
var pool = new pg.Pool()

app.get('/db', function (request, response) {
  pool.connect(function(err, client, done) {
  //pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM \"test_table\"', function(err, result) {
      done();
      if (err)
      { console.error(err); response.send("Error " + err); }
      else
      { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

module.exports = app;

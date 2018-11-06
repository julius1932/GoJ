const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
const app = express();
app.set('port', process.env.PORT || 3000);
// Middlewares
// set morgan to log info about our requests for development use.
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

// Routes
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get("/pp", function(req, res) {
    res.sendFile(__dirname + '/password.html');
});
app.post('/login', function(req, res) {
   var username = req.body.username;
   var password = req.body.password;
   res.jsonp({pp:"loged"});
});

app.post('/s3', function(req, res) {
    var name = req.body.pname;
});


if (!module.parent) {
    app.listen(app.get('port'));
    console.log("server listening on port " + app.get('port'));
}

module.exports = app;
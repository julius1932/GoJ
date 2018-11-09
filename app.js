const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const app = express();

const _DB = require('./db');

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
app.get("/user/:username:password", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var qry = { username: username, password: password };
    _DB.findModel("USER", qry, function(results) {
        console.log(results);
        //do the loging in
    });
});
app.get("/user", function(req, res) {
    _DB.findModelAll("USER", function(results) {
        console.log(results);
    });
});
app.post('user', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var data={};
    _DB.createModel("USER", data, function(result) {
        console.log(result);
    });
});
app.put('user', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var qry={};
    var data={};
    _DB.updateModel(model, qry, data,  function(result) {
        console.log(result);
    });
});

app.post('/s3', function(req, res) {
    var name = req.body.pname;
});


if (!module.parent) {
    app.listen(app.get('port'));
    console.log("server listening on port " + app.get('port'));
}

module.exports = app;
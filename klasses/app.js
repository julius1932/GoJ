const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const app = express();

const _DB = require('./../db');
// Middlewares
// set morgan to log info about our requests for development use.
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// level:division
app.get("/klass/:_id", function(req, res) {
    var _id = req.body._id;
     var qry = { id:_id};
    _DB.findModel("KLASS", qry, function(results) {
        console.log(results);
         res.jsonp(results);
        //do the loging in
    });
});
app.get("/klass", function(req, res) {
    _DB.findModelAll("KLASS", function(results) {
        console.log(results);
         res.jsonp(results);
    });
});
app.post('/klass/:level:division',function(req, res) {
    var level = req.body.level;
    var division = req.body.division;
    
    var data = { level: level, division: division };
    _DB.createModel("KLASS", data, function(result) {
        console.log(result);
         res.jsonp(results);
    });
});
app.put('klass/:_id,level:division', function(req, res) {
    var level = req.body.level;
    var division = req.body.division;
    
    var _id = req.body._id;
    var data = { level: level, division: division };
    var qry = { id: _id };
    _DB.updateModel('KLASS', qry, data, function(result) {
        console.log(result);
         res.jsonp(results);
    });
});
app.delete('klass/:_id', function(req, res) {
    var _id = req.body._id;
    var qry = { id: _id };
    _DB.deleteModel('KLASS',qry,function(result) {
        console.log(result);
        res.jsonp(results);
    });
});
module.exports = app;
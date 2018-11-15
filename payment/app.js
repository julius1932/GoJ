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

app.get("/payment/:_id", function(req, res) {
    var _id = req.body._id;
     var qry = { id:_id};
    _DB.findModel("PAYMENT", qry, function(results) {
        console.log(results);
        //do the loging in
    });
});
app.get("/payment", function(req, res) {
    _DB.findModelAll("PAYMENT", function(results) {
        console.log(results);
    });
});
app.post('/payment/:fname:sname:gender:email:phone:klassId',function(req, res) {
    var fname = req.body.fname;
    var sname = req.body.sname;
    var gender = req.body.gender;
    var email = req.body.email;
    var phone = req.body.phone;
    var klassId = req.body.klassId;
    var data = { fname: fanme, sname: sname, gender: gender, email: email, phone: phone, klassId:klassId };
    _DB.createModel("PAYMENT", data, function(result) {
        console.log(result);
    });
});
app.put('payment/:_id,fname:sname:gender:email:phone:klassId', function(req, res) {
    var fname = req.body.fname;
    var sname = req.body.sname;
    var gender = req.body.gender;
    var email = req.body.email;
    var phone = req.body.phone;
    var klassId = req.body.klassId;
    var _id = req.body._id;
    var data = { fname: fanme, sname: sname, gender: gender, email: email, phone: phone, klassId:klassId };
    var qry = { id: _id };
    _DB.updateModel('PAYMENT', qry, data, function(result) {
        console.log(result);
    });
});
app.delete('payment/:_id', function(req, res) {
    var _id = req.body._id;
    var qry = { id: _id };
    _DB.deleteModel('PAYMENT',qry,function(result) {
        console.log(result);
    });
});
module.exports = app;
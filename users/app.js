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

app.get("/user/:_id", function(req, res) {
    var _id = req.body._id;
    var qry = { id: _id };
    _DB.findModelById("USER", qry, function(results) {
        console.log(results);
        res.jsonp(results);
        //do the loging in
    });
});
app.get("/user:email:pass", function(req, res) {
    var mail = req.body.email;
    var pass = req.body.pass;
    var qry = { email: email, pass: pass };
    _DB.findModel("USER", qry, function(results) {
        console.log(results);
        res.jsonp(results);
        //do the loging in
    });
});
app.get("/user", function(req, res) {
    _DB.findModelAll("USER", function(results) {
        console.log(results);
         res.jsonp(results);
    });
});

app.post('/user:fname:sname:gender:email:phone:role:pass',function(req, res) {
    var fname = req.body.fname;
    var sname = req.body.sname;
    var gender = req.body.gender;
    var email = req.body.email;
    var phone = req.body.phone;
    var role = req.body.role;
    var pass = req.body.pass;
    var data = {fname: fname, sname: sname, gender: gender, email: email, phone: phone, role: role, pass: pass };
    _DB.createModel("USER", data, function(result) {
        console.log(result);
        res.jsonp(result);
    });
});
app.put('user/:_id,fname:sname:gender:email:phone:role:pass', function(req, res) {
    var fname = req.body.fname;
    var sname = req.body.sname;
    var gender = req.body.gender;
    var email = req.body.email;
    var phone = req.body.phone;
    var role = req.body.role;
    var pass = req.body.pass;
    var _id = req.body._id;
    var data = { fname: fanme, sname: sname, gender: gender, email: email, phone: phone, role: role, pass: pass };
    var qry = { id: _id };
    _DB.updateModel('USER', qry, data, function(result) {
        console.log(result);
        res.jsonp(result);
    });
});
app.delete('user/:_id', function(req, res) {
    var _id = req.body._id;
    var qry = { id: _id };
    _DB.deleteModel('USER',qry,function(result) {
        console.log(result);
        res.jsonp(results);
    });
});
app.get("/user/:_id", function(req, res) {
    var _id = req.body._id;
    var qry = { id: _id };
    _DB.findModelById("USER", qry, function(results) {
        console.log(results)
        res.jsonp(results);
        //do the loging in
    });
});
module.exports = app;
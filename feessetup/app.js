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

//amount:purpose:mandetory:type:crateria:whoShouldPay:accountType

app.get("/feessetup/:_id", function(req, res) {
    var _id = req.body._id;
    var qry = { id: _id };
    _DB.findModel("FEESSETUP", qry, function(results) {
        console.log(results);
        res.jsonp(results);
        //do the loging in
    });
});
app.get("/feessetup", function(req, res) {
    _DB.findModelAll("FEESSETUP", function(results) {
        console.log(results);
        res.jsonp(results);
    });
});
app.post('/feessetup/:amount:purpose:mandetory:_type:crateria:whoShouldPay:accountType', function(req, res) {
    var amount = req.body.amount;
    var purpose = req.body.purpose;
    var mandetory = req.body.mandetory;
    var type = req.body._type;
    var crateria = req.body.crateria;
    var whoShouldPay = req.body.whoShouldPay;
    var accountType = req.body.accountType;
    var data = { amount: amount, purpose: purpose, mandetory: mandetory, type: type, crateria: crateria, whoShouldPay: whoShouldPay, accountType: accountType };
    _DB.createModel("FEESSETUP", data, function(result) {
        console.log(result);
        res.jsonp(results);
    });
});
app.put('feessetup/:_id:amount:purpose:mandetory:_type:crateria:whoShouldPay:accountTypey', function(req, res) {
    var amount = req.body.amount;
    var purpose = req.body.purpose;
    var mandetory = req.body.mandetory;
    var type = req.body._type;
    var crateria = req.body.crateria;
    var whoShouldPay = req.body.whoShouldPay;
    var accountType = req.body.accountType;
    var _id = req.body._id;
    var data = { amount: amount, purpose: purpose, mandetory: mandetory, type: type, crateria: crateria, whoShouldPay: whoShouldPay, accountType: accountType };
    var qry = { id: _id };
    _DB.updateModel('FEESSETUP', qry, data, function(result) {
        console.log(result);
        res.jsonp(results);
    });
});
app.delete('feessetup/:_id', function(req, res) {
    var _id = req.body._id;
    var qry = { id: _id };
    _DB.deleteModel('FEESSETUP', qry, function(result) {
        console.log(result);
        res.jsonp(results);
    });
});
module.exports = app;
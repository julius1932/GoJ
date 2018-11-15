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

app.get("/invoice/:_id", function(req, res) {
    var _id = req.body._id;
    var qry = { id: _id };
    _DB.findModel("INVOICE", qry, function(results) {
        console.log(results);
        res.jsonp(results);
        //do the loging in
    });
});
app.get("/invoice", function(req, res) {
    _DB.findModelAll("INVOICE", function(results) {
        console.log(results);
        res.jsonp(results);
    });
});
app.post('/invoice/:paymentProgress:learnerId:feesSetUpId', function(req, res) {
    var paymentProgress = req.body.paymentProgress;
    var learnerId = req.body.learnerId;
    var feesSetUpId = req.body.feesSetUpId;

    var data = { paymentProgress: paymentProgress, learnerId: learnerId, feesSetUpId: feesSetUpId };
    _DB.createModel("INVOICE", data, function(result) {
        console.log(result);
        res.jsonp(results);
    });
});
app.put('invoice/:_id:paymentProgress:learnerId:feesSetUpId', function(req, res) {

    var _id = req.body._id;
    var paymentProgress = req.body.paymentProgress;
    var learnerId = req.body.learnerId;
    var feesSetUpId = req.body.feesSetUpId;

    var data = { paymentProgress: paymentProgress, learnerId: learnerId, feesSetUpId: feesSetUpId };
    var qry = { id: _id };
    _DB.updateModel('INVOICE', qry, data, function(result) {
        console.log(result);
        res.jsonp(results);
    });
});
app.delete('invoice:_id', function(req, res) {
    var _id = req.body._id;
    var qry = { id: _id };
    _DB.deleteModel('INVOICE', qry, function(result) {
        console.log(result);
        res.jsonp(results);
    });
});
module.exports = app;
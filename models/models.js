const Sequelize = require('sequelize');

const INVOICE = require('./invoice');
const KLASS = require('./klass');
const LEARNER = require('./learner');
const USER= require('./user');
const PAYMENT = require('./payment');

var arrModels=[USER,LEARNER,LEARNER,INVOICE,PAYMENT];


arrModels.forEach(function (model){
    console.log(model);
})
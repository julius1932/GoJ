var express = require("express");
var app = express();

var user_app = require("./users/app");
var learner_app = require("./learners/app");
var klass_app = require("./klasses/app");
var invoice_app = require("./invoice/app");
var payment_app = require("./payment/app");
var feessetup_app = require("./feessetup/app");

app.use(express.static('public'))

app.set('port', process.env.PORT || 3000);

app.use('/user', user_app);
app.use('/learner', learner_app);
app.use('/klass', klass_app);
app.use('/invoice', invoice_app);
app.use('/payment', payment_app);
app.use('/feessetup', feessetup_app);

app.get('/', function (req, res) {
  //res.send("This is the '/' route in main_app");
   res.sendFile(__dirname + '/main.html');
});
app.get("/pp", function(req, res) {
    res.sendFile(__dirname + '/password.html');
});

if(!module.parent){
    app.listen(app.get('port'));
    console.log("server listening on port " + app.get('port'));
}
module.exports = app;
/**
 * Contains server code for demo app.
 */

"use strict";

var express = require('express'), bodyParser = require('body-parser'), cors = require('cors');
var app = express();
app.use(cors());
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('client'));


app.get('/', function (req, res) {
  res.send('API index');
});

var spinRouter = require('./Routes/spinRoutes')();
app.use('/api/processSpin', spinRouter);

app.listen(port, function () {
    console.log('Gulp is running on  PORT: ' + port);
});
module.exports = app;

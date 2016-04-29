var express = require('express');

var routes = function () {
  var spinRouter = express.Router();
  var spinController = require('../Controllers/spinController')();

  spinRouter.route('/')
    .get(spinController.getSpinResults);

  return spinRouter;
};

module.exports = routes;
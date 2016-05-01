var express = require('express')
  , spinRouter = express.Router()
  , spinController = require('../Controllers/spinController')();

var routes = function () {
  spinRouter.route('/')
    .get(spinController.getSpinResults);
  
  return spinRouter;
};

module.exports = routes;
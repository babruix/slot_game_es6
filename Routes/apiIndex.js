var express = require('express')
  , spinRouter = express.Router()
  , apiIndexController = require('../Controllers/apiController')();

var routes = function () {
  spinRouter.route('/')
    .get(apiIndexController.getApiIndex);
  
  return spinRouter;
};

module.exports = routes;
/**
 *
 * @returns {*}
 *   apiIndexRoute
 */
module.exports = () => {
  var express = require('express')
    , spinRouter = express.Router()
    , apiIndexController = require('../Controllers/apiController')();

  spinRouter.route('/')
    .get(apiIndexController.getApiIndex);

  return spinRouter;
};

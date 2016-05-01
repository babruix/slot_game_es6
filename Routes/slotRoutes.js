/**
 *
 * @returns {*}
 *   slotRoutes
 */
module.exports = () => {
  var express = require('express')
    , spinRouter = express.Router()
    , spinController = require('../Controllers/spinController')();

  spinRouter.route('/')
    .get(spinController.getSpinResults);

  return spinRouter;
};

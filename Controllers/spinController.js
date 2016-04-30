var spinModel = require('../Models/spinModel');

var spinController = function () {

  function randomNumer() {
    return Math.floor(Math.random() * 6);
  }
  function wonBonusSpin() {
    // Random true/false
    return Math.random() < 0.3;
  }

  function getResultsText(randomSymbols, gotBonusSpin) {

    function getMaxDuplicates() {
      var maxDuplicates = 0;
      var counts = {};
      randomSymbols.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
        if (counts[x] > maxDuplicates) {
          maxDuplicates = counts[x];
        }
      });
      return maxDuplicates;
    }

    var countDuplicates = getMaxDuplicates();

    var text = '';
    switch (countDuplicates) {
      case 1: text = 'No Win'; break;
      case 2: text = 'Small Win'; break;
      case 3: text = 'Big Win'; break;
    }
    if (gotBonusSpin) {
      text = text + ', BONUS SPIN!';
    }
    return text;
  }

  var getSpinResults = function (req, res) {
    var randomSymbols = [randomNumer(), randomNumer(), randomNumer()];
    var bonusSpin = wonBonusSpin();
    var textResult = getResultsText(randomSymbols, bonusSpin);
    var results = {
      symbols: randomSymbols,
      textResult: textResult,
      bonusSpin: bonusSpin
    };
    res.json(results);
    spinModel.spinResults(req, function (results) {

      res.json(results);

    }, function (e) {
      console.log(e);
    });
  };
  
  return {
    getSpinResults: getSpinResults
  }
};

module.exports = spinController;
var spinModel = require('../Models/spinModel')();

class spinController {
  static getSpinResults(req, res) {

    let resultNumbers = spinModel.getSpinResultingNumbers()
      , bonusSpin = spinModel.wonBonusSpin()
      , textResult = spinController.getResultsAsText(resultNumbers, bonusSpin)
      , results = {
      symbols: resultNumbers,
      textResult: textResult,
      bonusSpin: bonusSpin
    };

    res.json(results);
  };

  static getResultsAsText(randomSymbols, gotBonusSpin) {

    let text = '';
    switch (spinController.getMaxCountOfDuplicates(randomSymbols)) {
      case 1:
        text = 'No Win';
        break;
      case 2:
        text = 'Small Win';
        break;
      case 3:
        text = 'Big Win';
        break;
    }

    if (gotBonusSpin) {
      text = `${text}, BONUS SPIN!`;
    }
    return text;
  };

  static getMaxCountOfDuplicates(numbers) {
    let maxCountOfDuplicates = 0, allDuplicates = [];

    numbers.forEach(x => {
      allDuplicates[x] = (allDuplicates[x] || 0) + 1;

      if (allDuplicates[x] > maxCountOfDuplicates) {
        maxCountOfDuplicates = allDuplicates[x];
      }
    });

    return maxCountOfDuplicates;
  };
}

module.exports = () => {
  return {
    getSpinResults: spinController.getSpinResults
  }
};

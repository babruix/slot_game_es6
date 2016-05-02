/**
 * Generates random Spin results.
 */
class spinModel {

  static getSpinResultingNumbers(numOfWheels = 3) {
    let results = [];
    [...new Array(numOfWheels).keys()].map(() => {
      results.push(spinModel.randomNumer());
    });
    return results;
  }

  static randomNumer(maxNumber = 6) {
    return Math.floor(Math.random() * maxNumber);
  }

  static wonBonusSpin(percentChanceToWin = 30) {
    return Math.random() < percentChanceToWin / 100;
  }
}

module.exports = () => {
  return {
    getSpinResultingNumbers: spinModel.getSpinResultingNumbers,
    wonBonusSpin: spinModel.wonBonusSpin
  }
};

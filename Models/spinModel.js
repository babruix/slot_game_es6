var spinModel = {};

spinModel.spinResults = function (onComplete, onError) {

  var promise = new Promise(function(resolve, reject) {
    // do a thing, possibly async, then…

    if (1) {
      resolve([1,2,4]);
    }
    else {
      reject(Error("It broke"));
    }
  });

  return promise;
};


module.exports = spinModel;
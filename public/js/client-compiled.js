/**
 * Contains client code for demo app.
 */

'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var processSpinEndpointURL = 'http://localhost:8000/api/processSpin';

var appClient = function () {
  function appClient() {
    _classCallCheck(this, appClient);

    this.bonusSpin = false;
    appClient.cacheDom();
    appClient.setEventListeners();
    appClient.setSpinClasses();
  }

  _createClass(appClient, null, [{
    key: 'cacheDom',
    value: function cacheDom() {
      this.stage = document.querySelector('.slot-view');
      this.button = document.querySelector('.control-btn');
      this.textDiv = document.querySelector('.result');
      this.bonusDiv = document.querySelector('.bonus');
      this.animations = document.querySelectorAll('.spin1, .spin2');

      this.spinChildren = [];
      var _arr = [1, 2, 3];
      for (var _i = 0; _i < _arr.length; _i++) {
        var wheelIndex = _arr[_i];
        this.spinChildren[wheelIndex] = [];
        var _arr2 = [1, 2];
        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
          var spinIndex = _arr2[_i2];
          var selector = '.wheel' + wheelIndex + ' .spin' + spinIndex + ' > div';
          this.spinChildren[wheelIndex][spinIndex] = document.querySelectorAll(selector);
        }
      }
    }
  }, {
    key: 'processResult',
    value: function processResult(result) {
      var _JSON$parse = JSON.parse(result);

      var textResult = _JSON$parse.textResult;
      var symbols = _JSON$parse.symbols;
      var bonusSpin = _JSON$parse.bonusSpin;
      // Show resulting text

      appClient.textDiv.innerHTML = textResult;

      // Set result images
      appClient.setSpinClasses(symbols);

      // Save bonus
      if (bonusSpin) {
        appClient.bonusSpin = true;
      }

      // Hide text and button
      appClient.textDiv.classList.add('hide');
      appClient.button.classList.add('hide');

      // Trigger CSS animation by adding class.
      new Promise(function (resolve, reject) {
        var delayBeforeAddAnimationClasses = 20;
        setTimeout(resolve, delayBeforeAddAnimationClasses);
      }).then(function () {
        appClient.stage.classList.add('run-animation');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Array.from(appClient.animations).entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2);

            var i = _step$value[0];
            var elem = _step$value[1];

            elem.classList.add('animating');
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
    }
  }, {
    key: 'processBonusSpin',
    value: function processBonusSpin() {
      appClient.bonusSpin = false;
      appClient.bonusDiv.classList.remove('hide');

      // Trigger bonus spin.
      new Promise(function (resolve, reject) {
        var delayBeforeBonusSpinRuns = 2000;
        setTimeout(resolve, delayBeforeBonusSpinRuns);
      }).then(function () {
        appClient.getSpinResultsFromServer();
      });

      // Hide bonus text.
      new Promise(function (resolve, reject) {
        var delayBeforeBonusTextHide = 5000;
        setTimeout(resolve, delayBeforeBonusTextHide);
      }).then(function () {
        appClient.bonusDiv.classList.add('hide');
      });
    }
  }, {
    key: 'setAnimSpecificImage',
    value: function setAnimSpecificImage(wheelIndex, rnd) {
      var _this = this;

      [1, 2].map(function (spinIndex) {
        var spinChildren = _this.spinChildren[wheelIndex][spinIndex];

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Array.from(spinChildren).entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _slicedToArray(_step2.value, 3);

            var i = _step2$value[0];
            var childNode = _step2$value[1];
            var imageIndex = _step2$value[2];

            imageIndex = i == 0 ? rnd : rnd + i;
            imageIndex = imageIndex % spinChildren.length;
            childNode.className = 'symbol-' + imageIndex;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      });
    }
  }, {
    key: 'setSpinClasses',
    value: function setSpinClasses() {
      var values = arguments.length <= 0 || arguments[0] === undefined ? [0, 0, 0] : arguments[0];

      [1, 2, 3].map(function (wheelIndex) {
        appClient.setAnimSpecificImage(wheelIndex, values[wheelIndex - 1]);
      });
    }
  }, {
    key: 'setEventListeners',
    value: function setEventListerens() {
      appClient.button.addEventListener('click', appClient.getSpinResultsFromServer);

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Array.from(appClient.animations).entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2);

          var i = _step3$value[0];
          var elem = _step3$value[1];

          elem.addEventListener('animationend', appClient.singleAnimationStopped, false);

          if (i == appClient.animations.length - 1) {
            elem.addEventListener('animationend', appClient.lastAnimationStopped, false);
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: 'singleAnimationStopped',
    value: function singleAnimationStopped() {
      this.classList.remove('animating');
    }
  }, {
    key: 'lastAnimationStopped',
    value: function lastAnimationStopped(event) {
      event.target.classList.remove('animating');
      appClient.stage.classList.remove('run-animation');
      appClient.textDiv.classList.remove('hide');
      appClient.bonusSpin ? appClient.processBonusSpin() : appClient.button.classList.remove('hide');
    }
  }, {
    key: 'getSpinResultsFromServer',
    value: function getSpinResultsFromServer() {
      httpService.makeRequest('GET', processSpinEndpointURL).then(function (result) {
        appClient.processResult(result);
      }).catch(function (err) {
        console.error(err.statusText);
      });
    }
  }]);

  return appClient;
}();

var httpService = function () {
  function httpService() {
    _classCallCheck(this, httpService);
  }

  _createClass(httpService, null, [{
    key: 'makeRequest',
    value: function makeRequest(method, url) {

      return new Promise(function (resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve(xhr.response);
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          }
        };

        xhr.onerror = function () {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        };

        xhr.send();
      });
    }
  }]);

  return httpService;
}();

window.onload = function () {
  new appClient();
};

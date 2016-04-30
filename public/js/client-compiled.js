/**
 * Contains client code for demo app.
 */

'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var processSpinEndpointURL = 'http://localhost:8000/api/processSpin';

var stage = void 0,
    button = void 0,
    textDiv = void 0,
    bonusSpin = false,
    bonusDiv = void 0;

var appClient = function () {
  function appClient() {
    _classCallCheck(this, appClient);

    appClient.initDomElements();
    appClient.setEventListerens();
    appClient.setSpinClasses([0, 0, 0]);
  }

  _createClass(appClient, null, [{
    key: 'initDomElements',
    value: function initDomElements() {
      stage = document.querySelector('.slot-view');
      button = document.querySelector('.control-btn');
      textDiv = document.querySelector('.result');
      bonusDiv = document.querySelector('.bonus');
    }
  }, {
    key: 'setSpinClasses',
    value: function setSpinClasses(values) {
      var _arr = [1, 2, 3];

      for (var _i = 0; _i < _arr.length; _i++) {
        var spinIndex = _arr[_i];
        appClient.setAnimSpecificImage(spinIndex, values[spinIndex - 1]);
      }
    }
  }, {
    key: 'processResult',
    value: function processResult(result) {
      var values = JSON.parse(result);

      // Show resulting text
      textDiv.innerHTML = values.textResult;

      // Set result images
      appClient.setSpinClasses(values.symbols);

      // Save bonus
      if (values.bonusSpin) {
        bonusSpin = true;
      }

      // Hide text and button
      textDiv.classList.add('hide');
      button.classList.add('hide');

      // Trigger CSS animation by removing and adding class
      stage.classList.remove('run-animation');
      setTimeout(function () {
        stage.classList.add('run-animation');

        var animations = document.querySelectorAll('.spin1, .spin2');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Array.from(animations).entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
      }, 20);
    }
  }, {
    key: 'processBonusSpin',
    value: function processBonusSpin() {
      bonusSpin = false;
      bonusDiv.classList.remove('hide');

      var delayBeforeBonusSpinRuns = 2000;
      setTimeout(function () {
        appClient.getSpinResultsFromServer();
      }, delayBeforeBonusSpinRuns);

      var delayBeforeBonusTextHide = 5000;
      setTimeout(function () {
        bonusDiv.classList.add('hide');
      }, delayBeforeBonusTextHide);
    }
  }, {
    key: 'setAnimSpecificImage',
    value: function setAnimSpecificImage(imageIndex, rnd) {
      var _arr2 = [1, 2];

      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var spinNum = _arr2[_i2];
        var spinChildren = document.querySelectorAll('.wheel' + imageIndex + ' .spin' + spinNum + ' > div');

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Array.from(spinChildren).entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _slicedToArray(_step2.value, 3);

            var i = _step2$value[0];
            var childNode = _step2$value[1];
            var imageNum = _step2$value[2];

            imageNum = i == 0 ? rnd : rnd + i;
            imageNum = imageNum % spinChildren.length;
            childNode.className = 'symbol-' + imageNum;
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
      }
    }
  }, {
    key: 'getSpinResultsFromServer',
    value: function getSpinResultsFromServer() {
      httpService.httpGetAsync(processSpinEndpointURL, appClient.processResult);
    }
  }, {
    key: 'setEventListerens',
    value: function setEventListerens() {
      button.addEventListener('click', appClient.getSpinResultsFromServer);
      var animations = document.querySelectorAll('.spin1, .spin2');
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Array.from(animations).entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2);

          var i = _step3$value[0];
          var elem = _step3$value[1];

          elem.addEventListener('animationend', appClient.singleAnimationStopped, false);
          if (i == animations.length - 1) {
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
      textDiv.classList.remove('hide');
      bonusSpin ? appClient.processBonusSpin() : button.classList.remove('hide');
    }
  }]);

  return appClient;
}();

var httpService = function () {
  function httpService() {
    _classCallCheck(this, httpService);
  }

  _createClass(httpService, null, [{
    key: 'httpGetAsync',
    value: function httpGetAsync(theUrl, callback) {
      var xmlHttp = new XMLHttpRequest();

      xmlHttp.onreadystatechange = function (oEvent) {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          callback(xmlHttp.responseText);
        }
      };

      xmlHttp.open('GET', theUrl, true); // true for asynchronous
      xmlHttp.send(null);
    }
  }]);

  return httpService;
}();

window.onload = function () {
  new appClient();
};

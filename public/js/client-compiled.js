/**
 * Contains client code for demo app.
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stage = void 0,
    button = void 0,
    textDiv = void 0,
    animations = void 0,
    bonusSpin = void 0,
    bonusDiv = void 0;

var appClient = function () {
  function appClient() {
    _classCallCheck(this, appClient);

    bonusSpin = false;
    stage = document.getElementById('slot-view');
    button = document.getElementById('control-btn');
    button.addEventListener('click', appClient.getResultsFromServer);
    textDiv = document.getElementById('result');
    bonusDiv = document.getElementById('bonus');
    animations = document.querySelectorAll('.spin1, .spin2');
    appClient.setSpinClasses([0, 0, 0]);
  }

  _createClass(appClient, null, [{
    key: 'setSpinClasses',
    value: function setSpinClasses(values) {
      // Set images
      appClient.setAnimSpecificImage(1, values[0]);
      appClient.setAnimSpecificImage(2, values[1]);
      appClient.setAnimSpecificImage(3, values[2]);
    }
  }, {
    key: 'processResult',
    value: function processResult(result) {
      var values = JSON.parse(result);
      // Show resulting text
      textDiv.innerHTML = values.textResult;
      appClient.setSpinClasses(values.symbols);
      if (values.bonusSpin) {
        bonusSpin = true;
      }
      stage.classList.remove('run-animation');
      setTimeout(function () {
        stage.classList.add('run-animation');
      }, 10);
    }
  }, {
    key: 'lastAnimationStopped',
    value: function lastAnimationStopped(event) {
      event.target.classList.remove('animating');
      if (bonusSpin) {
        bonusSpin = false;
        bonusDiv.classList.remove('hide');
        textDiv.classList.remove('hide');
        setTimeout(function () {
          appClient.getResultsFromServer();
        }, 2000);
        setTimeout(function () {
          bonusDiv.classList.add('hide');
        }, 5000);
      } else {
        button.classList.remove('hide');
        textDiv.classList.remove('hide');
      }
    }
  }, {
    key: 'getResultsFromServer',
    value: function getResultsFromServer() {
      stage = document.getElementById('slot-view');
      stage.className = '';
      for (var i = 0, elem; i < animations.length; i++) {
        elem = animations[i];
        elem.classList.add('animating');
        textDiv.classList.add('hide');
        button.classList.add('hide');
        elem.addEventListener('animationend', appClient.singleAnimationStopped, false);
        if (i == animations.length - 1) {
          elem.addEventListener('animationend', appClient.lastAnimationStopped, false);
        }
      }
      appClient.httpGetAsync('http://localhost:8000/api/processSpin', appClient.processResult);
    }
  }, {
    key: 'httpGetAsync',
    value: function httpGetAsync(theUrl, callback) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(xmlHttp.responseText);
      };
      xmlHttp.open('GET', theUrl, true); // true for asynchronous
      xmlHttp.send(null);
    }
  }, {
    key: 'setAnimSpecificImage',
    value: function setAnimSpecificImage(imageIndex, rnd) {
      var _arr = [1, 2];

      for (var _i = 0; _i < _arr.length; _i++) {
        var spinNum = _arr[_i];
        var spinChildren = document.querySelectorAll('.wheel' + imageIndex + ' .spin' + spinNum + ' > div');
        for (var i = 0, childNode, imageNum; i < spinChildren.length; i++) {
          childNode = spinChildren[i];
          imageNum = i == 0 ? rnd : rnd + i;
          imageNum = imageNum % spinChildren.length;
          childNode.className = 'symbol-' + imageNum;
        }
      }
    }
  }, {
    key: 'singleAnimationStopped',
    value: function singleAnimationStopped(e) {
      this.classList.remove('animating');
    }
  }]);

  return appClient;
}();

window.onload = function () {
  new appClient();
};

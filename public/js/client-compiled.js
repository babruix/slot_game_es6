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
    bonusSpin = void 0;

var appClient = function () {
  function appClient() {
    var _this = this;

    _classCallCheck(this, appClient);

    bonusSpin = false;
    stage = document.getElementById('slot-view');
    stage.addEventListener('webkitAnimationEnd', function () {
      console.log('animation end');
      /* if (!this.style) {return;}else {
         debugger;
       }*/
      _this.style.webkitAnimationName = '';
    }, false);
    button = document.getElementById('control-btn');
    button.addEventListener('click', appClient.getResultsFromServer);
    textDiv = document.getElementById('result');
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
      stage.classList.add('run-animation');
    }
  }, {
    key: 'animationStop',
    value: function animationStop(event) {
      for (var i = 0, elem; i < animations.length; i++) {
        elem = animations[i];
        elem.classList.remove('animating');
      }
      if (bonusSpin) {
        bonusSpin = false;
        alert('You have got bonus spin!!!');
        appClient.getResultsFromServer();
      }
      event.target.classList.remove('animating');
      button.classList.remove('hide');
      textDiv.classList.remove('hide');
    }
  }, {
    key: 'getResultsFromServer',
    value: function getResultsFromServer() {
      window.setTimeout(function (e) {
        stage = document.getElementById('slot-view');
        if (stage.className != 'run-animation') {
          stage.className = '';
          stage.className = 'run-animation';
        }
      }, 10000);
      stage = document.getElementById('slot-view');
      console.log('getResultsFromServer started');
      console.log(stage.className);
      stage.className = '';
      console.log(stage.className);
      for (var i = 0, elem; i < animations.length; i++) {
        elem = animations[i];
        elem.classList.add('animating');
        textDiv.classList.add('hide');
        button.classList.add('hide');
        if (i == animations.length - 1) {
          elem.addEventListener('animationend', appClient.animationStop, false);
        }
      }
      console.log('got to line 68');

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
  }]);

  return appClient;
}();

window.onload = function () {
  new appClient();
};

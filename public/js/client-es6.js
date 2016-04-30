/**
 * Contains client code for demo app.
 */

'use strict';

let stage, button, textDiv, animations, bonusSpin;

class appClient {

  constructor() {
    bonusSpin = false;
    stage = document.getElementById('slot-view');
    button = document.getElementById('control-btn');
    button.addEventListener('click', appClient.getResultsFromServer);
    textDiv = document.getElementById('result');
    animations = document.querySelectorAll('.spin1, .spin2');
    appClient.setSpinClasses([0, 0, 0]);
  }

  static setSpinClasses(values) {
    // Set images
    appClient.setAnimSpecificImage(1, values[0]);
    appClient.setAnimSpecificImage(2, values[1]);
    appClient.setAnimSpecificImage(3, values[2]);
  }

  static processResult(result) {
    console.log('got resuslt from server');
    let values = JSON.parse(result);
    // Show resulting text
    textDiv.innerHTML = values.textResult;
    appClient.setSpinClasses(values.symbols);
    if (values.bonusSpin) {
      bonusSpin = true;
    }
    setTimeout(function () {
    stage.classList.remove('run-animation');
    },10);
    setTimeout(function () {
      stage.classList.add('run-animation');
    },100);
  }

  static animationStop (event) {
    for (let i = 0, elem; i < animations.length; i++) {
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
  };

  static getResultsFromServer() {
    stage = document.getElementById('slot-view');
    stage.className = '';
    console.log(stage.className);
    for (let i = 0, elem; i < animations.length; i++) {
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

  static httpGetAsync(theUrl, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = ()=> {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open('GET', theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }

  static setAnimSpecificImage(imageIndex, rnd) {
    for (let spinNum of [1,2]) {
      let spinChildren = document.querySelectorAll('.wheel' + imageIndex + ' .spin' + spinNum + ' > div');
      for (let i = 0, childNode, imageNum; i < spinChildren.length; i++) {
        childNode = spinChildren[i];
        imageNum = i == 0 ? rnd : rnd + i;
        imageNum = imageNum % spinChildren.length;
        childNode.className = 'symbol-' + imageNum;
      }
    }
  }
}

window.onload = ()=> {
  new appClient();
};
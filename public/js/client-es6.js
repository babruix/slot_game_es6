/**
 * Contains client code for demo app.
 */

'use strict';

const processSpinEndpointURL = 'http://localhost:8000/api/processSpin';

let stage, button, textDiv, bonusSpin = false, bonusDiv;

class appClient {

  constructor() {
    appClient.initDomElements();
    appClient.setEventListerens();
    appClient.setSpinClasses([0, 0, 0]);
  }

  static initDomElements() {
    stage = document.querySelector('.slot-view');
    button = document.querySelector('.control-btn');
    textDiv = document.querySelector('.result');
    bonusDiv = document.querySelector('.bonus');
  }

  static setSpinClasses(values) {
    for (let spinIndex of [1, 2, 3]) {
      appClient.setAnimSpecificImage(spinIndex, values[spinIndex - 1]);
    }
  }

  static processResult(result) {
    let values = JSON.parse(result);

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
    setTimeout(() => {
      stage.classList.add('run-animation');

      let animations = document.querySelectorAll('.spin1, .spin2');
      for (let [i, elem] of Array.from(animations).entries()) {
        elem.classList.add('animating');
      }
    }, 20);
  }

  static processBonusSpin() {
    bonusSpin = false;
    bonusDiv.classList.remove('hide');

    const delayBeforeBonusSpinRuns = 2000;
    setTimeout(() => {
      appClient.getSpinResultsFromServer();
    }, delayBeforeBonusSpinRuns);

    const delayBeforeBonusTextHide = 5000;
    setTimeout(() => {
      bonusDiv.classList.add('hide');
    }, delayBeforeBonusTextHide);
  }

  static setAnimSpecificImage(imageIndex, rnd) {
    for (let spinNum of [1, 2]) {
      let spinChildren = document.querySelectorAll('.wheel' + imageIndex + ' .spin' + spinNum + ' > div');

      for (let [i, childNode, imageNum] of Array.from(spinChildren).entries()) {
        imageNum = i == 0 ? rnd : rnd + i;
        imageNum = imageNum % spinChildren.length;
        childNode.className = 'symbol-' + imageNum;
      }
    }
  }


  static getSpinResultsFromServer() {
    httpService.httpGetAsync(processSpinEndpointURL, appClient.processResult);
  }

  static setEventListerens() {
    button.addEventListener('click', appClient.getSpinResultsFromServer);
    let animations = document.querySelectorAll('.spin1, .spin2');
    for (let [i, elem] of Array.from(animations).entries()) {
      elem.addEventListener('animationend', appClient.singleAnimationStopped, false);
      if (i == animations.length - 1) {
        elem.addEventListener('animationend', appClient.lastAnimationStopped, false);
      }
    }
  }

  static singleAnimationStopped()  {
    this.classList.remove('animating');
  }

  static lastAnimationStopped(event) {
    event.target.classList.remove('animating');
    textDiv.classList.remove('hide');
    bonusSpin ? appClient.processBonusSpin() : button.classList.remove('hide');
  }
}

class httpService {

  static httpGetAsync(theUrl, callback) {
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = (oEvent) => {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        callback(xmlHttp.responseText);
      }
    };

    xmlHttp.open('GET', theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }
}

window.onload = ()=> {
  new appClient();
};
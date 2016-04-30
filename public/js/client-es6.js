/**
 * Contains client code for demo app.
 */

'use strict';

const processSpinEndpointURL = 'http://localhost:8000/api/processSpin';

class appClient {

  constructor() {
    this.bonusSpin = false;
    appClient.cacheDom();
    appClient.setEventListerens();
    appClient.setSpinClasses([0, 0, 0]);
  }

  static cacheDom() {
    this.stage = document.querySelector('.slot-view');
    this.button = document.querySelector('.control-btn');
    this.textDiv = document.querySelector('.result');
    this.bonusDiv = document.querySelector('.bonus');
    this.animations = document.querySelectorAll('.spin1, .spin2');

    this.spinChildren = [];
    for (let wheelIndex of [1, 2, 3]) {
      this.spinChildren[wheelIndex] = [];
      for (let spinIndex of [1, 2]) {
        const selector = '.wheel' + wheelIndex + ' .spin' + spinIndex + ' > div';
        this.spinChildren[wheelIndex][spinIndex] = document.querySelectorAll(selector);
      }
    }
  }

  static processResult(result) {
    let values = JSON.parse(result);

    // Show resulting text
    appClient.textDiv.innerHTML = values.textResult;

    // Set result images
    appClient.setSpinClasses(values.symbols);

    // Save bonus
    if (values.bonusSpin) {
      appClient.bonusSpin = true;
    }

    // Hide text and button
    appClient.textDiv.classList.add('hide');
    appClient.button.classList.add('hide');

    // Trigger CSS animation by adding class
    const delayBeforeAddAnimationClasses = 20;
    setTimeout(() => {
      appClient.stage.classList.add('run-animation');
      for (let [i, elem] of Array.from(appClient.animations).entries()) {
        elem.classList.add('animating');
      }
    }, delayBeforeAddAnimationClasses);
  }

  static processBonusSpin() {
    appClient.bonusSpin = false;
    appClient.bonusDiv.classList.remove('hide');

    const delayBeforeBonusSpinRuns = 2000;
    setTimeout(() => {
      appClient.getSpinResultsFromServer();
    }, delayBeforeBonusSpinRuns);

    const delayBeforeBonusTextHide = 5000;
    setTimeout(() => {
      appClient.bonusDiv.classList.add('hide');
    }, delayBeforeBonusTextHide);
  }

  static setAnimSpecificImage(wheelIndex, rnd) {
    for (let spinIndex of [1, 2]) {
      let spinChildren = this.spinChildren[wheelIndex][spinIndex];

      for (let [i, childNode, imageIndex] of Array.from(spinChildren).entries()) {
        imageIndex = i == 0 ? rnd : rnd + i;
        imageIndex = imageIndex % spinChildren.length;
        childNode.className = 'symbol-' + imageIndex;
      }
    }
  }

  static setSpinClasses(values) {
    for (let wheelIndex of [1, 2, 3]) {
      appClient.setAnimSpecificImage(wheelIndex, values[wheelIndex - 1]);
    }
  }

  static setEventListerens() {
    appClient.button.addEventListener('click', appClient.getSpinResultsFromServer);
    for (let [i, elem] of Array.from(appClient.animations).entries()) {
      elem.addEventListener('animationend', appClient.singleAnimationStopped, false);
      if (i == appClient.animations.length - 1) {
        elem.addEventListener('animationend', appClient.lastAnimationStopped, false);
      }
    }
  }

  static singleAnimationStopped()  {
    this.classList.remove('animating');
  }

  static lastAnimationStopped(event) {
    event.target.classList.remove('animating');
    appClient.stage.classList.remove('run-animation');
    appClient.textDiv.classList.remove('hide');
    appClient.bonusSpin
      ? appClient.processBonusSpin() 
      : appClient.button.classList.remove('hide');
  }

  static getSpinResultsFromServer() {
    httpService.httpGetAsync(processSpinEndpointURL, appClient.processResult);
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
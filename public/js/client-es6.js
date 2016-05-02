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
    appClient.setSpinClasses();
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
        const selector = `.wheel${wheelIndex} .spin${spinIndex} > div`;
        this.spinChildren[wheelIndex][spinIndex] = document.querySelectorAll(selector);
      }
    }
  }

  static processResult(result) {
    let {textResult, symbols, bonusSpin} = JSON.parse(result);
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
    new Promise((resolve, reject) => {
      const delayBeforeAddAnimationClasses = 20;
      setTimeout(resolve, delayBeforeAddAnimationClasses);
    }).then(()=> {
      appClient.stage.classList.add('run-animation');
      for (let [i, elem] of Array.from(appClient.animations).entries()) {
        elem.classList.add('animating');
      }
    });
  }

  static processBonusSpin() {
    appClient.bonusSpin = false;
    appClient.bonusDiv.classList.remove('hide');

    // Trigger bonus spin.
    new Promise((resolve, reject) => {
      const delayBeforeBonusSpinRuns = 2000;
      setTimeout(resolve, delayBeforeBonusSpinRuns);
    }).then(()=> {
      appClient.getSpinResultsFromServer();
    });

    // Hide bonus text.
    new Promise((resolve, reject) => {
      const delayBeforeBonusTextHide = 5000;
      setTimeout(resolve, delayBeforeBonusTextHide);
    }).then(()=> {
      appClient.bonusDiv.classList.add('hide');
    });
  }

  static setAnimSpecificImage(wheelIndex, rnd) {
    [1, 2].map((spinIndex) => {
      let spinChildren = this.spinChildren[wheelIndex][spinIndex];

      for (let [i, childNode, imageIndex] of Array.from(spinChildren).entries()) {
        imageIndex = i == 0 ? rnd : rnd + i;
        imageIndex = imageIndex % spinChildren.length;
        childNode.className = `symbol-${imageIndex}`;
      }
    });
  }

  static setSpinClasses(values = [0, 0, 0]) {
    [1, 2, 3].map((wheelIndex)=> {
      appClient.setAnimSpecificImage(wheelIndex, values[wheelIndex - 1]);
    });
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

  static singleAnimationStopped() {
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
    httpService.makeRequest('GET', processSpinEndpointURL)
      .then((result) => {
        appClient.processResult(result);
      })
      .catch((err) => {
        console.error(err.statusText);
      });
  }
}

class httpService {

  static makeRequest(method, url) {

    return new Promise((resolve, reject) => {

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
}

window.onload = ()=> {
  new appClient();
};
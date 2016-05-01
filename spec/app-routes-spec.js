/**
 * @file Contains Jasmine tests for server routes.
 */

let request = require('request')
  , cheerio = require('cheerio')
  , base_url = 'http://localhost:8000/'
  , app = require('../app.js');

describe('App routes', ()=> {

  describe('Main client page', ()=> {
    it('should respond with status code 200', (done) => {
      request(base_url, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('should have correct header and content', (done) => {
      request(base_url, (error, response, body) => {
        var $ = cheerio.load(body);
        expect($('header').text()).toBe('Demo app for NetEnt');
        expect($('.bonus').text()).toBe('Bonus Spin!');
        expect($('a').text()).toBe('API index');
        done();
      });
    });
  });

  describe('API index page', ()=> {
    let url = `${base_url}api`;

    it('should respond with status code 200', (done) => {
      request(url, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('should have correct content', (done) => {
      request(url, (error, response, body) => {
        "use strict";

        var $ = cheerio.load(body);
        expect($('h2').text()).toBe('Game API index.');
        expect($('p').text()).toBe('Routes implemented:');
        expect($('ul').children().length).toBe(3);

        done();
      });
    });
  });

  describe('processSpin endpoint', ()=> {
    let url = `${base_url}api/processSpin`;

    it('should respond with status code 200', (done) => {
      request(url, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('should have correct outcome', (done) => {
      request(url, (error, response, body) => {
        let {textResult, symbols, bonusSpin} = JSON.parse(body);
        "use strict";

        expect(textResult).toContain('Win');
        expect(Array.isArray(textResult)).toBe(false);

        expect(Array.isArray(symbols)).toBe(true);
        expect(symbols.length).toBe(3);
        symbols.map((number) => {
          "use strict";
          expect(number).toBeLessThan(6);
        });

        expect(Array.isArray(bonusSpin)).toBe(false);
        expect(typeof(bonusSpin)).toBe('boolean');

        app.stopServer();
        done();
      });
    });
  });

});


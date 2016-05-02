/**
 *
 * @returns {*}
 *   apiIndexController
 */
module.exports = () => {
  var fs = require('fs')
    , cssFile
    , htmlFile;

  let getApiIndex = (req, response) => {
    cssFile = fs.readFileSync('./public/styles/client.css');
    htmlFile = fs.readFileSync('./public/api_index.html');

    response.send(`<style>${cssFile}</style>${htmlFile}`);
  };

  return {
    getApiIndex: getApiIndex
  }
};

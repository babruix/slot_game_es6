var fs = require("fs")
  , cssFile;

fs.readFile('./public/styles/client.css', function(err, data) {
  if (err) {
    throw err;
  }
  cssFile = data;
});

var apiIndexController = function () {

  function getApiIndex(req, response) {

    const body = `
<style>${cssFile}</style>
<div class="api-index">
  <h2>Game API index.</h2>
  <p>Routes implemented:</p>
  <ul>
    <li>
      http://localhost:8000/ – client application,
      <a href="http://localhost:8000/"> link-></a>
    </li>
    <li>http://localhost:8000/api – this page,</li>
    <li>http://localhost:8000/api/processSpin – outcome for spin request.</li>
  </ul>
</div>`;

    response.send(body);
  }

  return {
    getApiIndex: getApiIndex
  }
};

module.exports = apiIndexController;




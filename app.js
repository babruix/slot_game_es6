/**
 * Contains server code for demo app.
 */

'use strict';

let express = require('express')
  , app = express()
  , port = process.env.PORT || 8000;

// Client static files.
app.use(express.static(__dirname + '/public'));

// Listen on 8000 by default.
let server = app.listen(port, () => {
  // console.log('Game APP is listening on PORT: ' + port);
});

app.enableRoutes = ()=> {
  var indexRouter = require('./Routes/apiIndex')();
  app.use('/api', indexRouter);

  var spinRouter = require('./Routes/slotRoutes')();
  app.use('/api/processSpin', spinRouter);
};

app.stopServer = ()=> {
  server.close();
};

app.enableRoutes();
module.exports = app;

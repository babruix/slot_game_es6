/**
 * Contains server code for demo app.
 */

'use strict';

let express = require('express')
  , app = express()
  , port = process.env.PORT || 8000
  , fs = require('fs')
  , cssFile;

// Client static files
app.use(express.static(__dirname + '/public'));

var indexRouter = require('./Routes/apiIndex')();
app.use('/api', indexRouter);

var spinRouter = require('./Routes/slotRoutes')();
app.use('/api/processSpin', spinRouter);

app.set('view options', {pretty: true});
app.listen(port, () => {
  console.log('Game APP is listening on PORT: ' + port);
});

module.exports = app;

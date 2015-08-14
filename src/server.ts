'use strict';

// Load environment variables from file if present
import dotenv = require('dotenv');
dotenv.load({
  silent: true,
  path: 'src/.env'
});

// Boot server
import debug = require('debug');
import app = require('./app');

const port = process.env.PORT || 3000;
app.set('port', port);

app.listen(app.get('port'), () => {
  debug('Express server listening on port ' + port);
}).on('error', err => {
  console.log('Cannot start server, port most likely in use');
  console.log(err);
});

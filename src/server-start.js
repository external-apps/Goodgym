const server = require('./server.js');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

http.createServer(server).listen(port, () => {
  console.log('Listening on port ' + port);
});

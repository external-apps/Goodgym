const server = require('./server.js');
const http = require('http');

const port = process.env.PORT || 3000;

http.createServer(server).listen(port, () => {
  console.log('Listening on port ' + port);
});

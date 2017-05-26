const server = require('./server.js');
const https = require('https');
const fs = require('fs');
const path = require('path');

const key = fs.readFileSync(path.join(__dirname, '/keys/key.pem'));
const cert = fs.readFileSync(path.join(__dirname, '/keys/cert.pem'));
const port = process.env.PORT || 3000;

if (!module.parent) {
  https.createServer({
    key: key,
    cert: cert
  }, server).listen(port, () => {
    console.log('Listening on port ' + port);
  });
}

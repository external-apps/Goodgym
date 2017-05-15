const server = require('./server.js');
const https = require('https');
const fs = require('fs');
const path = require('path');

const key = fs.readFileSync(path.join(__dirname, '/keys/key.pem'));
const cert = fs.readFileSync(path.join(__dirname, '/keys/cert.pem'));

if (!module.parent) {
  https.createServer({
    key: key,
    cert: cert
  }, server).listen(3000, () => {
    console.log('Our app listening on port 3000!');
  });
}

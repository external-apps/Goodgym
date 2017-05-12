const request = require('request');
const QRCode = require('qrcode-svg');

const qrMaker = (req, res) => {
  request.get(`https://www.yoti.com/connect/493d7947-896e-49f6-afd4-e6136b8a9a34`, (e, response, body) => {
    // Get URL
    const url = body.match(/https:\/\/code\.yoti\.com\/.*\?/)[0].slice(0, -1);
    // Get proto
    const proto = body.match(/proto_.*=/)[0];
    // Make SVG
    const svg = new QRCode({
      content: url,
      color: 'white',
      background: '#ED1C24',
      width: 300,
      height: 300,
      padding: 4
    }).svg();
    // Give to client
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({svg, proto, url}));
    // res.render(JSON.stringify({svg, proto, url}));
  });
};

module.exports = qrMaker;

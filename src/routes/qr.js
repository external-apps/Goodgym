// const fs = require('fs');
// require('env2')(`${__dirname}/../../.env`);

// const YotiClient = require('yoti-node-sdk');
// const SDK_ID = process.env.CLIENT_SDK_ID;
// const PEM_PATH = `${__dirname}/../keys/GoodGym-access-security.pem`;
// const PEM = fs.readFileSync(PEM_PATH);
//
// let client = new YotiClient(SDK_ID, PEM);
//
// const qr = (req, res) => {
//   res.render('qr');
// };
//
// module.exports = qr;

// ------

const qr = (req, res) => {
  res.render('qr');
};

module.exports = qr;
